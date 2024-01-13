// // components/Login.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/user/login', { email, password });
//       onLogin(response.data); // Assuming the response contains user data including userId
//     } catch (error) {
//       console.error(error);
//       // Handle login error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-96">
//         <h1 className="text-3xl mb-4">Login</h1>
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
//         <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', { email, password });
      //onLogin(response.data); // Assuming the response contains user data including userId
      const userData = response.data;
      // Display success message
      console.log('User logged in:', userData);
      setLoginMessage('Login successful.');

      // Redirect to the user type selection page after a short delay (e.g., 2 seconds)
      //window.location.href = "/userselect";
     // history.push('/userselect', { userId: userData.userID, token: userData.token });
    //   setTimeout(() => {
    //     history.push('/user-type-selection'); // Update the route to your user type selection page
    //   }, 2000);
    setTimeout(() => {
        navigate('/userselect', { state: { userId: userData.userId, token: userData.token } });// Use navigate
      }, 2000);
    } catch (error) {
      console.error(error);
      // Handle login error
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96">
        <h1 className="text-3xl mb-4">Login</h1>
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
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        {loginMessage && <p className="mt-4 text-green-500">{loginMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
