import React from 'react';
import "./JobCatagories.css";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MapIcon from '@mui/icons-material/Map';
import EastIcon from '@mui/icons-material/East';

const JobCategories = () => {
  // Filled out categories as per the image provided
  const categories = [
    { name: 'Administration', icon: '🗂️' },
    { name: 'Banking & Investment', icon: '💹' },
    { name: 'Business Ops & Strategy', icon: '🏢' },
    { name: 'Consulting & Professional Services', icon: '👔' },
    { name: 'Customer Support', icon: '📞' },
    { name: 'Data & Analytics', icon: '📊' },
    { name: 'Finance & Accounting', icon: '💰' },
    { name: 'Marketing', icon: '📈' },
    { name: 'Media & Communications', icon: '📡' },
    { name: 'People & Culture', icon: '🤝' },
    { name: 'Product Management & Design', icon: '🎨' },
    { name: 'Sales & Customer Success', icon: '🛒' },
    { name: 'Software Engineering', icon: '💻' },
    { name: '+ More coming soon', icon: '👀' },
  ];

  const locations = ['Auckland', 'Wellington', 'Christchurch', 'Dunedin', 'Hamilton','Remote'];
  const jobLevels = ['1st Year', '2nd Year', '3rd Year'];

  return (
    <div className="jobcategories-container">
      <h1 className="jobcategories-title">A match for everyone</h1>
      <p className="jobcategories-subtitle">Whatever your level, you'll find opportunities that match your ambition.</p>
      <div className="jobcategories-categories">
        {categories.map((category) => (
          <div className="jobcategories-category" key={category.name}>
            <span className="jobcategories-icon">{category.icon}</span>
            <span className="jobcategories-name">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="jobcategories-filters">
        <div className="jobcategories-levels">
          {jobLevels.map((level) => (
            <button className="jobcategories-filter-button" key={level}><KeyboardIcon style={{ fontSize: 15, marginRight: 5 }} />{level}</button>
          ))}
        </div>
        <div className="jobcategories-locations">
          {locations.map((location) => (
            <button className="jobcategories-filter-button" key={location}><MapIcon style={{ fontSize: 15, marginRight: 5 }} />{location}</button>
          ))}
        </div>
      </div>
      <button id='jobcategories-button-browse-listings' onClick={() => window.location.href = '#streamline-container'}>Browse listings <EastIcon /> </button>
    </div>
  );
};

export default JobCategories;
