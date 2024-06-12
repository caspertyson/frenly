import React, { useState, useEffect } from 'react';
import '@material/mwc-textfield';
import "@material/mwc-textarea";
import "./PostListing.css";
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {  useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/UserContext';
import Footer from '../components/Footer';

function EditListing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { listingUID } = useParams(); 
  const [formValues, setFormValues] = useState({
    title: '',
    company: '',
    type: '',
    hours: '',
    location: '',
    aboutTheRole: '',
    aboutTheCompany: '',
    skillsYouNeed: '',
    employerEmail: user?.uid,
    status: "Pending Review"
  });
  const [isActive, setIsActive] = useState(true);


  useEffect(() => {
    if (listingUID) {
      const fetchData = async () => {
        const docRef = doc(db, "jobPostings", listingUID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setFormValues(data);
            setIsActive(data.status !== "Deactive");
          } else {
          console.log("No such document!");
        }
      };
      fetchData();
    }
  }, [listingUID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    const newStatus = !isActive ? "Pending Review" : "Deactive";
    setIsActive(!isActive);
    setFormValues(prev => ({ ...prev, status: newStatus }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(formValues).some(value => value === '')) {
      console.log("Please fill in all fields.");
      return;
    }
    try {
      const docRef = doc(db, "jobPostings", listingUID);
      await updateDoc(docRef, formValues);
      console.log("Document successfully updated!");
      navigate("/employers", { state: { message: "Listing Updated Successfully!" } });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <div id='post-listing-container'>
        <div id='post-listing-form'>
          <h1>Edit Your Job Posting</h1>
          <form onSubmit={handleSubmit}>
            <mwc-textfield required label="Job Title" name="title" value={formValues.title} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Company" name="company" value={formValues.company} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Type" name="type" value={formValues.type} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Hours" name="hours" value={formValues.hours} onInput={handleChange} type="number" className="narrow-field"></mwc-textfield>
            <mwc-textfield required label="Location" name="location" value={formValues.location} onInput={handleChange} className="narrow-field"></mwc-textfield>
            <mwc-textarea required label="About The Role" name="aboutTheRole" value={formValues.aboutTheRole} onInput={handleChange} rows="5" fullwidth></mwc-textarea>
            <mwc-textarea required label="About The Company" name="aboutTheCompany" value={formValues.aboutTheCompany} onInput={handleChange} rows="5" fullwidth></mwc-textarea>
            <mwc-textarea required label="Skills You Need" name="skillsYouNeed" value={formValues.skillsYouNeed} onInput={handleChange} rows="5" fullwidth></mwc-textarea>
            <label>Active:<input type="checkbox" checked={isActive} onChange={handleCheckboxChange}/></label>
            <button type="submit">Update Listing</button>
          </form>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default EditListing;
