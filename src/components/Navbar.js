import { auth, googleAuthProvider } from '../firebaseConfig'; 
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from './UserContext'; // Adjust the import path to where UserContext is located
import { useNavigate } from 'react-router-dom';

function Navbar() {
    // const [user, setUser] = useState(null);
    let navigate = useNavigate(); // Hook to get the navigate function
    const { user, loading } = useAuth();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //     setUser(user);
        //     } else {
        //     setUser(null);
        //     }
        // });
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // unsubscribe();
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // setUser(null); // Update the state to reflect that the user has logged out
                console.log("User signed out successfully");
                navigate("/")
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };
    
    const getFirstName = (fullName) => {
        if (!fullName) {
            return "User";  // Return "User" or any other default string when fullName is null or undefined
        }
        return fullName.split(' ')[0];
        };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
  

    return (
        <div id='navbar'>
        <div id="left-navbar-container">
            <div id='theLetterI'>
                F
            </div>
            <Link to='/' id='appName'>FRENLY</Link>    
        </div>
        <div id="right-navbar-container">
            { (location.pathname == '/') && (
                <>
                    <div id="navbar-navigation" className="navbar-item"  onClick={() => window.location.href = '#streamline-container'}>
                    Browse Listings
                    </div>
                    <div id="navbar-navigation" className="navbar-item" onClick={() => window.location.href = '#streamline-section'}>
                        Services
                    </div>
                    <div id="navbar-navigation" className="navbar-item" onClick={() => window.location.href = '#reviews'}>
                        Reviews ⭐️
                    </div>    
                    <div id="navbar-navigation" className="navbar-item" onClick={() => window.location.href = '#about'}>
                        About Us
                    </div>    
                </>
            )}
        </div>
        <div id='log-in-out-container'>
        {user ? (
            <>
            { ((location.pathname == '/') || (location.pathname == '/employers') || (location.pathname == '/post-listing') || (location.pathname.startsWith('/roles/')) || (location.pathname.startsWith('/apply/')) || (location.pathname.startsWith('/view-candidates/')) || (location.pathname.startsWith('/edit/'))) && (
                    <>
                        <div id="post-listing-button" onClick={toggleDropdown} ref={dropdownRef} className={dropdownOpen ? 'active' : ''}>
                            {getFirstName(user.displayName)}
                            {dropdownOpen && (
                            <div className="dropdown-menu">
                                {/* <Link to="#">Profile</Link> */}
                                <Link to="#" id="sign-out" onClick={handleSignOut}>Sign out</Link>
                            </div>
                        )}
                        </div>
                        {((location.pathname != '/employers') && (location.pathname != '/post-listing')) && (
                        <Link id="employer-sign-in"  className='log-in-button' to="/employers">
                        Employer Site
                    </Link>

                        )}
                    </>
                )}
            </>
        ) : (
            <>{ ((location.pathname == '/') || (location.pathname.startsWith('/roles/'))) && (
                <>
                    <Link id="employee-sign-in" className='log-in-button' to="/sign-in">
                        Sign In
                    </Link>    
                    <Link id="employer-sign-in"  className='log-in-button' to="/employers">
                        Employer Site
                    </Link>
                </>
                )}
            </>
        )}
        </div>
    </div>
);
}

export default Navbar;