// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import LOGO from "../Assets/logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStudent from "../components/HeaderStudent";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@material-tailwind/react";
export default function Home() {
  const [projectPosts, setProjectPosts] = useState([]);
  const [userIdFromCookie, setUserIdFromCookie] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        const reversedPosts = response.data.posts.reverse();
        setProjectPosts(reversedPosts);
      })
      .catch((error) => {
        console.error("Error fetching project posts:", error);
      });
  }, []);

  const handleConnect = async (postId, studentId) => {
    try {
      await axios.post("http://localhost:5000/posts/connect", {
        postId,
        studentId,
      });
      toast.success("Connected successfully!");
    } catch (error) {
      console.error("Error connecting with project:", error);
      toast.error("Error connecting with project.");
    }
  };

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    setUserIdFromCookie(userIdFromCookie);
  }, []);

  // Filter project posts based on search keyword
  const filteredPosts = projectPosts.filter((post) =>
    post.skills.some((skill) =>
      skill.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <>
      <div className="min-h-full">
        <HeaderStudent />

        <header className="bg-[#DEE4EA] shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Project Listing
            </h1>
          </div>
        </header>
        <main className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Search bar */}
            {/* <div className="flex justify-center mb-6 "> */}
            <Input
              type="text"
              size="md"
              placeholder="Search by skills..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="block bg-[#DEE4EA]   ml-[30%] w-full max-w-md border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* </div> */}

            {filteredPosts.map((post) => (
              <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
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
                  <Button
                    className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleConnect(post._id, userIdFromCookie)}
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

// export default function Home() {
//   const [projectPosts, setProjectPosts] = useState([]);
//   const [userIdFromCookie, setUserIdFromCookie] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/posts")
//       .then((response) => {
//         const reversedPosts = response.data.posts.reverse();
//         setProjectPosts(reversedPosts);
//       })
//       .catch((error) => {
//         console.error("Error fetching project posts:", error);
//       });
//   }, []);

//   const handleConnect = async (postId, studentId) => {
//     try {
//       await axios.post("http://localhost:5000/posts/connect", {
//         postId,
//         studentId, //student will be only shown the button
//       });
//       // Show success message or update UI accordingly
//       toast.success("Connected successfully!"); // Display success toast
//     } catch (error) {
//       console.error("Error connecting with project:", error);
//       toast.error("Error connecting with project.");
//       // Show error message or handle error case
//     }
//   };
//   useEffect(() => {
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
//         <HeaderStudent />

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
//               <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
//                 <CardBody>
//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     {post.projectHeading}
//                   </Typography>
//                   <Typography>{post.projectDescription}</Typography>

//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     Skills
//                   </Typography>
//                   <div className="flex flex-wrap gap-2">
//                     {post.skills.map(
//                       (
//                         skill,
//                         index // Mapping over the skills array
//                       ) => (
//                         <span
//                           key={index}
//                           className="bg-blue-200 px-2 py-1 rounded-md"
//                         >
//                           {skill}
//                         </span>
//                       )
//                     )}
//                   </div>
//                   {/* <Typography>{post.skills}</Typography>
//                   <div className="p-6">
//                     <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                       Skills
//                     </h2>
//                     <div className="flex flex-wrap gap-2">
//                       {userProfile.skills.map((skill, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-200 px-2 py-1 rounded-md"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div> */}
//                 </CardBody>
//                 <CardFooter className="pt-0">
//                   <Button
//                     className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     onClick={() => handleConnect(post._id, userIdFromCookie)} // Assuming you have access to studentId>
//                   >
//                     Connect
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </main>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }
