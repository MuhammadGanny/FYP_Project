import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Header from "../components/header";
import { Card, Button } from "@material-tailwind/react";

export default function Project() {
  const [applicantsData, setApplicantsData] = useState([]);
  const [activeTab, setActiveTab] = useState("html");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const { id: postId } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}/applicants`
        );
        const applicantsWithoutNull = response.data.applicants.filter(
          (applicant) => applicant !== null
        );

        const applicantsWithUserData = await Promise.all(
          applicantsWithoutNull.map(async (applicant) => {
            const userDataResponse = await axios.get(
              `http://localhost:5000/profile/profile?userId=${applicant}&userType=student`
            );
            return {
              id: applicant,
              userData: userDataResponse.data.userProfile,
            };
          })
        );
        setApplicantsData(applicantsWithUserData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [postId]);

  const openDialog = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeDialog = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="bg-[#DEE4EA]">
      <Header />
      <div className="p-10">
        <Card className="">
          <Tabs value={activeTab} className="m-5">
            {/* TabsHeader and other tabs omitted for brevity */}
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              <Tab
                value="html"
                onClick={() => setActiveTab("html")}
                className={activeTab === "html" ? "text-gray-900" : ""}
              >
                Project Details
              </Tab>
              <Tab
                value="Applicants"
                onClick={() => setActiveTab("Applicants")}
                className={activeTab === "Applicants" ? "text-gray-900" : ""}
              >
                Applicants
              </Tab>
              <Tab
                value="vue"
                onClick={() => setActiveTab("vue")}
                className={activeTab === "vue" ? "text-gray-900" : ""}
              >
                Dashboard
              </Tab>
            </TabsHeader>

            <TabsBody>
              {/* TabPanel for Applicants */}
              <TabPanel value="Applicants">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Applicants</h2>
                  <ul>
                    {applicantsData.map((applicant) => (
                      <li key={applicant.id}>
                        <button onClick={() => openDialog(applicant)}>
                          {applicant.userData.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
              {/* Other TabPanels omitted for brevity */}
            </TabsBody>
          </Tabs>
        </Card>
      </div>
      {/* Dialog for displaying additional information */}
      <Dialog open={!!selectedApplicant} onClickBackdrop={closeDialog}>
        {/* <DialogHeader>
          <h5 className="text-xl font-semibold">
            {selectedApplicant?.userData.name}
          </h5>
        </DialogHeader>
        <DialogBody>
         
          <p>Bio: {selectedApplicant?.userData.bio}</p>
          <p>Education: {selectedApplicant?.userData.education}</p>
         
        </DialogBody> */}
        {/* <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden"> */}
        <div className="p-6">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden">
              <img
                className="h-40 w-40 object-cover"
                //src={LOGO} // Change this to userProfile.profilePicture when available
                //src={userProfile.profilePicture}
                alt="Profile Picture"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">
                {selectedApplicant?.userData.name ||
                  selectedApplicant?.userData.companyName}
              </h1>
              <p className="text-gray-500">
                {selectedApplicant?.userData.university || "Company"}
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
              {selectedApplicant?.userData.bio ||
                selectedApplicant?.userData.description}
            </p>
          </div>

          {(selectedApplicant?.userData.projects ||
            selectedApplicant?.userData.products) && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedApplicant?.userData.projects ? "Projects" : "Products"}
              </h2>
              <ul>
                {Array.isArray(
                  selectedApplicant?.userData.projects ||
                    selectedApplicant?.userData.products
                ) ? (
                  (
                    selectedApplicant?.userData.projects ||
                    selectedApplicant?.userData.products
                  ).map((detail, index) => <li key={index}>{detail}</li>)
                ) : (
                  <li>No data available</li>
                )}
              </ul>
            </div>
          )}

          {selectedApplicant?.userData.skills && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant?.userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 px-2 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(selectedApplicant?.userData.experiences ||
            selectedApplicant?.userData.services) && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedApplicant?.userData.experiences
                  ? "Experiences"
                  : "Services"}
              </h2>
              <ul>
                {Array.isArray(
                  selectedApplicant?.userData.experiences ||
                    selectedApplicant?.userData.services
                ) ? (
                  (
                    selectedApplicant?.userData.experiences ||
                    selectedApplicant?.userData.services
                  ).map((detail, index) => <li key={index}>{detail}</li>)
                ) : (
                  <li>No data available</li>
                )}
              </ul>
            </div>
          )}

          {selectedApplicant?.userData.education && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Education
              </h2>
              <ul>
                {Array.isArray(selectedApplicant?.userData.education) ? (
                  selectedApplicant?.userData.education.map(
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
        {/* // </div> */}
        <DialogFooter>
          <Button color="blue" onClick={closeDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import Header from "../components/header";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// export default function Project() {
//   const [applicants, setApplicants] = useState([]);
//   const [postId, setPostId] = useState("65dba2d3b708254c13daea1c");

//   useEffect(() => {
//     // Fetch applicants when the component mounts
//     const fetchApplicants = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/posts/${postId}/applicants`
//         );
//         setApplicants(response.data.applicants);
//       } catch (error) {
//         console.error("Error fetching applicants:", error);
//       }
//     };

//     fetchApplicants();
//   }, []);

//   const [activeTab, setActiveTab] = React.useState("html");

//   const data = [
//     {
//       label: "Project Details",
//       value: "html",
//       desc: `It really matters and then like it really doesn't matter.
//       What matters is the people who are sparked by it. And the people
//       who are like offended by it, it doesn't matter.`,
//     },
//     {
//       label: "Applicants",
//       value: "Applicants",
//       desc: (
//         <div>
//           {/* {applicants &&
//             applicants.map((applicant) => (
//               <div key={applicant._id}>
//                 console.log(applicant._id)
//                 <p>Name: {applicant.name}</p>
//                 Include other applicant details as needed
//               </div>
//             ))} */}
//         </div>
//       ),
//     },
//     {
//       label: "Dashboard",
//       value: "vue",
//       desc: `We're not always in the position that we want to be at.
//       We're constantly growing. We're constantly making mistakes. We're
//       constantly trying to express ourselves and actualize our dreams.`,
//     },
//   ];
//   return (
//     // <div className="bg-[#DEE4EA] ">
//     //   <Header />
//     //   <div className="p-10">
//     //     <Card className="">
//     //       <CardBody>
//     //         <Typography variant="h5" color="blue-gray" className="mb-2">
//     //           Applicants
//     //         </Typography>
//     //         {applicants.map((applicant) => (
//     //           <div key={applicant._id}>
//     //             {/* Render applicant details here */}
//     //             <Typography>{applicant.name}</Typography>
//     //             {/* Include other applicant details as needed */}
//     //           </div>
//     //         ))}
//     //       </CardBody>
//     //     </Card>
//     //   </div>
//     // </div>

//     <div className="bg-[#DEE4EA] ">
//       <Header />
//       <div className=" p-10">
//         <Card className="">
//           <Tabs value={activeTab} className="m-5">
//             <TabsHeader
//               className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
//               indicatorProps={{
//                 className:
//                   "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
//               }}
//             >
//               {data.map(({ label, value }) => (
//                 <Tab
//                   key={value}
//                   value={value}
//                   onClick={() => setActiveTab(value)}
//                   className={activeTab === value ? "text-gray-900" : ""}
//                 >
//                   {label}
//                 </Tab>
//               ))}
//             </TabsHeader>
//             <TabsBody>
//               {data.map(({ value, desc }) => (
//                 <TabPanel key={value} value={value}>
//                   {desc}
//                 </TabPanel>
//               ))}
//             </TabsBody>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import Header from "../components/header";
// import { Card } from "@material-tailwind/react";

// export default function Project() {
//   const [applicants, setApplicants] = useState([]);
//   const [postId, setPostId] = useState("65dba2d3b708254c13daea1c");
//   const [activeTab, setActiveTab] = useState("html");

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/posts/${postId}/applicants`
//         );
//         console.log("applicantsss", response.data.applicants);
//         setApplicants(response.data.applicants);
//         console.log("applicants ", applicants);

//         // Fetch user data for each applicant
//         const applicantsWithUserData = await Promise.all(
//           response.data.applicants.map(async (applicant) => {
//             const userDataResponse = await axios.get(
//               `http://localhost:5000/profile/profile?userId=${applicant}&userType=student`
//             );
//             return {
//               ...applicant,
//               userData: userDataResponse.data.userProfile,
//             };
//           })
//         );
//         setApplicants(applicantsWithUserData);
//       } catch (error) {
//         console.error("Error fetching applicants:", error);
//       }
//     };

//     fetchApplicants();
//   }, [postId]);

//   return (
//     <div className="bg-[#DEE4EA]">
//       <Header />
//       <div className="p-10">
//         <Card className="">
//           <Tabs value={activeTab} className="m-5">
//             <TabsHeader
//               className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
//               indicatorProps={{
//                 className:
//                   "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
//               }}
//             >
//               <Tab
//                 value="html"
//                 onClick={() => setActiveTab("html")}
//                 className={activeTab === "html" ? "text-gray-900" : ""}
//               >
//                 Project Details
//               </Tab>
//               <Tab
//                 value="Applicants"
//                 onClick={() => setActiveTab("Applicants")}
//                 className={activeTab === "Applicants" ? "text-gray-900" : ""}
//               >
//                 Applicants
//               </Tab>
//               <Tab
//                 value="vue"
//                 onClick={() => setActiveTab("vue")}
//                 className={activeTab === "vue" ? "text-gray-900" : ""}
//               >
//                 Dashboard
//               </Tab>
//             </TabsHeader>
//             <TabsBody>
//               <TabPanel value="html">
//                 <div>Project Details Tab Content</div>
//               </TabPanel>
//               <TabPanel value="Applicants">
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-4">Applicants</h2>
//                   <ul>
//                     {applicants.map((applicant) => (
//                       <li key={applicant._id}>{applicant.userData.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </TabPanel>
//               <TabPanel value="vue">
//                 <div>Dashboard Tab Content</div>
//               </TabPanel>
//             </TabsBody>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// }
//las updatedd

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Header from "../components/header";
import { Card } from "@material-tailwind/react";
import { Key } from "lucide-react";

// export default function Project() {
//   const [applicantsData, setApplicantsData] = useState([]);
//   //const [postId, setPostId] = useState("65e60d9b74a4cfd12a596ea3");
//   //"65dba2d3b708254c13daea1c";
//   const [activeTab, setActiveTab] = useState("html");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}/applicants`
        );
        console.log("applicantsss", response.data.applicants);
        setApplicants(response.data.applicants);
        // console.log("applicants ", applicants);
        // Fetch user data for each applicant
        const applicantsWithUserData = await Promise.all(
          applicantsWithoutNull.map(async (applicant) => {
            const userDataResponse = await axios.get(
              `http://localhost:5000/profile/profile?userId=${applicant}&userType=student`
            );

            return {
              //...applicant,
              id: applicant,
              userData: userDataResponse.data.userProfile,
            };
          })
        );
        setApplicants(applicantsWithUserData);
        
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

//     fetchApplicants();
//   }, [postId]);

//   return (
//     <div className="bg-[#DEE4EA]">
//       <Header />
//       <div className="p-10">
//         <Card className="">
//           <Tabs value={activeTab} className="m-5">
//             <TabsHeader
//               className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
//               indicatorProps={{
//                 className:
//                   "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
//               }}
//             >
//               <Tab
//                 value="html"
//                 onClick={() => setActiveTab("html")}
//                 className={activeTab === "html" ? "text-gray-900" : ""}
//               >
//                 Project Details
//               </Tab>
//               <Tab
//                 value="Applicants"
//                 onClick={() => setActiveTab("Applicants")}
//                 className={activeTab === "Applicants" ? "text-gray-900" : ""}
//               >
//                 Applicants
//               </Tab>
//               <Tab
//                 value="vue"
//                 onClick={() => setActiveTab("vue")}
//                 className={activeTab === "vue" ? "text-gray-900" : ""}
//               >
//                 Dashboard
//               </Tab>
//             </TabsHeader>
//             <TabsBody>
//               <TabPanel value="html">
//                 <div>Project Details Tab Content</div>
//               </TabPanel>
//               <TabPanel value="Applicants">
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-4">Applicants</h2>
//                   <ul>
//                     {applicantsData.map((applicant) => (
//                       <li key={applicant.id}>{applicant.userData.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </TabPanel>
//               <TabPanel value="vue">
//                 <div>Dashboard Tab Content</div>
//               </TabPanel>
//             </TabsBody>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// }
