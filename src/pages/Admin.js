import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const querySnapshot = await getDocs(collection(db, 'jobPostings'));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(post => post.status === "Pending Review");
        setPosts(postsData);
      }
    };

    fetchPosts();
  }, [user]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in');
    }
  };

  const handleApprove = async (postId) => {
    const postRef = doc(db, 'jobPostings', postId);
    await updateDoc(postRef, {
      status: 'Active'
    });
    // setPosts(posts.map(post => post.id === postId ? { ...post, status: 'Active' } : post));
    setPosts(posts.filter(post => post.id !== postId));

  };
  const handleDeny = async (postId) => {
    const postRef = doc(db, 'jobPostings', postId);
    await updateDoc(postRef, {
      status: 'Denied'
    });
    // setPosts(posts.map(post => post.id === postId ? { ...post, status: 'Active' } : post));
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (!user) {
    return (
      <div id='post-listing-container'>
        <h1>Admin Sign In</h1>
        <form onSubmit={handleSignIn}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div id='post-listing-container'>
      <h1>Admin Dashboard</h1>
      {/* {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.company}</p>
          <button onClick={() => handleApprove(post.id)}>Approve</button>
        </div>
      ))} */}
      {posts.map(post => (
        <div id='review-listing-container' key={post.id}>

            <div className="job-listing">
                <div className="job-image">
                    <img src="../joblisting.webp" alt={`${post.company} - ${post.title}`} />
                </div>
                <div className="job-listing-details">
                    <h1 className="job-listing-title">{post.title}</h1>
                    <div className="job-meta">
                    <div className="company">{post.company}</div>
                    <div className="job-location">{post.location}</div>
                    <div className="job-category">{post.category}</div>
                    <div className="job-type">{post.type}</div>
                    </div>
                    <div className="job-description">
                    <h3>About the role</h3>
                    <p>{post.aboutTheRole}</p>
                    <h3>About the company</h3>
                    <p>{post.aboutTheCompany}</p>
                    <h3>Qualifications and Skills</h3>
                    <p>{post.skillsYouNeed}</p>
                    </div>
                    <button onClick={() => handleApprove(post.id)}>Approve</button>
                    <br/><br/>
                    <button onClick={() => handleDeny(post.id)}>Deny</button>
                </div>
            </div>
        </div>
      ))}

    </div>
  );
}

export default AdminPage;
