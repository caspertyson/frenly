import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Link, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebaseConfig'; 
import { useAuth } from '../components/UserContext'; // Adjust the import path to where UserContext is located
import { useNavigate } from 'react-router-dom';

function SignIn() {
    // const [user, setUser] = useState(null);
    const user = useAuth(); // Use the useAuth hook to access the user
    let navigate = useNavigate(); // Hook to get the navigate function
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

    const toggleForm = () => {
        setIsSignUp(!isSignUp); // Toggle between true and false
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            navigate('/'); // Navigate to the home page
        })
        .catch((error) => {
          console.error(error);
        });
    };

  return (
    <Box sx={styles.container}>

      <Box sx={styles.formContainer}>
      <Link href="/sign-in-employer" variant="subtitle1" sx={styles.subtitle}>
          Are you an employer?
        </Link>

        <Typography variant="h5" sx={styles.title}>
        {isSignUp ? "Sign Up" : "Sign In"}
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