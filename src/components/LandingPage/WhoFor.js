import React from 'react';

function WhoFor() {

    return (
        <div id="who-is-this-for">
        <div id="who-is-this-for-container">
            <h2><span id='frenly-who-for'>FRENLY</span> is for Students and Businesses</h2>
            <div id="features">
                <div id="feature-number">
                    1
                </div>
                <div id="feature-description">
                    <h3>Students looking for work</h3>
                    <p>Don't work at just any job, kick-start your career in your chosen industry.</p>
                </div>
            </div>
            <div id="features">
                <div id="feature-number">
                    2
                </div>
                <div id="feature-description">
                    <h3>Businesses looking for students</h3>
                    <p>Decrease your hiring risk by posting small 10-80 hour projects, and use Frenly.</p>
                </div>
            </div>
            <button  onClick={() => window.location.href = '#streamline-container'}>Browse Listings</button>
        </div>
    </div>
    );
}

export default WhoFor;
