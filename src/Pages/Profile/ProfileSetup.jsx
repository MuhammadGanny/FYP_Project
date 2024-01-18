// // components/ProfileSetup.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const ProfileSetup = ({ userId, userType, onProfileSetup }) => {
//   const [profileData, setProfileData] = useState({
//     // Initialize with default values or fetched values if needed
//   });

//   const handleProfileSetup = async () => {
//     try {
//       await axios.post('http://your-api/profile-setup', { userId, userType, profileData });
//       onProfileSetup(userId, userType, profileData);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-96">
//         <h1 className="text-3xl mb-4">Profile Setup</h1>
//         {/* Render profile setup form based on user type */}
//         {userType === 'student' && (
//           // Example: Student profile setup form
//           <div>
//             <label className="block mb-2">
//               Name:
//               <input
//                 type="text"
//                 value={profileData.name || ''}
//                 onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             {/* ... other fields */}
//           </div>
//         )}
//         {userType === 'company' && (
//           // Example: Company profile setup form
//           <div>
//             <label className="block mb-2">
//               Company Name:
//               <input
//                 type="text"
//                 value={profileData.companyName || ''}
//                 onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             {/* ... other fields */}
//           </div>
//         )}
//         <button onClick={handleProfileSetup} className="w-full bg-blue-500 text-white p-2 rounded">
//           Complete Profile Setup
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSetup;

// components/ProfileSetup.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const ProfileSetup = ({ userId, userType, onProfileSetup }) => {
//   const [profileData, setProfileData] = useState({
//     // Initialize with default values or fetched values if needed
//     name: '',
//     university: '', // Additional field for student profile
//     bio: '', // Additional field for student profile
//     projects: [], // Additional field for student profile
//     skills: [], // Additional field for student profile
//     experiences: [], // Additional field for student profile
//     education: '', // Additional field for student profile
//     companyName: '', // Additional field for company profile
//     description: '', // Additional field for company profile
//     products: [], // Additional field for company profile
//     services: [], // Additional field for company profile
//     profilePicture: '', // Additional field for both student and company profiles
//   });

//   const handleProfileSetup = async () => {
//     try {
//       await axios.post('http://localhost:5000/profile/profile-setup', { userId, userType, profileData });
//       onProfileSetup(userId, userType, profileData);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-96">
//         <h1 className="text-3xl mb-4">Profile Setup</h1>
//         {/* Render profile setup form based on user type */}
//         {userType === 'student' && (
//           // Example: Student profile setup form
//           <div>
//             <label className="block mb-2">
//               Name:
//               <input
//                 type="text"
//                 value={profileData.name || ''}
//                 onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               University:
//               <input
//                 type="text"
//                 value={profileData.university || ''}
//                 onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Bio:
//               <textarea
//                 value={profileData.bio || ''}
//                 onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             {/* ... other fields specific to student profile */}
//           </div>
//         )}
//         {userType === 'company' && (
//           // Example: Company profile setup form
//           <div>
//             <label className="block mb-2">
//               Company Name:
//               <input
//                 type="text"
//                 value={profileData.companyName || ''}
//                 onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Description:
//               <textarea
//                 value={profileData.description || ''}
//                 onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             {/* ... other fields specific to company profile */}
//           </div>
//         )}
//         <label className="block mb-2">
//           Profile Picture URL:
//           <input
//             type="text"
//             value={profileData.profilePicture || ''}
//             onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
//             className="w-full border border-gray-300 rounded p-2 mb-2"
//           />
//         </label>
//         <button onClick={handleProfileSetup} className="w-full bg-blue-500 text-white p-2 rounded">
//           Complete Profile Setup
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSetup;

// components/ProfileSetup.jsx
// import { useState } from "react";
// import axios from "axios";
// import { Button } from "@material-tailwind/react";
// import Header from "../components/header";

// const ProfileSetup = ({ userId, userType, onProfileSetup }) => {
//   const [profileData, setProfileData] = useState({
//     name: "",
//     university: "", // Additional field for student profile
//     bio: "", // Additional field for student profile
//     projects: [], // Additional field for student profile
//     skills: [], // Additional field for student profile
//     experiences: [], // Additional field for student profile
//     education: "", // Additional field for student profile
//     companyName: "", // Additional field for company profile
//     description: "", // Additional field for company profile
//     products: [], // Additional field for company profile
//     services: [], // Additional field for company profile
//     profilePicture: "", // Additional field for both student and company profiles
//   });

