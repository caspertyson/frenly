import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { useAuth } from '../components/UserContext'; // Adjust this import according to your project structure
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, googleAuthProvider } from '../firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

function JobAdsPage() {
    const [jobs, setJobs] = useState([]);
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
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
    
    useEffect(() => {
        async function fetchData() {
            if (!loading) {
                if (user) {
                    const userDocRef = doc(db, 'employers', user.uid);
                    try {
                        const docSnap = await getDoc(userDocRef);
                        if (docSnap.exists()) {
                            console.log(docSnap)
                            const jobPostingsQuery = query(
                                collection(db, 'jobPostings'),
                                where('employerEmail', '==', user.uid) // Assuming user.uid is available in this scope
                            );
                            const querySnapshot = await getDocs(jobPostingsQuery);
                            const jobs = querySnapshot.docs.map(doc => {
                                const data = doc.data();
                                return {
                                    id: doc.id,
                                    title: data.title,
                                    status: data.status
                                };
                            });
                            setJobs(jobs);
                        } else {
                            navigate('/sign-in-employer');
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        navigate('/');
                    }
                } else {
                    navigate('/sign-in-employer');
                }
            }
        }
        fetchData();
    }, [user, loading, navigate]);

    return (
        <>
            <div id='employers-container' style={{ padding: 20 }}>
                <div id="employers-content">
                    <Typography variant="h4">Welcome {user?.displayName || 'User'}</Typography>
                    <Typography variant="subtitle1" style={{ margin: '20px 0' }}>
                        You're in the right place to create a job ad
                    </Typography>
                    <Typography variant="h5">Your Jobs</Typography>
                    <br/>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>View Candidates</TableCell>
                                    <TableCell>Job Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
                                        <TableRow key={job.id}>
                                            <TableCell>{job.status}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>
                                                <Link href={"/view-candidates/" + job.id}>View</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={"/edit/" + job.id}>Edit</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    <br/>
                    <br/>
                    <Button variant="outlined" href="/post-listing">
                        Post A Job Listing
                    </Button>
                </div>
            </div>

            <Footer/>
        </>

    );
}

export default JobAdsPage;
