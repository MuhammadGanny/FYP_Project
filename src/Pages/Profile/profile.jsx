
import Header from "../components/header"
// import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { SaveAll } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Profile() {
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  

  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Implement your save logic here
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the edited text to the original value
    setEditedText("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  //  useEffect(() => {
  //   // Fetch user data
  //   const userId = localStorage.getItem("userId");

  //   axios.get('http://localhost:5000/user/currentuser')
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
    
  //   // Fetch user profile data
  //   axios.get(`http://localhost:5000/user/${userData.userId}`)
  //     .then((response) => {
  //       setUserProfile(response.data);
  //      // setEditedText(response.data.bio || ''); // Set bio for editing
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user profile data:', error);
  //     });
  // }, []);
  
  // useEffect(() => {
  //   // Fetch user data
  //   const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
  //   axios.get('http://localhost:5000/user/currentuser', {
  //     headers: {
  //       Authorization: `Bearer ${token}`, // Set the Authorization header with the token
  //     },
  //   })
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  
  //   // Fetch user profile data
  //   axios.get(`http://localhost:5000/user/${userData.userId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`, // Set the Authorization header with the token
  //     },
  //   })
  //     .then((response) => {
  //       setUserProfile(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user profile data:', error);
  //     });
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const userId = localStorage.getItem('userId');
    //${userId}
    axios.get(`http://localhost:5000/user/currentuser/da2e3948-b717-4ca4-abeb-b365c231f55d`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the token
      },
    })
      .then((response) => {
        console.log('User Data:', response.data); 
        setUserData(response.data);
        const userId = response.data.userId;
        // Fetch user profile data using the obtained userId
       // ${userId}
        axios.get(`http://localhost:5000/user/profile/da2e3948-b717-4ca4-abeb-b365c231f55d`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        })
          .then((profileResponse) => {
            console.log('User Profile Data:', profileResponse.data);
            setUserProfile(profileResponse.data);
          })
          .catch((profileError) => {
            console.error('Error fetching user profile data:', profileError);
            // Handle error fetching user profile
          });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      });
  }, []);
  
  

  
  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
  {/* <!-- User Profile Card --> */}
  <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    {/* <!-- Profile Header with Picture and Basic Info --> */}
    <div className="p-6">
      <div className="flex items-center">
        {/* <!-- Profile Picture --> */}
        <div className="rounded-full overflow-hidden">
          <img className="h-20 w-20 object-cover" src={userProfile.profilePicture} alt="Profile Picture"/>
        </div>
        {/* <!-- Basic Info --> */}
        <div className="ml-4">
          <h1 className="text-xl font-bold text-gray-800">User's Name</h1>
          <p className="text-gray-500">University Name</p>
          {/* <!-- Other basic info like email, phone, etc. --> */}
        </div>
      </div>
    </div>

    {/* <!-- User Information Sections --> */}
    <div className="border-t border-gray-200">
      {/* <!-- Bio Section --> */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
        <p className="text-gray-600">User's bio here...</p>
      </div>

      {/* <!-- Projects Section --> */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
        {/* <!-- Display user's projects using a list or cards -->
        <!-- Example: --> */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-white p-4 shadow-md rounded-lg">Project 1</li>
          <li className="bg-white p-4 shadow-md rounded-lg">Project 2</li>
          {/* <!-- Add more projects here --> */}
        </ul>
      </div>

      {/* <!-- Skills Section --> */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
        {/* <!-- Display user's skills using a list or badges -->
        <!-- Example: --> */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-200 px-2 py-1 rounded-md">Skill 1</span>
          <span className="bg-blue-200 px-2 py-1 rounded-md">Skill 2</span>
          {/* <!-- Add more skills here --> */}
        </div>
      </div>

      {/* <!-- Experiences Section --> */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Experiences</h2>
        {/* <!-- Display user's experiences using a list or cards -->
        <!-- Example: --> */}
        <ul>
          <li>Experience 1</li>
          <li>Experience 2</li>
          {/* <!-- Add more experiences here --> */}
        </ul>
      </div>

      {/* <!-- Education Section --> */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
        {/* <!-- Display user's education details using a list or cards -->
        <!-- Example: --> */}
        <ul>
          <li>Education Detail 1</li>
          <li>Education Detail 2</li>
          {/* <!-- Add more education details here --> */}
        </ul>
      </div>
    </div>
  </div>
</div>



    {/* <div className="w-full h-full flex items-center justify-center">
    <div className="profile-page max-w-3/4 md:max-w-1/2 w-full h-full">
      <div className="profiel-wrap px-5% pb-10 md:pt-5% pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-1">
        <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-10% w-full z-1 rounded-t-lg"></div>
        <div className="profile-box flex-none md:text-start text-center">
          <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
            <div className="flex-none">
              <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                <img src="your-profile-image.jpg" alt="profile photo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-3px">
                <h2>Muhammad Bin Abdul Ganny</h2>
              </div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">Front End Developer</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
  <div className="max-w-[50%] mx-auto bg-white p-5 rounded-lg shadow-md"> 
<div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">About Me</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
          
        </div>
      </div>
    </div>


<div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">Projects</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
          
        </div>
      </div>
    </div>
       
    <div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">Experience</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
        </div>
      </div>
    </div>




      </div>
    </div>

    </div>
  </div> */}
  
  </>
  )
  }

