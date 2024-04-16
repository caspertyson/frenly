import React, { useState, useEffect } from 'react';
import heroImage from "../../images/Background.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EastIcon from '@mui/icons-material/East';

function HeroSection() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check for a state message and display it as a toast
        if (location.state?.message) {
            toast.success(location.state.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate(location.pathname, { replace: true });

        }
    }, [location]);


    return (
        <div id='landingPageContainer'>
        <div id='fullPage'>
            <div id='header-content'>
                <h1>
                    🚀 Launch Your Career
                </h1>
                <h1 >
                <span id='bottom-h1-tag'>With Micro Internships </span> 
                </h1>
                <p id='landingPageP'>
                    Bridging the gap between Gen Z and local NZ businesses.
                </p>
                <button onClick={() => window.location.href = '#streamline-container'}><span id='browse-listing-hero-button-text'>Browse Listings</span>  <EastIcon /></button>
                <div>
                <img id='header-image' src={heroImage} alt="Background image"></img>
                </div>
            </div>
        </div>
    </div>
    );
}
export default HeroSection;