//   const handleProfileSetup = async () => {
//     try {
//       await axios.post("http://localhost:5000/profile/setup-profile", {
//         userId,
//         userType,
//         profileData,
//       });
//       onProfileSetup(userId, userType, profileData);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-96">
//           <h1 className="text-3xl mb-4">Profile Setup</h1>
//           {/* Render profile setup form based on user type */}
//           {/* {(userType === 'student' || userType === 'company') && ( */}
//           <div>
//             {/* {userType === 'student' && ( */}
//             // Student profile setup form
//             <div>
//               <label className="block mb-2">
//                 Name:
//                 <input
//                   type="text"
//                   value={profileData.name || ""}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, name: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 University:
//                 <input
//                   type="text"
//                   value={profileData.university || ""}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       university: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Bio:
//                 <textarea
//                   value={profileData.bio || ""}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, bio: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Projects (comma-separated):
//                 <input
//                   type="text"
//                   value={profileData.projects.join(", ") || ""}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       projects: e.target.value.split(",").map((s) => s.trim()),
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Skills (comma-separated):
//                 <input
//                   type="text"
//                   value={profileData.skills.join(", ") || ""}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       skills: e.target.value.split(",").map((s) => s.trim()),
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Experiences (comma-separated):
//                 <input
//                   type="text"
//                   value={profileData.experiences.join(", ") || ""}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       experiences: e.target.value
//                         .split(",")
//                         .map((s) => s.trim()),
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//               <label className="block mb-2">
//                 Education:
//                 <input
//                   type="text"
//                   value={profileData.education || ""}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       education: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded p-2 mb-2"
//                 />
//               </label>
//             </div>
//             {/* )} */}
//             {/* {userType === 'company' && ( */}
//             // Company profile setup form
//             {/* <div>
//             <label className="block mb-2">
//               Company Name:
//               <input
//                 type="text"
//                 value={profileData.companyName || ""}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     companyName: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Description:
//               <textarea
//                 value={profileData.description || ""}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Products (comma-separated):
//               <input
//                 type="text"
//                 value={profileData.products.join(", ") || ""}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     products: e.target.value.split(",").map((s) => s.trim()),
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Services (comma-separated):
//               <input
//                 type="text"
//                 value={profileData.services.join(", ") || ""}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     services: e.target.value.split(",").map((s) => s.trim()),
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//           </div> */}
//             {/* )} */}
//             <label className="block mb-2">
//               Profile Picture URL:
//               <input
//                 id="file-upload"
//                 name="file-upload"
//                 type="file"
//                 value={profileData.profilePicture || ""}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     profilePicture: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded p-2 mb-2"
//               />
//             </label>
//           </div>
//           {/* )} */}
//           <button
//             onClick={handleProfileSetup}
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Complete Profile Setup
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileSetup;

import React, { useState, useEffect } from "react";

import axios from "axios";
import { Button } from "@material-tailwind/react";
import Header from "../components/header";
import Cookies from "js-cookie";

// const ProfileSetup = ({ userId, userType, onProfileSetup, token }) => {
//   const [profileData, setProfileData] = useState({
//     name: "",
//     university: "",
//     bio: "",
//     projects: [],
//     skills: [],
//     experiences: [],
//     education: "",
//     companyName: "",
//     description: "",
//     products: [],
//     services: [],
//     profilePicture: "",
//   });
// const ProfileSetup = ({ onProfileSetup }) => {
export default function ProfileSetup() {
  const [profileData, setProfileData] = useState({
    name: "",
    university: "",
    bio: "",
    projects: [],
    skills: [],
    experiences: [],
    education: "",
    companyName: "",
    description: "",
    products: [],
    services: [],
    profilePicture: "",
  });

  const [userType, setUserType] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // Retrieve user type and token from cookies
    const userIdFromCookie = Cookies.get("userId");
    const userTypeFromCookie = Cookies.get("userType");
    const tokenFromCookie = Cookies.get("token");

    if (userIdFromCookie && userTypeFromCookie && tokenFromCookie) {
      setUserId(userIdFromCookie);
      setUserType(userTypeFromCookie);
      setToken(tokenFromCookie);

      console.log("User ID:", userIdFromCookie);
      console.log("User Type:", userTypeFromCookie);
      console.log("Token:", tokenFromCookie);
    } else {
      // Handle case where userType or token is not available
    }
  }, []);

  const handleProfileSetup = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userType", userType);
      formData.append("profileData", JSON.stringify(profileData));

      // Append the profile picture file
      formData.append(
        "profilePicture",
        document.getElementById("file-upload").files[0]
      );

      await axios.post(
        "http://localhost:5000/profile/setup-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set the content type
          },
        }
      );
      // onProfileSetup(userId, userType, profileData);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  // const handleProfileSetup = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/profile/setup-profile",
  //       { userId, userType, profileData },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     // onProfileSetup(userId, userType, profileData);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error
  //   }
  // };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="w-96">
          <h1 className="text-3xl mb-4">Profile Setup</h1>
          <div>
            {userType === "student" && (
              <div>
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    value={profileData.name || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  University:
                  <input
                    type="text"
                    value={profileData.university || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        university: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Bio:
                  <textarea
                    value={profileData.bio || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Projects (comma-separated):
                  <input
                    type="text"
                    value={profileData.projects.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        projects: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Skills (comma-separated):
                  <input
                    type="text"
                    value={profileData.skills.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Experiences (comma-separated):
                  <input
                    type="text"
                    value={profileData.experiences.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        experiences: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Education:
                  <input
                    type="text"
                    value={profileData.education || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        education: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
              </div>
            )}
            {userType === "company" && (
              <div>
                <label className="block mb-2">
                  Company Name:
                  <input
                    type="text"
                    value={profileData.companyName || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <textarea
                    value={profileData.description || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Products (comma-separated):
                  <input
                    type="text"
                    value={profileData.products.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        products: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Services (comma-separated):
                  <input
                    type="text"
                    value={profileData.services.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        services: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
              </div>
            )}
            <label className="block mb-2">
              Profile Picture URL:
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                value={profileData.profilePicture || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    profilePicture: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
          </div>
          <button
            onClick={handleProfileSetup}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Complete Profile Setup
          </button>
        </div>
      </div>
    </>
  );
}

// export default ProfileSetup;
