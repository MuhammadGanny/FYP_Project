// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import LOGO from "../Assets/logo.svg";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/header";
// import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// export default function Home() {
//   const [projectPosts, setProjectPosts] = useState([]);
//   const [userIdFromCookie, setUserIdFromCookie] = useState("");

//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:5000/posts")
//   //     .then((response) => {
//   //       const reversedPosts = response.data.posts.reverse();
//   //       setProjectPosts(reversedPosts);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching project posts:", error);
//   //     });
//   // }, []);

//   useEffect(() => {
//     // Fetch posts by author (user ID from cookies)
//     const fetchPostsByAuthor = async () => {
//       try {
//         const userIdFromCookie = Cookies.get("userId");
//         setUserIdFromCookie(userIdFromCookie);

//         const response = await axios.get(
//           `http://localhost:5000/posts/author/${userIdFromCookie}`
//         );
//         const reversedPosts = response.data.posts.reverse();
//         setProjectPosts(reversedPosts);
//       } catch (error) {
//         console.error("Error fetching project posts:", error);
//       }
//     };
//     fetchPostsByAuthor();
//   }, []);

//   useEffect(() => {
//     const handleConnect = async (postId, studentId) => {
//       try {
//         await axios.post("http://localhost:5000/posts/connect", {
//           postId,
//           studentId, //student will be only shown the button
//         });
//         // Show success message or update UI accordingly
//       } catch (error) {
//         console.error("Error connecting with project:", error);
//         // Show error message or handle error case
//       }
//     };
//     // const setUserIdFromCookie = Cookies.get("userId");
//     // setUserIdFromCookie(userIdFromCookie);
//     const userIdFromCookie = Cookies.get("userId");
//     setUserIdFromCookie(userIdFromCookie);
//     const userTypeFromCookie = Cookies.get("userType");
//     const tokenFromCookie = Cookies.get("token");

//     console.log("User ID: in post area ", userIdFromCookie);
//     // console.log("User Type: in post area ", userTypeFromCookie);
//     // console.log("Token: in post area ", tokenFromCookie);
//     // } else {
//     //   console.log("ID type and Token Not avauilable in cookies ");
//     // }
//   }, []);

//   return (
//     <>
//       <div className="min-h-full">
//         <Header />

