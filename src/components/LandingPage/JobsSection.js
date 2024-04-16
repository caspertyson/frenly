import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

function JobsSection() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'jobPostings'));
            const jobs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id, 
                    type: data.type,
                    location: data.location,
                    hours: data.hours,
                    company: data.company,
                    title: data.title,
                    status: data.status,
                };
            });
            setItems(jobs);
        };
        fetchData();
    }, []);

    return (
        <div id="streamline-container">
            <div id='search-jobs-title'>
                <h2> Browse Listings</h2>
                <p>Find great roles  at great companies.</p>
            </div>
            <div className='jobs-container'>
            {items.map((item, index) => (
                item.status === "Active" && (
                    <Link key={index} to={'/roles/' + item.id} className='job-link'>
                        <JobCard job={item} />
                    </Link>                     
                )
            ))}
            </div>
        </div>
    );
}

export default JobsSection;
