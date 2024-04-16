import React from 'react';
import HeroSection from '../components/LandingPage/HeroSection';
import JobsSection from '../components/LandingPage/JobsSection'
import WhoFor from '../components/LandingPage/WhoFor';
import Services from '../components/LandingPage/Services';
import Reviews from '../components/LandingPage/Reviews';
import Mission from '../components/LandingPage/Mission';
import Footer from '../components/Footer';
import Companies from "../components/LandingPage/Companies"
import JobCategories from '../components/LandingPage/JobCatagories';

function LandingPage() {
    return (
        <div>
            <HeroSection />
            <Companies/>
            <JobsSection />
            <JobCategories/>
            <Services/>
            {/* <WhoFor/> */}
            <Mission/>
            <Reviews/>
            <Footer/>
        </div>
    );
}

export default LandingPage;
