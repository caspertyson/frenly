import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig'; // Adjust the import path as needed
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/UserContext'; // Adjust if you have a different way to access auth
import "./Application.css"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SendIcon from '@mui/icons-material/Send';
import Footer from '../components/Footer';

function Application() {
    const { listingUID } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useAuth(); // Assuming this returns the currently logged-in user
    const [coverLetter, setCoverLetter] = useState("");
    const [cvFile, setCvFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [fileName, setFileName] = useState('');
    const [firstname, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const handleCoverLetterChange = (event) => {
        setCoverLetter(event.target.value);
    };

    useEffect(() => {
        if(user){
            setUserEmail(user.email)
        }
      }, [user]);
    
    const handleFileChange = (event) => {
        setCvFile(event.target.files[0]);
        if (event.target.files[0]) {
            setFileName(event.target.files[0].name); // Update the filename state
          }      
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            alert("You must be logged in to submit an application");
            navigate('/sign-in');
            return;
        }
        // Check if both the cover letter and CV file are provided
        if (!coverLetter.trim() || !cvFile|| !firstname.trim()|| !lastName.trim()|| !userEmail.trim()) {
            setErrorMessage("Please fill out all feilds.");
            return;
        }

        const cvRef = ref(storage, `cvs/${listingUID}/${user.uid}`);
        try {
            const fileSnapshot = await uploadBytes(cvRef, cvFile);

            // Store application details in Firestore
            const applicationRef = await addDoc(collection(db, 'applications'), {
                coverLetter: coverLetter,
                cvUrl: fileSnapshot.metadata.fullPath,
                userEmail: userEmail,
                listingUID: listingUID,
                timestamp: new Date(),
                firstName: firstname,
                lastName: lastName,
            });

            console.log('Application submitted:', applicationRef.id);
            console.log('user id:', user.uid);
            navigate("/", { state: { message: "Application Successful!" } });
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Error submitting application. Please try again.');
        }
    };  
    const handleUploadClick = () => {
        document.getElementById('cvUpload').click();
      };
    

    return (
        <>
            <div className="application-container">
                <h1>Job Application</h1>
                <form onSubmit={handleSubmit} className="application-form">
                    <h3>First Name</h3>
                    <input className='input-box-name' id='input-box-personal-details' 
                    placeholder='First Name'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}></input>
                    <h3>Last Name</h3>
                    <input className='input-box-name' id='input-box-personal-details' 
                    placeholder='Family Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
                    <h3>Email</h3>
                    <input id='input-box-personal-details'  
                    placeholder='example@example.com'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}></input>
                    <h2 htmlFor="cvUpload" className="upload-label">
                        Resumé
                    </h2>
                        <div id='upload-component'>
                            <div id='upload-resume-button' onClick={handleUploadClick}>
                                <FileUploadOutlinedIcon id="upload-cv-icon"/>
                                Upload
                                <input type="file" id="cvUpload" onChange={handleFileChange} style={{ display: 'none' }} />
                            </div>
                            {fileName && <div id="file-name-display">{fileName}</div>}

                        </div>
                    <p id='cover-letter-prompt'>Accepted file types: .doc, .docx, .pdf, .txt and .rtf (2MB limit).</p>
                    <h2 htmlFor="coverLetter" className="input-label">
                        Cover Letter
                    </h2>
                    <p id='cover-letter-prompt'>Introduce yourself and briefly explain why you are suitable for this role. Consider your relevant skills, qualifications and related experience.</p>
                        <textarea id="coverLetter" value={coverLetter} onChange={handleCoverLetterChange} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="submit-btn">Submit Application <SendIcon id="submit-application-button-icon"/></button>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default Application;
