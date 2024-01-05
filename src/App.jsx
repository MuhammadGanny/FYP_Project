// import Homepage from './Pages/Home/homepage'
// import Welcome from './Pages/Welcome/welcomepage'
// import Signin from './Pages/Signin/signin'
// import Profile from './Pages/Profile/profile'
// import Profileform from './Pages/Profile/Profileform'
// import Register from './Pages/Signin/register'
// import ProfileB from './Pages/Profile/userprofile'

// function App() {
//   return (

//     <>
//     {/* <Homepage/> */}
//     {/* <Welcome/> */}
//     {/* <Signin/> */}
//     {/* <Register/> */}
//     {/* <Profile/> */}
//     {/* <Profileform/> */}
//     {/* <ProfileB/> */}

//     </>
//   );
// }

// export default App;

//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import profilebox from "./Pages/components/profilebox";
import Homepage from "./Pages/Home/homepage.jsx";
import Welcome from "./Pages/Welcome/welcomepage.jsx";
import Signin from "./Pages/Signin/signin";
import Profile from "./Pages/Profile/profile";
import Register from "./Pages/Signin/register";
import RegisterCompany from "./Pages/Signin/registercompany";
// import Profileform from './Pages/Profile/Profileform'
import ProjectPost from "./Pages/ProjectPost/posting";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/student/register" element={<Register />} />
          <Route path="/company/register" element={<RegisterCompany />} />

          {/* <Route path="/profileform" element={<Profileform />} /> */}
          <Route path="/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
          <Route path="/post" element={<ProjectPost />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
