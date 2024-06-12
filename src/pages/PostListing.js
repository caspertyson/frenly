import React, { useState, useEffect } from 'react';
import '@material/mwc-textfield';
import "./PostListing.css";
import '@material/mwc-textarea';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/UserContext'; // Adjust the import path to where UserContext is located
import Footer from '../components/Footer';

function PostListing() {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [allTextAreasAreNotFilled, setAllTextAreasAreNotFilled] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    company: '',
    type: 'Micro-Internship',
    hours: '',
    location: '',
    aboutTheRole: '',
    aboutTheCompany: '',
    skillsYouNeed: '',
    time: new Date(),
    employerEmail: user?.uid,
    status: "Pending Review"
  });

  useEffect(() => {
    if (!loading) {
        if (user) {
          setFormValues(prevValues => ({
            ...prevValues,
            employerEmail: user.uid // Update employerEmail once user is loaded
          }));
        } else {
          navigate('/sign-in-employer');
      }
      }
  },[loading, user])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("Form:", formValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isAnyFieldEmpty = Object.values(formValues).some(value => value === '');

    if (isAnyFieldEmpty) {
      console.log("Please fill in all fields.");
      setAllTextAreasAreNotFilled(true)
      return; 
    }
    setIsSubmitting(true); // Disable the submit button

    try {
      await addDoc(collection(db, 'jobPostings'), formValues);
      console.log("Form submitted to Firestore:", formValues);
      navigate("/", { state: { message: "Listing Posted Successfully!" } });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setAllTextAreasAreNotFilled(false)
    };


  return (
    <>
      <div id='post-listing-container'>
        <div id='post-listing-form'>
          <h1>Post Your Job</h1>
          <form onSubmit={handleSubmit}>
            <mwc-textfield required label="Job Title" name="title" value={formValues.title} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Company" name="company" value={formValues.company} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Role" name="type" value={formValues.type} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Hours" name="hours" value={formValues.hours} onInput={handleChange} type="number" className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Location" name="location" value={formValues.location} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textarea required label="About The Role" name="aboutTheRole" value={formValues.aboutTheRole} onInput={handleChange} rows="5" fullwidth></mwc-textarea>
            <mwc-textarea required label="About The Company" name="aboutTheCompany" value={formValues.aboutTheCompany} onInput={handleChange} rows="5" fullwidth></mwc-textarea>
            <mwc-textarea required label="Skills You Need" name="skillsYouNeed" value={formValues.skillsYouNeed} onInput={handleChange}  rows="5"  fullwidth ></mwc-textarea>
            {allTextAreasAreNotFilled && <p>Please fill in all text-boxes</p>}
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostListing;
