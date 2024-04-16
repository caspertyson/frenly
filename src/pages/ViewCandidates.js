import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import "./ViewCandidates.css"
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Make sure this includes Firebase Storage
import { useAuth } from '../components/UserContext'; // Adjust if you have a different way to access auth

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

    return (
        <div id='view-candidates-container'>
            <div id='view-candidates-content'>
            <h1>Candidates for Listing</h1>
            {applications.length > 0 ? (
                <div className="app-cards-container">
                    {applications.map(app => (
                        <div className="app-card" key={app.id}>
                            <h2 id='app-card-email'>{app.userEmail}</h2>
                            <p><strong>Cover Letter:</strong></p>
                            <p>{app.coverLetter}</p>
                            <button onClick={() => handleDownloadCV(app.cvUrl, app.userEmail)} className="download-btn">Show Resume</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No applications found.</p>
            )}
            </div>
        </div>
    );
}

export default ViewCandidates;
