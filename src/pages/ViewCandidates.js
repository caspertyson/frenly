import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import "./ViewCandidates.css"
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Make sure this includes Firebase Storage
import { useAuth } from '../components/UserContext'; // Adjust if you have a different way to access auth
import Footer from '../components/Footer';
import EmailIcon from '@mui/icons-material/Email';

function ViewCandidates() {
    const { listingUID } = useParams();
    const [applications, setApplications] = useState([]);
    const { user, loading } = useAuth(); // Assuming this returns the currently logged-in user

    useEffect(() => {
        const fetchApplications = async () => {
            const q = query(collection(db, "applications"), where("listingUID", "==", listingUID));
            try {
                const querySnapshot = await getDocs(q);
                const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setApplications(apps);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            }
        };

        fetchApplications();
    }, [listingUID]);

    const handleDownloadCV = async (cvUrl, userEmail) => {
        const cvPath = cvUrl;
        const cvRef = ref(storage, cvPath);

        try {
            const url = await getDownloadURL(cvRef);
            // Create a temporary <a> element to trigger a download
            const a = document.createElement('a');
            a.href = url;
            a.download = userEmail; // This sets the filename for the download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Failed to download CV:', error);
            alert('Failed to download CV. Please try again.');
        }
    };
    const handleNotAMatch = async (applicationID) => {
        try {
            await deleteDoc(doc(db, 'applications', applicationID));
            console.log('Document successfully deleted!');
            setApplications(currentApplications => 
                currentApplications.filter(app => app.id !== applicationID)
            );
      
        } catch (error) {
          console.error('Error removing document: ', error);
        }
      };
    
    return (
        <>
            <div id='view-candidates-container'>
                <div id='view-candidates-content'>
                <h1>Candidates for Listing</h1>
                {applications.length > 0 ? (
                    <div className="app-cards-container">
                        {applications.map(app => (
                            <div className="app-card" key={app.id}>

                                <h2 id='app-card-email'>{app.firstName + " " + app.lastName}</h2>
                                
                                <p><strong>Cover Letter:</strong></p>
                                <p>{app.coverLetter}</p>
                                <button onClick={() => handleDownloadCV(app.cvUrl, app.userEmail)} className="download-btn">Show Resume</button>
                                <div id='applicant-actions'>
                                    <a href={`mailto:${app.userEmail}`} className="email-applicant-btn"><EmailIcon id="email-applicant-icon"/> Message</a>

                                    <button id='not-a-match-button' onClick={() =>{ handleNotAMatch(app.id)}}>Not a match</button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No applications found.</p>
                )}
                </div>
            </div>
            <Footer/>   
        </>
    );
}

export default ViewCandidates;
