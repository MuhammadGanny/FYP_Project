// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/header";
// import Cookies from "js-cookie";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// export default function Posting() {
//   const [projectHeading, setProjectHeading] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [skills, setSkills] = useState("");
//   const [userId, setUserId] = useState("");

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const userIdFromCookie = Cookies.get("userId");
//     if (userIdFromCookie) {
//       setUserId(userIdFromCookie);
//     }
//     // setUserId(userIdFromCookie);
//     console.log("User ID: in post maing ", userIdFromCookie);
//   }, []);

//   const handleSubmit = async () => {
//     if (!projectHeading || !projectDescription || !skills) {
//       setErrorMessage("Please fill in all fields.");
//       setSuccessMessage("");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/posts", {
//         projectHeading,
//         projectDescription,
//         skills,
//         author: userId,
//       });

//       if (response.status === 201) {
//         setSuccessMessage("Post created successfully");
//         setErrorMessage("");
//         setProjectHeading("");
//         setProjectDescription("");
//         setSkills("");
//       } else {
//         setErrorMessage("Failed to save the post: " + response.data.error);
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       setErrorMessage("Error creating post: " + error.message);
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="bg-[#DEE4EA] ">
//       <Header />
//       <div className=" p-12">
//         <Card className="w-[60%] ml-[20%]">
//           <CardBody className="flex flex-col gap-4">
//             <Typography
//               variant="h3"
//               className="mb-4 grid h-28 place-items-center"
//             >
//               Post Ideas
//             </Typography>
//             <label className="block text-sm font-bold leading-6 text-gray-900">
//               PROJECT HEADING
//             </label>
//             <input
//               value={projectHeading}
//               onChange={(e) => setProjectHeading(e.target.value)}
//               className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//             <label className="block text-sm  font-bold leading-6 text-gray-900">
//               PROJECT DISCRIPTION
//             </label>

//             <textarea
//               value={projectDescription}
//               onChange={(e) => setProjectDescription(e.target.value)}
//               className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//             <label className="block text-sm  font-bold leading-6 text-gray-900">
//               SKILLS
//             </label>

//             <textarea
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />

//             {successMessage && (
//               <div className="text-green-500 text-center">{successMessage}</div>
//             )}
//             {errorMessage && (
//               <div className="text-red-500 text-center">{errorMessage}</div>
//             )}
//           </CardBody>
//           <CardFooter className="pt-0">
//             <Button
//               fullWidth
//               onClick={handleSubmit}
//               className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               POST
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Cookies from "js-cookie";

export default function Posting() {
  const [projectHeading, setProjectHeading] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [userIdFromCookie, setUserIdFromCookie] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userId = Cookies.get("userId");
    //if (userId) {
    setUserIdFromCookie(userId);
    // }
    console.log("User ID: in post maing ", userIdFromCookie);
  }, []);

  // const handleSubmit = async () => {
  //   if (
  //     !projectHeading ||
  //     !projectDescription ||
  //     !skills ||
  //     !userIdFromCookie
  //   ) {
  //     setErrorMessage("Please fill in all fields.");
  //     setSuccessMessage("");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:5000/posts", {
  //       projectHeading,
  //       projectDescription,
  //       skills: skillsArray,
  //       author: userIdFromCookie,
  //     });

  //     if (response.status === 201) {
  //       setSuccessMessage("Post created successfully");
  //       setErrorMessage("");
  //       setProjectHeading("");
  //       setProjectDescription("");
  //       setSkills("");
  //     } else {
  //       setErrorMessage("Failed to save the post: " + response.data.error);
  //       setSuccessMessage("");
  //     }
  //   } catch (error) {
  //     setErrorMessage("Error creating post: " + error.message);
  //     setSuccessMessage("");
  //   }
  // };
  const handleSubmit = async () => {
    if (
      !projectHeading ||
      !projectDescription ||
      !skills ||
      !userIdFromCookie
    ) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/posts", {
        projectHeading,
        projectDescription,
        skills: skills.split("\n").map((skill) => skill.trim()),
        author: userIdFromCookie,
      });

      if (response.status === 201) {
        setSuccessMessage("Post created successfully");
        setErrorMessage("");
        setProjectHeading("");
        setProjectDescription("");
        setSkills("");
      } else {
        setErrorMessage("Failed to save the post: " + response.data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error creating post: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-[#DEE4EA] ">
      <Header />
      <div className=" p-12">
        <Card className="w-[60%] ml-[20%]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h3"
              className="mb-4 grid h-28 place-items-center"
            >
              Post Ideas
            </Typography>
            <label className="block text-sm font-bold leading-6 text-gray-900">
              PROJECT HEADING
            </label>
            <input
              value={projectHeading}
              onChange={(e) => setProjectHeading(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label className="block text-sm  font-bold leading-6 text-gray-900">
              PROJECT DESCRIPTION
            </label>

            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label className="block text-sm  font-bold leading-6 text-gray-900">
              SKILLS (one per line):
            </label>

            {/* <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            /> */}
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onBlur={(e) => {
                const skillsArray = e.target.value
                  .split("\n")
                  .map((skill) => skill.trim());
                setSkills(skillsArray.join("\n"));
              }}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {successMessage && (
              <div className="text-green-500 text-center">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              onClick={handleSubmit}
              className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              POST
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
