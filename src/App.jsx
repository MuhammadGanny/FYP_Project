import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Home/homepage.jsx";
import HomepageStudent from "./Pages/Home/homepageStudent.jsx";
import Welcome from "./Pages/Welcome/welcomepage.jsx";
import Signin from "./Pages/Signin/signin";
import Profile from "./Pages/Profile/profile";
import Register from "./Pages/Signin/register";
import ProjectPost from "./Pages/ProjectPost/posting";
import Profilesetup from "./Pages/Profile/ProfileSetup";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/homepageStudent" element={<HomepageStudent />} /> 
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profilesetup" element={<Profilesetup />} />
          <Route path="/profile" element={<><Profile /></>}/>
          <Route path="/post" element={<ProjectPost />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
