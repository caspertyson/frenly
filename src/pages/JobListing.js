import React, { useEffect, useState } from 'react';
import './JobListing.css'; 
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { useAuth } from '../components/UserContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import MapIcon from '@mui/icons-material/Map';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function JobListing() {
  const [job, setJob] = useState(null);
  const { jobId } = useParams(); // This captures the job ID from the URL
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      const fetchJob = async () => {
          const docRef = doc(db, 'jobPostings', jobId); // Create a reference to the document
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              setJob({ id: docSnap.id, ...docSnap.data() }); // Set the job data in state
          } else {
              console.log('No such document!');
          }
      };

      fetchJob();
  }, [jobId]); // Dependency array ensures this runs when jobId changes

  if (!job) {
      return <div id='loading-div'>Loading...</div>;
  }
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  function formatDate(date) {
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const ordinalSuffix = getOrdinalSuffix(day);
  
    return `${day}${ordinalSuffix} ${month}`;
  }
  const jobDate = job.time.toDate(); 
  const formattedDate = formatDate(jobDate);

  const handleButtonClick = () => {
    if (user) {
        navigate(`/apply/${job.id}`);
    } else {
        navigate('/sign-in');
    }
};

  return (
    <>      
      <div id='job-description-container'>
        <div className="job-listing">
          <div className="job-image">
            <img src="../students-1807505_640.jpg" alt={`${job.company} - ${job.title}`} />
          </div>
          <div className="job-listing-details">
            <h1 className="job-listing-title">{job.title}</h1>
            <div className="job-meta">
              <div className="company job-meta-item"><ApartmentIcon  fontSize='small' className='job-meta-icon'/>{job.company}</div>
              <div className="job-location job-meta-item"><MapIcon  fontSize='small' className='job-meta-icon'/> {job.location}</div>
              {/* <div className="job-category job-meta-item">{job.category}</div> */}
              <div className="job-type job-meta-item"><WorkOutlineIcon fontSize='small' className='job-meta-icon'/>{job.type}</div>
              <div className="posted-date">Posted {formattedDate}</div>
            </div>
            <button onClick={handleButtonClick} 
                    className="link-like-button apply-button">
                Apply Now
            </button>
            <div className="job-description">
              <h3>About the role</h3>
              <p>{job.aboutTheRole}</p>
              <h3>About the company</h3>
              <p>{job.aboutTheCompany}</p>
              <h3>Qualifications and Skills</h3>
              <p>{job.skillsYouNeed}</p>
              <h3 id='be-careful-warning'>Be careful</h3>
              <p>Don’t provide your bank or credit card details when applying for jobs.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default JobListing;
