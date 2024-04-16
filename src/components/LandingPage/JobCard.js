import React from 'react';
import './JobCard.css'; // Importing the CSS
import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardIcon from '@mui/icons-material/Keyboard';

const JobCard = ({ job }) => (
  <div className="jobs-box">
    <img src="students-1807505_640.jpg" alt={job.title} className="job-image" />
    <div className="job-info">
      <div className="job-title">{job.company}</div>
      <div className="company-name">{job.title}</div>
      <ul className="job-details">
        <li><KeyboardIcon style={{ fontSize: 20, marginRight: 10 }} />{job.type}</li>
        <li><MapIcon style={{ fontSize: 20, marginRight: 10 }} />{job.location}</li>
        <li><AccessTimeIcon style={{ fontSize: 20, marginRight: 10 }} />{job.hours} hours</li>
      </ul>
    </div>
  </div>
);

export default JobCard;
