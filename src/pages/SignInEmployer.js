import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Link, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebaseConfig'; 
import { useAuth } from '../components/UserContext'; // Adjust the import path to where UserContext is located
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Import your Firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Ensure these are imported

function SignIn() {
    const user = useAuth(); // Use the useAuth hook to access the user
    let navigate = useNavigate(); // Hook to get the navigate function
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

    const toggleForm = () => {
        setIsSignUp(!isSignUp); // Toggle between true and false
    };
  //   const signInWithGoogle = () => {
  //     signInWithRedirect(auth, googleAuthProvider)
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // };
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
    .then(async (result) => {
      if(result){

        const user = result.user;
        const userRef = doc(db, 'employers', user.uid); // Create a reference to the Firestore document

        // Retrieve the document
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            // Set the document if it does not exist
            await setDoc(userRef, {
                email: user.email
            });
        }

        navigate('/', { state: { message: "Logged In Successfully!" } }); // Navigate to the home page
      }
    })
      
    .catch((error) => {
      console.error(error);
    });
};

  //   useEffect(() => {
  //     // Check for the result from signInWithRedirect when the component mounts
  //     getRedirectResult(auth)
  //         .then( async(result) => {

  //           if(result){
  //             const user = result.user;
  //             const userRef = doc(db, 'employers', user.uid); // Create a reference to the Firestore document
      
  //             // Retrieve the document
  //             const docSnap = await getDoc(userRef);
      
  //             if (!docSnap.exists()) {
  //                 // Set the document if it does not exist
  //                 await setDoc(userRef, {
  //                     email: user.email
  //                 });
  //             }
      
  //             navigate('/employers');
  
  //           }
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // }, [navigate]);

  return (
    <Box sx={styles.container}>

      <Box sx={styles.formContainer}>
        <Link href="/sign-in" variant="subtitle1" sx={styles.subtitle}>
          Are you looking for a job?
        </Link>

        <Typography variant="h5" sx={styles.title}>
            {isSignUp ? "Employer Sign Up" : "Employer Sign In"}
        </Typography>
        <TextField
          required
          id="email"
          label="Email address"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        />
        {isSignUp ? <TextField
          required
          id="password"
          label="Repeat Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        /> :
        <></>
        }
        <FormControlLabel
          control={<Checkbox name="remember" color="primary" />}
          label="Remember me"
          sx={styles.checkbox}
        />
        <Button variant="contained" color="secondary" fullWidth sx={styles.signInButton}>
            {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Typography variant="caption" display="block" align="center" sx={styles.orSeparator}>
          or
        </Typography>
        <Button startIcon={<GoogleIcon />} variant="outlined" fullWidth sx={styles.socialButton} onClick={signInWithGoogle}>
          Continue with Google
        </Button>
        <Link href="#" onClick={toggleForm} variant="caption" display="block" align="center">
            {isSignUp ? "Already have an account? Sign in here." : "Don't have an account? Register here."}
        </Link>
      </Box>
    </Box>
  );
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: 4,
      borderRadius: 2,
      boxShadow: 1,
      maxWidth: 400,
      width: '100%',
      margin: 'auto',
      boxSizing: 'border-box',
    },
    title: {
      textAlign: 'center',
      marginTop: 2,
    },
    subtitle: {
      textAlign: 'right',
      color: 'grey',
    },
    checkbox: {
      marginLeft: -1,
    },
    signInButton: {
      margin: '16px 0px',
      color: 'white',
      backgroundColor: '#ec407a', // Pink shade, adjust as needed
    },
    orSeparator: {
      margin: '16px 0px',
    },
    socialButton: {
      margin: '8px 0px',
    },
  };
  
export default SignIn;