// // components/UserTypeSelection.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const UserTypeSelection = ({ userId, onSelectUserType }) => {
//   const [userType, setUserType] = useState('');

//   const handleUserTypeSelection = async () => {
//     try {
//       await axios.post('http://localhost:5000/user/update-user-type', { userId, userType });
//       onSelectUserType(userType);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//     <div className="w-96">
//       <h1 className="text-3xl mb-4">Select User Type</h1>
//       <label className="block mb-2">
//         <input
//           type="radio"
//           value="student"
//           checked={userType === 'student'}
//           onChange={() => setUserType('student')}
//           className="mr-2"
//         />
//         Student
//       </label>
//       <label className="block mb-4">
//         <input
//           type="radio"
//           value="company"
//           checked={userType === 'company'}
//           onChange={() => setUserType('company')}
//           className="mr-2"
//         />
//         Company
//       </label>
//       <button onClick={handleUserTypeSelection} className="w-full bg-blue-500 text-white p-2 rounded">
//         Continue
//       </button>
//     </div>
//   </div>
//   );
// };

// export default UserTypeSelection;

import { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserTypeSelection = ({ userId, onSelectUserType, userToken }) => {
  const [userType, setUserType] = useState('');
  const [selectionMessage, setSelectionMessage] = useState('');
  const navigate = useNavigate();
//   const history = useHistory();

  const handleUserTypeSelection = async () => {
    try {
        const response = await axios.post('http://localhost:5000/user/update-user-type', { userId, userType }, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Add the user's JWT token here
          },
        });
        onSelectUserType(userType);

      // Display success message
      setSelectionMessage('User type selected successfully.');
         
      setTimeout(() => {
        navigate('/profile-setup'); // Use navigate
      }, 2000);
      //window.location.href = "/profile-setup";
      // Redirect to the profile setup page after a short delay (e.g., 2 seconds)
    //   setTimeout(() => {
    //     history.push('/profile-setup'); // Update the route to your profile setup page
    //   }, 2000);
    } catch (error) {
      console.error(error);
      // Handle error
      setSelectionMessage('Failed to select user type. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl mb-4">Select User Type</h1>
        <label className="block mb-2">
          <input
            type="radio"
            value="student"
            checked={userType === 'student'}
            onChange={() => setUserType('student')}
            className="mr-2"
          />
          Student
        </label>
        <label className="block mb-4">
          <input
            type="radio"
            value="company"
            checked={userType === 'company'}
            onChange={() => setUserType('company')}
            className="mr-2"
          />
          Company
        </label>
        <button onClick={handleUserTypeSelection} className="w-full bg-blue-500 text-white p-2 rounded">
          Continue
        </button>

        {selectionMessage && <p className="mt-4 text-green-500">{selectionMessage}</p>}
      </div>
    </div>
  );
};

export default UserTypeSelection;
