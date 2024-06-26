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
import "./Employers.css"

function JobAdsPage() {
    const [jobs, setJobs] = useState([]);
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const CreateJobAddSVG = () => (
        <svg width="120px" height="100px" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd"><path d="M0 0h120v120H0z"></path><path fill="#FFD1DD" d="M77.36 99.206c5.187 0 9.43-4.303 9.43-9.562V30.45c0-5.259-4.243-9.561-9.43-9.561H24.43c-5.187 0-9.43 4.301-9.43 9.56v59.195c0 5.26 4.243 9.562 9.43 9.562h52.93z"></path><path fill="#FFF" fillRule="nonzero" d="M63.685 81.793c.552 0 1 .447 1 1 0 .513-.386.935-.883.993l-.117.007H40.447c-.552 0-1-.448-1-1 0-.513.387-.936.884-.994l.117-.006h23.237zm.095-5.464c.552 0 1 .447 1 1 0 .513-.386.935-.884.993l-.116.007H40.542c-.553 0-1-.448-1-1 0-.513.386-.936.883-.994l.117-.006H63.78zm9.138-14.539c.553 0 1 .448 1 1 0 .513-.386.936-.883.994l-.117.006H40.743c-.552 0-1-.447-1-1 0-.512.386-.935.884-.993l.116-.007h32.175zm.13-5.464c.553 0 1 .448 1 1 0 .513-.385.936-.883.994l-.116.006H40.874c-.552 0-1-.447-1-1 0-.512.386-.935.883-.993l.117-.007h32.175zm.033-14.576c.552 0 1 .447 1 1 0 .512-.387.935-.884.993l-.116.007H40.58c-.552 0-1-.448-1-1 0-.513.386-.936.883-.994l.117-.006h32.5zm.131-5.464c.553 0 1 .447 1 1 0 .512-.386.935-.883.993l-.117.007h-32.5c-.552 0-1-.448-1-1 0-.513.386-.936.883-.994l.117-.006h32.5z"></path><path fill="#031D44" fillRule="nonzero" d="M31.27 76.345c2.043 0 3.692 1.674 3.692 3.732 0 2.058-1.65 3.732-3.691 3.732-2.043 0-3.693-1.674-3.693-3.732 0-2.058 1.65-3.732 3.693-3.732zm0 2c-.931 0-1.692.772-1.692 1.732s.761 1.732 1.693 1.732c.93 0 1.691-.772 1.691-1.732s-.76-1.732-1.691-1.732zm.474-22.003c2.042 0 3.692 1.675 3.692 3.733 0 2.057-1.65 3.731-3.692 3.731-2.042 0-3.692-1.673-3.692-3.731s1.65-3.733 3.692-3.733zm0 2c-.931 0-1.692.773-1.692 1.733 0 .96.76 1.731 1.692 1.731.931 0 1.692-.772 1.692-1.731 0-.96-.76-1.733-1.692-1.733zm0-21.919c1.994 0 3.61 1.617 3.61 3.61 0 1.995-1.616 3.61-3.61 3.61-1.994 0-3.61-1.615-3.61-3.61 0-1.994 1.616-3.61 3.61-3.61zm0 2c-.89 0-1.61.721-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.889-.72-1.61-1.61-1.61zm61.702 1.947c1.675-2.458 5.025-3.093 7.481-1.417l2.633 1.795c2.458 1.674 3.092 5.023 1.417 7.481L85.524 76.77c-.025.037-.052.072-.08.104l-.036.038-.055.051-.043.035c-.022.017-.044.033-.066.047l-.037.023c-.023.014-.047.027-.071.038-.049.024-.1.044-.153.06l.095-.034-.052.02-.043.014-9.076 2.701c-.608.181-1.228-.242-1.282-.873l-.803-9.435-.002-.039v-.07l.001-.05.01-.087.008-.04c.007-.033.015-.064.025-.096l.01-.029c.01-.032.023-.063.037-.094.023-.05.05-.097.081-.143l-.064.108c.02-.037.04-.073.065-.108l18.604-27.295.006-.009.006-.01zM75.993 71.483l.521 6.114 5.88-1.751-6.401-4.363zM91.13 47.317L76.208 69.21l8.226 5.607 14.923-21.893-8.227-5.607zm2.562-3.758l-1.435 2.106 8.226 5.606 1.435-2.105-8.226-5.607zm6.109-2.954c-1.544-1.053-3.65-.654-4.703.891l-.28.41 8.227 5.607.28-.41c.977-1.435.703-3.352-.578-4.462l-.152-.124-.161-.117z"></path></g>
        </svg>
    )
    const ChooseTypeSVG = () => (
        <svg width="120px" height="100px" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g><path fill="#031D44" fillRule="nonzero" d="M51.962 68.802c.553 0 1 .448 1 1 0 .513-.386.935-.883.993l-.117.007H17.321c-.553 0-1-.448-1-1 0-.513.386-.936.883-.993l.117-.007h34.641zM16.372 74.435l20.208.281c.552.008.994.462.986 1.014-.007.513-.4.93-.897.98l-.117.006-20.207-.281c-.553-.008-.994-.462-.987-1.014.008-.513.4-.93.898-.98l.116-.006z" transform="translate(9 14)"></path><path fill="#031D44" fillRule="nonzero" d="M84.587 57.335H11.04c-3.955 0-7.166 3.172-7.166 7.091v16.125c0 3.918 3.211 7.09 7.166 7.09h73.547c3.955 0 7.166-3.172 7.166-7.09V64.426c0-3.919-3.211-7.09-7.166-7.09zm-73.547 2h73.547c2.856 0 5.166 2.282 5.166 5.091v16.125c0 2.808-2.31 5.09-5.166 5.09H11.04c-2.856 0-5.166-2.282-5.166-5.09V64.426c0-2.809 2.31-5.09 5.166-5.09z" transform="translate(9 14)"></path><path fill="#FFCFDD" d="M88.109 56.363l-80.51 5.463c-3.366.212-6.267-2.312-6.482-5.637L.013 38.052c-.214-3.325 2.34-6.192 5.706-6.403l80.51-5.464c3.365-.212 6.267 2.312 6.481 5.637l1.106 18.138c.214 3.325-2.341 6.191-5.707 6.403" transform="translate(9 14)"></path><path fill="#FFF" fillRule="nonzero" d="M49.265 40.18c.53-.033.986.371 1.018.902.03.492-.316.92-.79 1.005l-.112.013-35.08 2.115c-.53.032-.987-.373-1.019-.903-.03-.493.317-.92.791-1.005l.112-.013 35.08-2.115zM34.763 47.067c.53-.026.982.383 1.009.914.024.492-.327.917-.802.997l-.112.012L14.588 50c-.531.027-.983-.382-1.01-.912-.024-.493.327-.918.802-.997l.112-.012 20.27-1.012z" transform="translate(9 14)"></path><path fill="#031D44" fillRule="nonzero" d="M79.32.647c12.884 0 23.331 10.32 23.331 23.056s-10.447 23.056-23.33 23.056-23.33-10.32-23.33-23.056S66.437.647 79.32.647zm0 1.673c-11.963 0-21.656 9.576-21.656 21.383 0 11.807 9.693 21.383 21.656 21.383 11.964 0 21.658-9.576 21.658-21.383 0-11.807-9.694-21.383-21.658-21.383zm11.57 11.686c.972-.692 2.121.59 1.327 1.48L76.688 32.88c-.95.94-2.489.94-3.44 0l-.07-.076-6.78-8.252c-.64-.78.146-1.91 1.1-1.58l7.287 2.519zm-6.124 6.823l-9.239 6.59c-.263.188-.601.237-.907.131l-4.428-1.53 4.48 5.453.05.04c.147.097.34.1.462.03l.055-.04 9.527-10.674z" transform="translate(9 14)"></path><path fill="#2E4554" fillRule="nonzero" d="M79.32.484c-12.972 0-23.493 10.393-23.493 23.219s10.521 23.22 23.493 23.22c12.973 0 23.494-10.394 23.494-23.22 0-12.827-10.52-23.22-23.494-23.22zm0 2c11.874 0 21.494 9.503 21.494 21.219 0 11.716-9.62 21.22-21.494 21.22-11.873 0-21.493-9.504-21.493-21.22s9.62-21.22 21.493-21.22z" transform="translate(9 14)"></path></g>
      </svg>
    )
    const ManageCandidatesSVG = () => (
        <svg width="120px" height="100px" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<g fill="none" fillRule="evenodd"><path d="M0 0h120v120H0z"></path><path fill="#FFD1DD" d="M94.643 54.827c0 19.122-15.501 34.623-34.621 34.623-19.122 0-34.624-15.5-34.624-34.623 0-19.122 15.502-34.622 34.624-34.622 19.12 0 34.621 15.5 34.621 34.622"></path><path fill="#031C45" fillRule="nonzero" d="M18.488 85.866c1.904 0 4.225.342 6.805.932 3.204.734 5.554 3.973 5.863 7.871a.999.999 0 11-1.994.159c-.245-3.087-2.038-5.559-4.315-6.08-2.446-.56-4.634-.882-6.359-.882-1.828 0-4.006.31-6.372.85-2.391.545-4.225 3.253-4.325 6.513l-.004.28v4.71a1 1 0 01-1.994.118l-.006-.117v-4.71c0-4.252 2.432-7.956 5.884-8.744 2.5-.57 4.816-.9 6.817-.9zm83.373 0c1.903 0 4.225.342 6.805.932 3.203.734 5.553 3.974 5.863 7.871a1 1 0 01-1.994.159c-.245-3.086-2.039-5.559-4.315-6.08-2.446-.56-4.634-.882-6.36-.882-1.828 0-4.006.31-6.373.85-2.39.545-4.225 3.253-4.325 6.513l-.004.28v4.71a1 1 0 01-1.993.118l-.007-.117v-4.71c0-4.252 2.432-7.956 5.884-8.744 2.5-.57 4.817-.9 6.819-.9zM59.72 61.397c4.228 0 9.439.77 15.243 2.096 5.914 1.352 10.558 6.891 12 14.045a1 1 0 11-1.961.395c-1.297-6.432-5.4-11.328-10.485-12.49-5.67-1.296-10.747-2.046-14.797-2.046-4.284 0-9.343.72-14.827 1.972-6.155 1.405-10.735 8.258-10.875 16.37l-.003.382v4.4a1 1 0 01-1.993.117l-.007-.117v-4.4c0-9.145 5.19-17.048 12.433-18.702 5.618-1.282 10.814-2.022 15.272-2.022zm-41.248 7.717a7.06 7.06 0 017.061 7.06c0 3.95-3.449 8.075-7.06 8.075-3.593 0-7.06-4.135-7.06-8.075 0-3.9 3.16-7.06 7.06-7.06zm83.373 0c3.9 0 7.06 3.16 7.06 7.06 0 3.95-3.449 8.075-7.06 8.075-3.593 0-7.06-4.135-7.06-8.075 0-3.9 3.16-7.06 7.06-7.06zm-83.373 2a5.06 5.06 0 00-5.06 5.06c0 2.906 2.658 6.075 5.06 6.075 2.42 0 5.061-3.158 5.061-6.075a5.06 5.06 0 00-5.06-5.06zm83.373 0a5.06 5.06 0 00-5.06 5.06c0 2.906 2.657 6.075 5.06 6.075 2.42 0 5.06-3.158 5.06-6.075a5.06 5.06 0 00-5.06-5.06zm-42.39-43.12c8.19 0 14.83 6.64 14.83 14.83 0 8.352-7.353 17.144-14.83 17.144-7.437 0-14.83-8.816-14.83-17.144 0-8.19 6.639-14.83 14.83-14.83zm0 2c-7.087 0-12.83 5.744-12.83 12.83 0 7.294 6.583 15.144 12.83 15.144 6.286 0 12.83-7.825 12.83-15.144 0-7.086-5.745-12.83-12.83-12.83z"></path><path fill="#FFF" fillRule="nonzero" d="M73.976 72.74h-8.34c-1.491 0-2.7 1.21-2.7 2.701v.12a2.701 2.701 0 002.7 2.702h8.34a2.701 2.701 0 002.701-2.701v-.121a2.701 2.701 0 00-2.7-2.701zm-8.34 2h8.34c.387 0 .701.314.701.701v.12a.701.701 0 01-.7.702h-8.342a.701.701 0 01-.7-.701v-.121c0-.387.314-.701.7-.701z"></path></g>      </svg>
    )

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
                          console.log(docSnap);
                          const jobPostingsQuery = query(
                            collection(db, 'jobPostings'),
                            where('employerEmail', '==', user.uid) // Assuming user.uid is available in this scope
                          );
                          
                          const querySnapshot = await getDocs(jobPostingsQuery);
                          
                          // Create an array to hold the updated job objects
                          let jobsWithApplicantCount = [];
                        
                          for (let doc of querySnapshot.docs) {
                            const data = doc.data();
                            let job = {
                              id: doc.id,
                              title: data.title,
                              status: data.status,
                              numApplicants: 0 // Initialize with zero
                            };
                            
                            const applicationsQuery = query(
                              collection(db, 'applications'),
                              where('listingUID', '==', job.id)
                            );
                            const applicationsSnapshot = await getDocs(applicationsQuery);
                            job.numApplicants = applicationsSnapshot.docs.length; // Set the number of applicants
                            
                            jobsWithApplicantCount.push(job); // Add the job with applicant count to the array
                          }
                          setJobs(jobsWithApplicantCount); // Set the updated jobs array in the state
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
            <div id='employers-container'>
                <div id="employers-content">
                    <Typography variant="h4" style={{ fontWeight: '900' }}>Welcome, {user?.displayName || 'User'}</Typography>
                    <Typography variant="subtitle1" style={{ margin: '20px  0 40px 0 '}}>
                        You're in the right place to create a job ad.
                    </Typography>

                    <div className="steps-container">
                        <h2>Find the best person for your role</h2>
                        <div className="steps">
                        <div className="step">
                            <CreateJobAddSVG/>
                            <h3 className="step-title">Create a job ad</h3>
                            <p className="step-description">Our step-by-step guide makes posting your job ad quick and easy.</p>
                        </div>
                        <div className="step">
                            <ChooseTypeSVG />
                            <h3 className="step-title">Choose your ad type</h3>
                            <p className="step-description">We have three different ad types to suit all your needs.</p>
                        </div>
                        <div className="step">
                            <ManageCandidatesSVG/>
                            <h3 className="step-title">Manage your candidates</h3>
                            <p className="step-description">We make it easy for you to identify the best candidates applying for your role.</p>
                        </div>
                        </div>
                    </div>

                    <Button id='post-listing-button-employer-page' variant="outlined" href="/post-listing">
                        Post A Job Listing
                    </Button>

                    <Typography variant="h5" style={{ fontWeight: '900', marginTop: '50px'}}>Your Jobs</Typography>
                    <br/>
                    <TableContainer id='employers-table-container' component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell id="bold-text">Status</TableCell>
                                    <TableCell id="bold-text">Title</TableCell>
                                    <TableCell id="bold-text">View Candidates</TableCell>
                                    <TableCell id="bold-text">Job Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
                                        <TableRow key={job.id}>
                                            <TableCell>{job.status}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>
                                                <Link href={"/view-candidates/" + job.id}>View ({job.numApplicants})</Link>
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
                </div>
            </div>

            <Footer/>
        </>

    );
}

export default JobAdsPage;
