// import React, { useEffect, useState } from "react";
// import socket from "../../socket.js"; // Import the socket instance

// const Notifications = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     socket.emit("joinRoom", { userId });

//     socket.on("newNotification", (notification) => {
//       setNotifications((prev) => [...prev, notification]);
//     });

//     return () => {
//       socket.off("newNotification");
//     };
//   }, [userId]);

//   return (
//     <div>
//       <h3>Notifications</h3>
//       <ul>
//         {notifications.map((notif, index) => (
//           <li key={index}>
//             {notif.message} - {new Date(notif.createdAt).toLocaleTimeString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
// src/Pages/components/Notifications.jsx
import React, { useEffect, useState } from "react";
import socket from "../../socket.js";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { userId });

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
      // Optionally trigger a toast notification or sound alert here
    });

    return () => {
      socket.off("newNotification");
    };
  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            {notif.message} - {new Date(notif.createdAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
