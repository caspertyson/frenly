import React from 'react';

function Mission() {

    return (
        <div id="about">
            <div id="about-container">
            <h2>Our Mission</h2>
            <p>At Frenly, we're on a mission to shape the future of work in New Zealand and Australia. Our marketplace platform bridges the gap between university students and local businesses, with a vision to become the premier early-stage career community in the region.
                <br/><br/>

                Our primary focus is on supporting New Zealand students in securing short-term, field-related opportunities that provide invaluable real-world experience. We believe this experience is the key to unlocking doors to promising career paths, ensuring students land great jobs and excel in their chosen fields. Join us on this transformative journey to empower the future workforce!
                </p>
                <button  onClick={() => window.location.href = '#streamline-container'}>Browse Listings</button>
            </div>

        </div>
    );
}

export default Mission;
