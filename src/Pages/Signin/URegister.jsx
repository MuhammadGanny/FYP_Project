// // components/Register.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const Register = ({ onRegister }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/user/register', { email, password });
//       onRegister(response.data); // Assuming the response contains user data including userId
//     } catch (error) {
//       console.error(error);
//       // Handle registration error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-96">
//         <h1 className="text-3xl mb-4">Register</h1>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border border-gray-300 rounded p-2 mb-4"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border border-gray-300 rounded p-2 mb-4"
//         />
//         <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded">
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', { email, password });

      // Assuming the response contains user data including userId
      const { userID } = response.data;
      onRegister(userID);

      // Display success message
      setRegistrationMessage('User registered successfully.');
      window.location.href = "/login";
      // Redirect to the login page after a short delay (e.g., 2 seconds)
    //   setTimeout(() => {
    //     history.push('/login'); // Update the route to your login page
    //   }, 2000);
    } catch (error) {
      console.error(error);
      // Handle registration error
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl mb-4">Register</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>

        {registrationMessage && <p className="mt-4 text-green-500">{registrationMessage}</p>}
      </div>
    </div>
  );
};

export default Register;

