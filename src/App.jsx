import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import socket from "./socket"; // Import your socket instance
// import Cookies from "js-cookie";

import Homepage from "./Pages/Home/homepage.jsx";
import HomepageStudent from "./Pages/Home/homepageStudent.jsx";
import Welcome from "./Pages/Welcome/welcomepage.jsx";
import Signin from "./Pages/Signin/signin";
import Profile from "./Pages/Profile/profile";
import Register from "./Pages/Signin/register";
import ProjectPost from "./Pages/ProjectPost/posting";
import Profilesetup from "./Pages/Profile/ProfileSetup";
import Projectpage from "./Pages/Project/project.jsx";
import UpdatePost from "./Pages/ProjectPost/updatepost.jsx";
import Milestone from "./Pages/Project/milestone.jsx";
import StudentMilestones from "./Pages/Project/StudentMilestones.jsx"; // Import the new component
import OngoingProjects from "./Pages/Project/OngoingProjects.jsx"; // New import
import UpdateProfile from "./Pages/Profile/UpdateProfile.jsx";

function App() {
  // useEffect(() => {
  //   const userId = Cookies.get("userId");
  //   if (userId) {
  //     socket.emit("join", userId);
  //   }
  // }, []);
  return (
    <Router>
      <>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/homepageStudent" element={<HomepageStudent />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profilesetup" element={<Profilesetup />} />
          {/* <Route path="/projectpage" element={<Projectpage />} /> */}
          <Route path="/projectpage/:id" element={<Projectpage />} />
          <Route
            path="/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
          <Route path="/post" element={<ProjectPost />} />
          <Route path="/milestone/:postId" element={<Milestone />} />
          <Route path="/updatepost/:postId" element={<UpdatePost />} />
          <Route path="/" element={<Welcome />} />
          <Route
            path="/student-milestones/:postId"
            element={<StudentMilestones />}
          />
          {/* Add new route */}
          <Route path="/ongoing-projects" element={<OngoingProjects />} />
          {/* New route */}
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
