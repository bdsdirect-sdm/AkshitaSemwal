import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signupform";
import Login from "./pages/Login";
import Agency from "./pages/Agency";
import JobSeeker from "./pages/JobSeeker";
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
          path="/job-seeker"
          element={isLoggedIn ? <JobSeeker /> : <Navigate to="/login" />}
        />
        <Route
          path="/agency"
          element={isLoggedIn ? <Agency /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/chatroom/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
