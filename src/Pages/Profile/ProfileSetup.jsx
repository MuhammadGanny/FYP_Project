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
import { useState } from 'react';
import axios from 'axios';

const ProfileSetup = ({ userId, userType, onProfileSetup }) => {
  const [profileData, setProfileData] = useState({
    // Initialize with default values or fetched values if needed
    name: '',
    university: '', // Additional field for student profile
    bio: '', // Additional field for student profile
    projects: [], // Additional field for student profile
    skills: [], // Additional field for student profile
    experiences: [], // Additional field for student profile
    education: '', // Additional field for student profile
    companyName: '', // Additional field for company profile
    description: '', // Additional field for company profile
    products: [], // Additional field for company profile
    services: [], // Additional field for company profile
    profilePicture: '', // Additional field for both student and company profiles
  });

  const handleProfileSetup = async () => {
    try {
      await axios.post('http://localhost:5000/profile-setup', { userId, userType, profileData });
      onProfileSetup(userId, userType, profileData);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl mb-4">Profile Setup</h1>
        {/* Render profile setup form based on user type */}
        {userType === 'student' && (
          // Example: Student profile setup form
          <div>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={profileData.name || ''}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
            <label className="block mb-2">
              University:
              <input
                type="text"
                value={profileData.university || ''}
                onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
            <label className="block mb-2">
              Bio:
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
            {/* ... other fields specific to student profile */}
          </div>
        )}
        {userType === 'company' && (
          // Example: Company profile setup form
          <div>
            <label className="block mb-2">
              Company Name:
              <input
                type="text"
                value={profileData.companyName || ''}
                onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                value={profileData.description || ''}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </label>
            {/* ... other fields specific to company profile */}
          </div>
        )}
        <label className="block mb-2">
          Profile Picture URL:
          <input
            type="text"
            value={profileData.profilePicture || ''}
            onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 mb-2"
          />
        </label>
        <button onClick={handleProfileSetup} className="w-full bg-blue-500 text-white p-2 rounded">
          Complete Profile Setup
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
