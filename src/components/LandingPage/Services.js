import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router
import EastIcon from '@mui/icons-material/East';

function Services() {

    return (
        <div id="streamline-container">
        <div id='streamline-section'>
            <h1>
                Application and Posting
            </h1>
            <h1 >
            <span id='bottom-h1-tag'>Streamlined and Simplified</span>
            </h1>
            <div id="streamline-images-description">
                <div className="streamline-item" id="post-project">
                    <img src="/ai-generated-8583048_640.webp" alt="ai gen"></img>
                    <h2 id='streamline-item-h2'>Post a project</h2>
                    <p>Businesses can create a project listing, providing details about the job requirements, timeline, and compensation.                    </p>
                    <Link id='streamline-item-link' to={"/post-listing"}>Post Here <EastIcon id="streamline-item-link-icon"/></Link>
                </div>
                <div className="streamline-item" id="browse-jobs">
                    <img id="fucked-up-image" src="/graduation-879941_640.webp" alt="guy graduating"></img>
                    <h2 id='streamline-item-h2'>Browse for jobs</h2>
                    <p>University students can browse through available projects and submit their applications directly through the platform.                    </p>
                    <Link id='streamline-item-link' to={"/sign-in"}>Browse Here <EastIcon id="streamline-item-link-icon"/></Link>
                </div>
                <div className="streamline-item" id="prospect">
                    <img src="/students-1807505_640.webp" alt="studetns"></img>
                    <h2 id='streamline-item-h2'>Prospect</h2>
                    <p>Businesses can review the applications received and select the most suitable candidate for their project.                    </p>
                    <Link id='streamline-item-link' to={"/employers"}>Prospect Here <EastIcon id="streamline-item-link-icon"/></Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Services;
