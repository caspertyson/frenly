import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import JobListing from './pages/JobListing';
import Navbar from './components/Navbar';
import PostListing from './pages/PostListing';
import SignIn from './pages/SignIn'
import SignInEmployer from './pages/SignInEmployer';
import Employers from './pages/Employers'
import EditListing from './pages/EditListing';
import Admin from './pages/Admin'
import Application from './pages/Application';
import ViewCandidates from './pages/ViewCandidates';

import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post-listing" element={<PostListing />} />
          <Route path="/roles/:jobId" element={<JobListing />} />
          <Route path="/sign-in-employer" element={<SignInEmployer />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/edit/:listingUID" element={<EditListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/apply/:listingUID" element={<Application />} />
          <Route path="/view-candidates/:listingUID" element={<ViewCandidates />} />
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
