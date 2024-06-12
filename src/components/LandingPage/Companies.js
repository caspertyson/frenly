import React from 'react';
import "./Companies.css"
const ModernLayout = () => {
  return (
    <div className="companies-container">
      <div className="companies-text-container">
        <h2>New Zealand companies are now hiring on Frenly</h2>
      </div>
      <div className="logo-container">
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
        <img src="./Air-New-Zealand-Logo.webp" alt="Woolworths Group" />
      </div>
      <div className="companies-feature-container">
        <div className="company-feature">
          <div className="icon">🔍</div>
          <div className="company-feature-text">
            <h3 id='h3-company-feature'>Get Frenly Matches</h3>
            <p>Unlock new opportunities based on your unique skills and values.</p>
          </div>
        </div>
        <div className="company-feature">
          <div className="icon">🚀</div>
          <div className="company-feature-text">

          <h3>Go beyond a resume</h3>
          <p>You're 3x more likely to be hired on Frenly.</p>
          </div>
          </div>
        <div className="company-feature">
          <div className="icon">🤝</div>
          <div className="company-feature-text">

            <h3>Connect with hiring teams</h3>
            <p>Learn about their culture and get feedback when you apply.</p>
            </div>
            </div>
        <div className="company-feature">
          <div className="icon">🥇</div>
          <div className="company-feature-text">
          <h3>NZ's leading companies</h3>
          <p>Where the best teams hire - from startups to giants.</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