//         <header className="bg-[#DEE4EA] shadow">
//           <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               Project Listing
//             </h1>
//           </div>
//         </header>
//         <main className="bg-gray-100">
//           <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//             {projectPosts.map((post) => (
//               <Link to={`/projectpage/${post._id}`} key={post._id}>
//                 <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
//                   <CardBody>
//                     <Typography variant="h5" color="blue-gray" className="mb-2">
//                       {post.projectHeading}
//                     </Typography>
//                     <Typography>{post.projectDescription}</Typography>
//                     <Typography variant="h5" color="blue-gray" className="mb-2">
//                       Skills
//                     </Typography>
//                     <div className="flex flex-wrap gap-2">
//                       {post.skills.map(
//                         (
//                           skill,
//                           index // Mapping over the skills array
//                         ) => (
//                           <span
//                             key={index}
//                             className="bg-blue-200 px-2 py-1 rounded-md"
//                           >
//                             {skill}
//                           </span>
//                         )
//                       )}
//                     </div>
//                   </CardBody>
//                   <CardFooter className="pt-0">
//                     {/* <Button className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                     Connect
//                   </Button> */}
//                     {/* <Button
//                       className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       onClick={() => handleConnect(post._id, userIdFromCookie)} // Assuming you have access to studentId
//                     >
//                       Connect
//                     </Button> */}
//                   </CardFooter>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/header";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Home() {
  const [projectPosts, setProjectPosts] = useState([]);
  const [userIdFromCookie, setUserIdFromCookie] = useState("");

  useEffect(() => {
    const fetchPostsByAuthor = async () => {
      try {
        const userIdFromCookie = Cookies.get("userId");
        setUserIdFromCookie(userIdFromCookie);

        const response = await axios.get(
          `http://localhost:5000/posts/author/${userIdFromCookie}`
        );
        const reversedPosts = response.data.posts.reverse();
        setProjectPosts(reversedPosts);
      } catch (error) {
        console.error("Error fetching project posts:", error);
      }
    };
    fetchPostsByAuthor();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      setProjectPosts(projectPosts.filter((post) => post._id !== postId));
      // Show success message or update UI accordingly
    } catch (error) {
      console.error("Error deleting post:", error);
      // Show error message or handle error case
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Header />

        <header className="bg-[#DEE4EA] shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Project Listing
            </h1>
          </div>
        </header>
        <main className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {projectPosts.map((post) => (
              <div key={post._id} className="mt-6 w-[60%] ml-[20%]">
                <Card>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {post.projectHeading}
                    </Typography>
                    <Typography>{post.projectDescription}</Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Skills
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {post.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-200 px-2 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between">
                      <Link to={`/projectpage/${post._id}`}>
                        <Button className="flex w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          View Details
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDelete(post._id)}
                          className="flex w-[76%] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                          >
                          Delete
                        </Button>
                        <Link to={`/updatepost/${post._id}`}>
                          <Button className="flex w-[76%] justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            Update
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Header from "../components/header";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// export default function Home() {
//   const [projectPosts, setProjectPosts] = useState([]);
//   const [userIdFromCookie, setUserIdFromCookie] = useState("");
//   const [editingPost, setEditingPost] = useState(null);
//   const [updatedContent, setUpdatedContent] = useState("");

//   useEffect(() => {
//     const fetchPostsByAuthor = async () => {
//       try {
//         const userIdFromCookie = Cookies.get("userId");
//         setUserIdFromCookie(userIdFromCookie);

//         const response = await axios.get(
//           `http://localhost:5000/posts/author/${userIdFromCookie}`
//         );
//         const reversedPosts = response.data.posts.reverse();
//         setProjectPosts(reversedPosts);
//       } catch (error) {
//         console.error("Error fetching project posts:", error);
//       }
//     };
//     fetchPostsByAuthor();
//   }, []);

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(`http://localhost:5000/posts/${postId}`);
//       setProjectPosts(projectPosts.filter((post) => post._id !== postId));
//       // Show success message or update UI accordingly
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       // Show error message or handle error case
//     }
//   };

//   const handleUpdate = async (postId) => {
//     try {
//       await axios.put(`http://localhost:5000/posts/${postId}`, {
//         content: updatedContent,
//       });
//       // Update the UI to reflect the changes
//       const updatedPosts = projectPosts.map((post) =>
//         post._id === postId ? { ...post, content: updatedContent } : post
//       );
//       setProjectPosts(updatedPosts);
//       // Reset the editing state
//       setEditingPost(null);
//       setUpdatedContent("");
//       // Show success message or update UI accordingly
//     } catch (error) {
//       console.error("Error updating post:", error);
//       // Show error message or handle error case
//     }
//   };

//   return (
//     <>
//       <div className="min-h-full">
//         <Header />
//         {/* Other JSX code */}

//         {projectPosts.map((post) => (
//           <div key={post._id} className="mt-6 w-[60%] ml-[20%]">
//             <Card>
//               <CardBody>
//                 {editingPost === post ? (
//                   <>
//                     <label className="block text-sm font-bold leading-6 text-gray-900">
//                       PROJECT HEADING
//                     </label>
//                     <input
//                       value={updatedHeading}
//                       onChange={(e) => setUpdatedHeading(e.target.value)}
//                       className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <label className="block text-sm  font-bold leading-6 text-gray-900">
//                       PROJECT DESCRIPTION
//                     </label>
//                     <textarea
//                       value={updatedDescription}
//                       onChange={(e) => setUpdatedDescription(e.target.value)}
//                       className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <label className="block text-sm  font-bold leading-6 text-gray-900">
//                       SKILLS (one per line):
//                     </label>
//                     <textarea
//                       value={updatedSkills}
//                       onChange={(e) => setUpdatedSkills(e.target.value)}
//                       onBlur={(e) => {
//                         const skillsArray = e.target.value
//                           .split("\n")
//                           .map((skill) => skill.trim());
//                         setUpdatedSkills(skillsArray.join("\n"));
//                       }}
//                       className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <Typography>{post.heading}</Typography>
//                     <Typography>{post.description}</Typography>
//                     <Typography>{post.skills}</Typography>
//                   </>
//                 )}
//               </CardBody>
//               <CardFooter className="pt-0">
//                 <div className="flex justify-between">
//                   <div className="flex gap-2">
//                     <Button onClick={() => handleDelete(post._id)}>
//                       Delete
//                     </Button>
//                     <Button onClick={() => setEditingPost(post)}>Edit</Button>
//                   </div>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
