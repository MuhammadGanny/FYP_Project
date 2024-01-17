import Header from "../components/header";
import { Pencil, SaveAll } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    bio: '',
    name: '',
    university: '',
    profilePicture: null, // Add profilePicture field
    projects: [''],
    skills: [''],
    experiences: '',
    education: '',
  });
  // Read values from cookies
const token = Cookies.get('token');
const userId = Cookies.get('userId');
const userType = Cookies.get('userType');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/profile/setup-profile',
          {
            userId: userId,  // Replace with actual user ID
            userType: userType,  // Replace with actual user type
            // Provide any necessary data for setting up the profile
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the JWT token obtained during sign-in
            },
          }
        );
        
        
        // Handle the response
        console.log(response.data);
    
        // Assuming the response contains the user data and profile
        const { userData, userProfile } = response.data;
    
        // Update state variables
        setUserData(userData);
        setUserProfile(userProfile);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    // Implement your save logic here
    setEditing(false);

    // Update the user's profile data using axios or any other method
    try {
      const response = await axios.put('http://localhost:5000/profile/update-profile', {
        userId: userData.id,  // Replace with actual user ID
        userType: userData.type,  // Replace with actual user type
        profileData: editedFields,
      });

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the edited fields to the original values
    setEditedFields({
      bio: userProfile.bio,
      name: userProfile.name,
      university: userProfile.university,
      profilePicture: userProfile.profilePicture, // Reset profilePicture
      projects: userProfile.projects || [''],
      skills: userProfile.skills || [''],
      experiences: userProfile.experiences,
      education: userProfile.education,
    });
  };

  // const handleInputChange = (field, value) => {
  //   setEditedFields((prevFields) => ({ ...prevFields, [field]: value }));
  // };
  const handleInputChange = (field, value) => {
    if (field === 'profilePicture') {
      // Handle profile picture separately
      setEditedFields((prevFields) => ({ ...prevFields, [field]: value }));
    } else {
      // Handle other fields
      setEditedFields((prevFields) => ({ ...prevFields, [field]: value }));
    }
  };
  

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* <div className="p-6"> */}
            <div className="p-6">
            <div className="flex items-center">
              {/* <div className="rounded-full overflow-hidden">
                <img className="h-20 w-20 object-cover" src={userProfile.profilePicture} alt="Profile Picture" />
              </div> */}
              {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h2> */}
              <div className="ml-4">
                {isEditing ? (
                  <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('profilePicture', e.target.files[0])}
                  />
                  
                  <input
                    type="text"
                    value={editedFields.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-xl font-bold text-gray-800 border-b border-gray-300 outline-none focus:border-indigo-600"
                  />
                  <input
                    type="text"
                    value={editedFields.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    className="text-gray-500 border-b border-gray-300 outline-none focus:border-indigo-600"
                  />
                </>
                ) : (
                  <>
                  <img
                    className="h-20 w-20 object-cover"
                    src={userProfile.profilePicture}
                    alt="Profile Picture"
                  />
                  
                  {/* <h1 className="text-xl font-bold text-gray-800">{userProfile.name} Ganny</h1>
                  <p className="text-gray-500">{userData.university} Szabist</p> */}
                </>
                )}
                </div>
              <div className="ml-7">
                <h1 className="text-xl font-bold text-gray-800">{userProfile.name} Ganny</h1>
                <p className="text-gray-500">{userProfile.university} Szabist</p>
              </div>
            </div>
          {/* </div> */}

            {/* About Me */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  value={editedFields.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full rounded-md border-1 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <p className="text-gray-600">{editedFields.bio || userProfile.bio}</p>
              )}
            </div>

            {/* Projects */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
              {isEditing ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedFields.projects.map((project, index) => (
                    <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                      <input
                        type="text"
                        value={project}
                        onChange={(e) => {
                          const newProjects = [...editedFields.projects];
                          newProjects[index] = e.target.value;
                          handleInputChange('projects', newProjects);
                        }}
                        className="w-full rounded-md border-1 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedFields.projects.map((project, index) => (
                    <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                      {project}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Skills */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
              {isEditing ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedFields.skills.map((skill, index) => (
                    <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...editedFields.skills];
                          newSkills[index] = e.target.value;
                          handleInputChange('skills', newSkills);
                        }}
                        className="w-full rounded-md border-1 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedFields.skills.map((skill, index) => (
                    <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Experiences */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
              {isEditing ? (
                <input
                  type="text"
                  value={editedFields.experiences}
                  onChange={(e) => handleInputChange('experiences', e.target.value)}
                  className="w-full rounded-md border-1 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <p className="text-gray-600">{editedFields.experiences || userProfile.experiences}</p>
              )}
            </div>

            {/* Education */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
              {isEditing ? (
                <input
                  type="text"
                  value={editedFields.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full rounded-md border-1 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-  <300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <p className="text-gray-600">{editedFields.education || userProfile.education}</p>
                )}
              </div>
  
              {/* Profile Picture */}
              {/* <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h2>
                {isEditing ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('profilePicture', e.target.files[0])}
                  />
                ) : (
                  <img
                    className="h-20 w-20 object-cover"
                    src={userProfile.profilePicture}
                    alt="Profile Picture"
                  />
                )}
              </div> */}
  
              {/* Save/Cancel Buttons */}
              <div className="p-6 flex justify-end">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleToggleEdit}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  










// import Header from "../components/header";
// import { Pencil, SaveAll } from 'lucide-react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Profile() {
//   const [userData, setUserData] = useState({});
//   const [userProfile, setUserProfile] = useState({});
//   const [isEditing, setEditing] = useState(false);
//   const [editedText, setEditedText] = useState('');

//   const handleToggleEdit = () => {
//     setEditing(!isEditing);
//   };

//   const handleSaveClick = () => {
//     // Implement your save logic here
//     setEditing(false);
//   };

//   const handleCancelClick = () => {
//     setEditing(false);
//     // Reset the edited text to the original value
//     setEditedText('');
//   };

//   const handleInputChange = (e) => {
//     setEditedText(e.target.value);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     axios.get(`http://localhost:5000/user/currentuser/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         setUserData(response.data);

//         const userId = response.data.userId;
//         axios.get(`http://localhost:5000/user/profile/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//           .then((profileResponse) => {
//             setUserProfile(profileResponse.data);
//           })
//           .catch((profileError) => {
//             console.error('Error fetching user profile data:', profileError);
//           });
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex items-center">
//               <div className="rounded-full overflow-hidden">
//                 <img className="h-20 w-20 object-cover" src={userProfile.profilePicture} alt="Profile Picture" />
//               </div>
//               <div className="ml-4">
//                 <h1 className="text-xl font-bold text-gray-800">{userData.name}</h1>
//                 <p className="text-gray-500">{userData.university}</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
//               {isEditing ? (
//                 <textarea
//                   value={editedText}
//                   onChange={handleInputChange}
//                   className="w-full rounded-md border-1 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               ) : (
//                 <p className="text-gray-600">{editedText || userProfile.bio}</p>
//               )}
//             </div>

//             <div className="p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
//               {/* Display user's projects using a list or cards */}
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {userProfile.projects && userProfile.projects.map((project, index) => (
//                   <li key={index} className="bg-white p-4 shadow-md rounded-lg">
//                     {project.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
//               <p className="text-gray-600">{isEditing ? editedText : userProfile.experiences}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


















// import Header from "../components/header"
// // import React, { useState } from 'react';
// import { Pencil } from 'lucide-react';
// import { SaveAll } from 'lucide-react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// export default function Profile() {
//   const [userData, setUserData] = useState({});
//   const [userProfile, setUserProfile] = useState({});
  

//   const [isEditing, setEditing] = useState(false);
//   const [editedText, setEditedText] = useState("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");

//   const handleToggleEdit = () => {
//     setEditing(!isEditing);
//   };

//   const handleSaveClick = () => {
//     // Implement your save logic here
//     setEditing(false);
//   };

//   const handleCancelClick = () => {
//     setEditing(false);
//     // Reset the edited text to the original value
//     setEditedText("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");
//   };

//   const handleInputChange = (e) => {
//     setEditedText(e.target.value);
//   };


//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Retrieve the token from local storage
//     const userId = localStorage.getItem('userId');
//     //${userId}
//     axios.get(`http://localhost:5000/user/currentuser/da2e3948-b717-4ca4-abeb-b365c231f55d`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the Authorization header with the token
//       },
//     })
//       .then((response) => {
//         console.log('User Data:', response.data); 
//         setUserData(response.data);
//         const userId = response.data.userId;
//         // Fetch user profile data using the obtained userId
//        // ${userId}
//         axios.get(`http://localhost:5000/user/profile/da2e3948-b717-4ca4-abeb-b365c231f55d`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set the Authorization header with the token
//           },
//         })
//           .then((profileResponse) => {
//             console.log('User Profile Data:', profileResponse.data);
//             setUserProfile(profileResponse.data);
//           })
//           .catch((profileError) => {
//             console.error('Error fetching user profile data:', profileError);
//             // Handle error fetching user profile
//           });
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//         // Handle error fetching user data
//       });
//   }, []);
  
  

  
//   return (
//     <>
//     <Header/>
//     <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//   {/* <!-- User Profile Card --> */}
//   <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//     {/* <!-- Profile Header with Picture and Basic Info --> */}
//     <div className="p-6">
//       <div className="flex items-center">
//         {/* <!-- Profile Picture --> */}
//         <div className="rounded-full overflow-hidden">
//           <img className="h-20 w-20 object-cover" src={userProfile.profilePicture} alt="Profile Picture"/>
//         </div>
//         {/* <!-- Basic Info --> */}
//         <div className="ml-4">
//           <h1 className="text-xl font-bold text-gray-800">{userData.name}</h1>
//           <p className="text-gray-500">{userData.university}</p>
//           {/* <!-- Other basic info like email, phone, etc. --> */}
//         </div>
//       </div>
//     </div>

//     {/* <!-- User Information Sections --> */}
//     <div className="border-t border-gray-200">
//       {/* <!-- Bio Section --> */}
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
//         <p className="text-gray-600">User's bio here...</p>
//       </div>

//       {/* <!-- Projects Section --> */}
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
//         {/* <!-- Display user's projects using a list or cards -->
//         <!-- Example: --> */}
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {userProfile.projects && userProfile.projects.map((project, index) => (
//     <li key={index} className="bg-white p-4 shadow-md rounded-lg">
//       {project.name}
//     </li>
//   ))}
//           <li className="bg-white p-4 shadow-md rounded-lg">Project 1</li>
//           <li className="bg-white p-4 shadow-md rounded-lg">Project 2</li>
//           {/* <!-- Add more projects here --> */}
//         </ul>
//       </div>

//       {/* <!-- Skills Section --> */}
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
//         {/* <!-- Display user's skills using a list or badges -->
//         <!-- Example: --> */}
//         <div className="flex flex-wrap gap-2">
//           <span className="bg-blue-200 px-2 py-1 rounded-md">Skill 1</span>
//           <span className="bg-blue-200 px-2 py-1 rounded-md">Skill 2</span>
//           {/* <!-- Add more skills here --> */}
//         </div>
//       </div>

//       {/* <!-- Experiences Section --> */}
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Experiences</h2>
//         {/* <!-- Display user's experiences using a list or cards -->
//         <!-- Example: --> */}
//         <ul>
//           <li>Experience 1</li>
//           <li>Experience 2</li>
//           {/* <!-- Add more experiences here --> */}
//         </ul>
//       </div>

//       {/* <!-- Education Section --> */}
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
//         {/* <!-- Display user's education details using a list or cards -->
//         <!-- Example: --> */}
//         <ul>
//           <li>Education Detail 1</li>
//           <li>Education Detail 2</li>
//           {/* <!-- Add more education details here --> */}
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>
  
//   </>
//   )
//   }

