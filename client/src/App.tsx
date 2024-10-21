import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signupform";
import Login from "./pages/Login";
import AgencyDetails from "./pages/Agencydetails";
import JobSeekers from "./pages/Jobseeker";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatRoom from "./pages/ChatRoom";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/job-seekers"
          element={isLoggedIn ? <JobSeekers /> : <Navigate to="/login" />}
        />
        <Route
          path="/agency-details"
          element={isLoggedIn ? <AgencyDetails /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/chatroom/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
