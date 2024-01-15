import Header from "../components/header";
import { Pencil, SaveAll } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

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
    setEditedText('');
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    axios.get(`http://localhost:5000/user/currentuser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUserData(response.data);

        const userId = response.data.userId;
        axios.get(`http://localhost:5000/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((profileResponse) => {
            setUserProfile(profileResponse.data);
          })
          .catch((profileError) => {
            console.error('Error fetching user profile data:', profileError);
          });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden">
                <img className="h-20 w-20 object-cover" src={userProfile.profilePicture} alt="Profile Picture" />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-500">{userData.university}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  value={editedText}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-1 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ) : (
                <p className="text-gray-600">{editedText || userProfile.bio}</p>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
              {/* Display user's projects using a list or cards */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.projects && userProfile.projects.map((project, index) => (
                  <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                    {project.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
              <p className="text-gray-600">{isEditing ? editedText : userProfile.experiences}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}









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

