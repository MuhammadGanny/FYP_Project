import { useState, useEffect } from "react";
import axios from "axios";
import HeaderStudent from "../components/headerStudent";
import Sidebar from "../components/sidebar";
// import Header from "../components/headerStudent";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homestudent() {
  const [projectPosts, setProjectPosts] = useState([]);
  const [userIdFromCookie, setUserIdFromCookie] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
  const [selectedAuthor, setSelectedAuthor] = useState(null); // State for selected author
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then(async (response) => {
        const reversedPosts = response.data.posts.reverse();

        // Filter out posts that are in progress or completed
        const filteredPosts = reversedPosts.filter(
          (post) => post.status === null
        );

        // Fetch author's data for each post
        const postsWithAuthorData = await Promise.all(
          filteredPosts.map(async (post) => {
            try {
              // Fetch user data of the author
              const authorUserId = post.author;
              const userDataResponse = await axios.get(
                `http://localhost:5000/profile/profile?userId=${authorUserId}&userType=company`
              );
              const { userProfile, email } = userDataResponse.data;

              // Add author's data to the post object
              return {
                ...post,
                authorData: {
                  userProfile,
                  email,
                },
              };
            } catch (error) {
              console.error("Error fetching author's data:", error);
              // If fetching author's data fails, return the post without author data
              return post;
            }
          })
        );

        setProjectPosts(postsWithAuthorData);
      })
      .catch((error) => {
        console.error("Error fetching project posts:", error);
      });
  }, []);

  const openDialog = (author) => {
    setSelectedAuthor(author);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedAuthor(null);
    setIsDialogOpen(false);
  };

  const handleConnect = async (postId, studentId) => {
    if (!postId || !studentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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

  // Function to handle opening the user's profile
  const openUserProfile = (authorData) => {
    setSelectedAuthor(authorData);
    // You can perform further actions here, such as displaying a modal with the author's profile
  };

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
        {/* <Sidebar /> */}
        <ToastContainer />{" "}
        {/* Ensure ToastContainer is placed at the root level */}
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
            <Input
              type="text"
              size="md"
              placeholder="Search by skills..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="block bg-[#DEE4EA] ml-[30%] w-full max-w-md border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            {filteredPosts.map((post) => (
              <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
                {/* Display author's name and profile picture */}
                {post.authorData && (
                  <div
                    className="px-4 py-2 flex items-center justify-between cursor-pointer"
                    // onClick={() => openUserProfile(post.authorData)}
                    onClick={() => openDialog(post.authorData)}
                  >
                    <div className="flex items-center">
                      <img
                        src={post.authorData.userProfile.profilePicture}
                        alt="Author Profile"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm font-medium">
                        {post.authorData.userProfile.companyName}
                      </span>
                    </div>
                  </div>
                )}

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

            <Dialog open={isDialogOpen} onClickBackdrop={closeDialog}>
              <DialogBody className="flex justify-center items-center">
                {selectedAuthor && (
                  <div className="max-h-[80vh] overflow-y-auto w-[1000px]">
                    <div className="h-full overflow-auto p-6">
                      <div className="flex items-center">
                        <div className="rounded-full overflow-hidden">
                          <img
                            src={selectedAuthor.userProfile.profilePicture}
                            alt="Profile Picture"
                            className="h-40 w-40 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h1 className="text-xl font-bold text-gray-800">
                            {selectedAuthor.userProfile.name ||
                              selectedAuthor.userProfile.companyName}
                          </h1>
                          <p className="text-gray-500">
                            {selectedAuthor.userProfile.university || "Company"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                          About Me
                        </h2>
                        <p className="text-gray-600">
                          {selectedAuthor.userProfile.bio ||
                            selectedAuthor.userProfile.description}
                        </p>
                      </div>

                      {(selectedAuthor.userProfile.projects ||
                        selectedAuthor.userProfile.products) && (
                        <div className="p-6">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            {selectedAuthor.userProfile.projects
                              ? "Projects"
                              : "Products"}
                          </h2>
                          <ul>
                            {Array.isArray(
                              selectedAuthor.userProfile.projects ||
                                selectedAuthor.userProfile.products
                            ) ? (
                              (
                                selectedAuthor.userProfile.projects ||
                                selectedAuthor.userProfile.products
                              ).map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))
                            ) : (
                              <li>No data available</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {selectedAuthor.userProfile.skills && (
                        <div className="p-6">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Skills
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {selectedAuthor.userProfile.skills.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-200 px-2 py-1 rounded-md"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {(selectedAuthor.userProfile.experiences ||
                        selectedAuthor.userProfile.services) && (
                        <div className="p-6">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            {selectedAuthor.userProfile.experiences
                              ? "Experiences"
                              : "Services"}
                          </h2>
                          <ul>
                            {Array.isArray(
                              selectedAuthor.userProfile.experiences ||
                                selectedAuthor.userProfile.services
                            ) ? (
                              (
                                selectedAuthor.userProfile.experiences ||
                                selectedAuthor.userProfile.services
                              ).map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))
                            ) : (
                              <li>No data available</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {selectedAuthor.userProfile.education && (
                        <div className="p-6">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Education
                          </h2>
                          <ul>
                            {Array.isArray(
                              selectedAuthor.userProfile.education
                            ) ? (
                              selectedAuthor.userProfile.education.map(
                                (educationDetail, index) => (
                                  <li key={index}>{educationDetail}</li>
                                )
                              )
                            ) : (
                              <li>No education data available</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </DialogBody>
              <DialogFooter>
                <Button color="blue" onClick={closeDialog}>
                  Close
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </main>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";
// import HeaderStudent from "../components/headerStudent.jsx";
// import Cookies from "js-cookie";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
//   Input,
//   Dialog,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Home() {
//   const [projectPosts, setProjectPosts] = useState([]);
//   const [userIdFromCookie, setUserIdFromCookie] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedAuthor, setSelectedAuthor] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/posts")
//       .then(async (response) => {
//         const reversedPosts = response.data.posts.reverse();
//         const postsWithAuthorData = await Promise.all(
//           reversedPosts.map(async (post) => {
//             try {
//               const authorUserId = post.author;
//               const userDataResponse = await axios.get(
//                 `http://localhost:5000/profile/profile?userId=${authorUserId}&userType=company`
//               );
//               // const { userProfile } = userDataResponse.data;
//               const { userProfile, email } = userDataResponse.data;
//               // return { ...post, authorData: userProfile };
//               return {
//                 ...post,
//                 authorData: {
//                   userProfile,
//                   email,
//                 },
//               };
//             } catch (error) {
//               console.error("Error fetching author's data:", error);
//               return post;
//             }
//           })
//         );
//         setProjectPosts(postsWithAuthorData);
//       })
//       .catch((error) => {
//         console.error("Error fetching project posts:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const userIdFromCookie = Cookies.get("userId");
//     setUserIdFromCookie(userIdFromCookie);
//   }, []);

//   const openDialog = (author) => {
//     setSelectedAuthor(author);
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setSelectedAuthor(null);
//     setIsDialogOpen(false);
//   };

//   const handleConnect = async (postId, studentId) => {
//     try {
//       await axios.post("http://localhost:5000/posts/connect", {
//         postId,
//         studentId,
//       });
//       toast.success("Connected successfully!");
//     } catch (error) {
//       console.error("Error connecting with project:", error);
//       toast.error("Error connecting with project.");
//     }
//   };

//   const filteredPosts = projectPosts.filter((post) =>
//     post.skills.some((skill) =>
//       skill.toLowerCase().includes(searchKeyword.toLowerCase())
//     )
//   );

//   return (
//     <>
//       <div className="min-h-full">
//         <HeaderStudent />
//         <ToastContainer />
//         <header className="bg-[#DEE4EA] shadow">
//           <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               Project Listing
//             </h1>
//           </div>
//         </header>
//         <main className="bg-gray-100">
//           <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//             <Input
//               type="text"
//               size="md"
//               placeholder="Search by skills..."
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//               className="block bg-[#DEE4EA] ml-[30%] w-full max-w-md border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//             {filteredPosts.map((post) => (
//               <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
//                 {post.authorData && (
//                   <div
//                     className="px-4 py-2 flex items-center justify-between cursor-pointer"
//                     onClick={() => openDialog(post.authorData)}
//                   >
//                     <div className="flex items-center">
//                       <img
//                         src={post.authorData.profilePicture}
//                         alt="Author Profile"
//                         className="w-8 h-8 rounded-full mr-2"
//                       />
//                       <span className="text-sm font-medium">
//                         {post.authorData.companyName}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//                 <CardBody>
//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     {post.projectHeading}
//                   </Typography>
//                   <Typography>{post.projectDescription}</Typography>
//                   <Typography variant="h5" color="blue-gray" className="mb-2">
//                     Skills
//                   </Typography>
//                   <div className="flex flex-wrap gap-2">
//                     {post.skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-200 px-2 py-1 rounded-md"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </CardBody>
//                 <CardFooter className="pt-0">
//                   <Button
//                     className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     onClick={() => handleConnect(post._id, userIdFromCookie)}
//                   >
//                     Connect
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//             <Dialog open={isDialogOpen} onClickBackdrop={closeDialog}>
//               <DialogBody className="flex justify-center items-center">
//                 {selectedAuthor && (
//                   <div className="max-h-[80vh] overflow-y-auto w-[1000px]">
//                     <div className="h-full overflow-auto p-6">
//                       <div className="flex items-center">
//                         <div className="rounded-full overflow-hidden">
//                           <img
//                             src={selectedAuthor.profilePicture}
//                             alt="Profile Picture"
//                             className="h-40 w-40 object-cover"
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <h1 className="text-xl font-bold text-gray-800">
//                             {selectedAuthor.name || selectedAuthor.companyName}
//                           </h1>
//                           <p className="text-gray-500">
//                             {selectedAuthor.university || "Company"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </DialogBody>
//               <DialogFooter>
//                 <Button color="blue" onClick={closeDialog}>
//                   Close
//                 </Button>
//               </DialogFooter>
//             </Dialog>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }
