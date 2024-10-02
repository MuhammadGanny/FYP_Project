// src/socket.js
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });
//const socket = io("http://localhost:5000");

const socket = io("https://fyp-project.vercel.app");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});

export default socket;

// src/socket.js
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });

// export default socket;

// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true, // Ensure credentials (cookies, headers) are included
// });

// export default socket;

// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd",
//   },
// });

// export default socket;
