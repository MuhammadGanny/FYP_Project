// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import Header from "../components/header";
// import { Link } from "react-router-dom";
// import { Card, Button } from "@material-tailwind/react";

// export default function Project() {
//   const [applicantsData, setApplicantsData] = useState([]);
//   const [activeTab, setActiveTab] = useState("html");
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedApplicantsIds, setSelectedApplicantsIds] = useState([]);

//   const { id: postId } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/posts/${postId}/applicants`
//         );
//         const applicantsWithoutNull = response.data.applicants.filter(
//           (applicant) => applicant !== null
//         );

//         const applicantsWithUserData = await Promise.all(
//           applicantsWithoutNull.map(async (applicant) => {
//             const userDataResponse = await axios.get(
//               `http://localhost:5000/profile/profile?userId=${applicant}&userType=student`
//             );
//             const { userProfile, email } = userDataResponse.data;
//             return {
//               id: applicant,
//               userData: userProfile,
//               email: email,
//             };
//           })
//         );

//         setApplicantsData(applicantsWithUserData);
//       } catch (error) {
//         console.error("Error fetching applicants:", error);
//       }
//     };

//     fetchApplicants();
//   }, [postId]);

//   const openDialog = (applicant) => {
//     setSelectedApplicant(applicant);
//   };

//   const closeDialog = () => {
//     setSelectedApplicant(null);
//   };

//   const openSelectionDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeSelectionDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleApplicantSelection = (applicantId) => {
//     const selectedIndex = selectedApplicantsIds.indexOf(applicantId);

//     if (selectedIndex === -1 && selectedApplicantsIds.length < 2) {
//       setSelectedApplicantsIds([...selectedApplicantsIds, applicantId]);
//     } else if (selectedIndex !== -1) {
//       setSelectedApplicantsIds(
//         selectedApplicantsIds.filter((id) => id !== applicantId)
//       );
//     }
//   };

//   const submitSelectedApplicants = async () => {
//     try {
//       await axios.post("http://localhost:5000/posts/select-applicants", {
//         postId,
//         applicantIds: selectedApplicantsIds,
//       });
//       closeSelectionDialog();
//       history.push(`/milestone/${postId}`);
//     } catch (error) {
//       console.error("Error submitting selected applicants:", error);
//     }
//   };

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
//                 value="projectdetails"
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
//                 value="dashboard"
//                 onClick={() => setActiveTab("vue")}
//                 className={activeTab === "vue" ? "text-gray-900" : ""}
//               >
//                 Dashboard
//               </Tab>
//             </TabsHeader>

//             <TabsBody>
//               <TabPanel value="Applicants">
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-4">Applicants</h2>
//                   <ul>
//                     {applicantsData.map((applicant) => (
//                       <li key={applicant.id}>
//                         <button onClick={() => openDialog(applicant)}>
//                           {applicant.userData.name} {applicant.email}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </TabPanel>

//               <TabPanel value="projectdetails">
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Project Details
//                   </h2>
//                   <Button
//                     className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     onClick={openSelectionDialog}
//                   >
//                     Start Project
//                   </Button>
//                 </div>
//               </TabPanel>
//             </TabsBody>
//           </Tabs>
//         </Card>
//       </div>
//       <Dialog open={!!selectedApplicant} onClickBackdrop={closeDialog}>
//         <DialogBody className="flex justify-center items-center">
//           <div className="max-h-[80vh] overflow-y-auto w-[1000px] ">
//             <div className=" h-full overflow-auto p-6">
//               <div className="flex items-center">
//                 <div className="rounded-full overflow-hidden">
//                   <img
//                     className="h-40 w-40 object-cover"
//                     src={selectedApplicant?.userData.profilePicture}
//                     alt="Profile Picture"
//                   />
//                 </div>
//                 <div className="ml-4">
//                   <h1 className="text-xl font-bold text-gray-800">
//                     {selectedApplicant?.userData.name ||
//                       selectedApplicant?.userData.companyName}
//                   </h1>
//                   <p className="text-gray-500">
//                     {selectedApplicant?.userData.university || "Company"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-200">
//               <div className="p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                   About Me
//                 </h2>
//                 <p className="text-gray-600">
//                   {selectedApplicant?.userData.bio ||
//                     selectedApplicant?.userData.description}
//                 </p>
//               </div>

//               {(selectedApplicant?.userData.projects ||
//                 selectedApplicant?.userData.products) && (
//                 <div className="p-6">
//                   <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                     {selectedApplicant?.userData.projects
//                       ? "Projects"
//                       : "Products"}
//                   </h2>
//                   <ul>
//                     {Array.isArray(
//                       selectedApplicant?.userData.projects ||
//                         selectedApplicant?.userData.products
//                     ) ? (
//                       (
//                         selectedApplicant?.userData.projects ||
//                         selectedApplicant?.userData.products
//                       ).map((detail, index) => <li key={index}>{detail}</li>)
//                     ) : (
//                       <li>No data available</li>
//                     )}
//                   </ul>
//                 </div>
//               )}

//               {selectedApplicant?.userData.skills && (
//                 <div className="p-6">
//                   <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                     Skills
//                   </h2>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedApplicant?.userData.skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-200 px-2 py-1 rounded-md"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {(selectedApplicant?.userData.experiences ||
//                 selectedApplicant?.userData.services) && (
//                 <div className="p-6">
//                   <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                     {selectedApplicant?.userData.experiences
//                       ? "Experiences"
//                       : "Services"}
//                   </h2>
//                   <ul>
//                     {Array.isArray(
//                       selectedApplicant?.userData.experiences ||
//                         selectedApplicant?.userData.services
//                     ) ? (
//                       (
//                         selectedApplicant?.userData.experiences ||
//                         selectedApplicant?.userData.services
//                       ).map((detail, index) => <li key={index}>{detail}</li>)
//                     ) : (
//                       <li>No data available</li>
//                     )}
//                   </ul>
//                 </div>
//               )}

//               {selectedApplicant?.userData.education && (
//                 <div className="p-6">
//                   <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                     Education
//                   </h2>
//                   <ul>
//                     {Array.isArray(selectedApplicant?.userData.education) ? (
//                       selectedApplicant?.userData.education.map(
//                         (educationDetail, index) => (
//                           <li key={index}>{educationDetail}</li>
//                         )
//                       )
//                     ) : (
//                       <li>No education data available</li>
//                     )}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </DialogBody>
//         <DialogFooter>
//           <Button color="blue" onClick={closeDialog}>
//             Close
//           </Button>
//         </DialogFooter>
//       </Dialog>

//       <Dialog open={isDialogOpen} onClickBackdrop={closeSelectionDialog}>
//         <DialogHeader>Select Applicants</DialogHeader>
//         <DialogBody>
//           <ul>
//             {applicantsData.map((applicant) => (
//               <li key={applicant.id}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={applicant.id}
//                     checked={selectedApplicantsIds.includes(applicant.id)}
//                     onChange={() => handleApplicantSelection(applicant.id)}
//                     disabled={
//                       selectedApplicantsIds.length >= 2 &&
//                       !selectedApplicantsIds.includes(applicant.id)
//                     }
//                   />
//                   {applicant.userData.name} ({applicant.email})
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </DialogBody>
//         <DialogFooter>
//           <Button color="blue" onClick={submitSelectedApplicants}>
//             Confirm Selection
//           </Button>
//           <Button color="red" onClick={closeSelectionDialog}>
//             Cancel
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

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
import Header from "../components/header.jsx";
import { Link } from "react-router-dom";
import { Card, Button } from "@material-tailwind/react";

export default function Project() {
  const [applicantsData, setApplicantsData] = useState([]);
  const [activeTab, setActiveTab] = useState("html");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplicantsIds, setSelectedApplicantsIds] = useState([]);

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

            const { userProfile, email } = userDataResponse.data; // Extract email from the API response
            return {
              // id: applicant,
              // userData: userDataResponse.data.userProfile,
              // // email: email,
              id: applicant,
              userData: userProfile,
              email: email, // Include email in the object
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

  const openSelectionDialog = () => {
    setIsDialogOpen(true);
  };

  const closeSelectionDialog = () => {
    setIsDialogOpen(false);
  };

  const handleApplicantSelection = (applicantId) => {
    const selectedIndex = selectedApplicantsIds.indexOf(applicantId);

    if (selectedIndex === -1 && selectedApplicantsIds.length < 2) {
      setSelectedApplicantsIds([...selectedApplicantsIds, applicantId]);
    } else if (selectedIndex !== -1) {
      setSelectedApplicantsIds(
        selectedApplicantsIds.filter((id) => id !== applicantId)
      );
    }
  };
  const submitSelectedApplicants = async () => {
    try {
      await axios.post("http://localhost:5000/posts/select-applicants", {
        postId,
        applicantIds: selectedApplicantsIds,
      });
      closeSelectionDialog();
    } catch (error) {
      console.error("Error submitting selected applicants:", error);
    }
  };

  const openDialog = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeDialog = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="bg-[#DEE4EA] ">
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
                value="projectdetails"
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
                value="dashboard"
                onClick={() => setActiveTab("vue")}
                className={activeTab === "vue" ? "text-gray-900" : ""}
              >
                Dashboard
              </Tab>
            </TabsHeader>

            <TabsBody>
              <TabPanel value="Applicants">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Applicants</h2>
                  <ul>
                    {applicantsData.map((applicant) => (
                      <li key={applicant.id}>
                        <button onClick={() => openDialog(applicant)}>
                          {applicant.userData.name} {applicant.email}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>

              <TabPanel value="projectdetails">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Project Details
                  </h2>
                  {/* Project details content */}
                  <Button
                    className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={openSelectionDialog}
                  >
                    Start Project
                  </Button>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
      </div>
      {/* Dialog for displaying additional information */}
      <Dialog open={!!selectedApplicant} onClickBackdrop={closeDialog}>
        <DialogBody className="flex justify-center items-center">
          <div className="max-h-[80vh] overflow-y-auto w-[1000px] ">
            <div className=" h-full overflow-auto p-6">
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden">
                  <img
                    className="h-40 w-40 object-cover"
                    src={selectedApplicant?.userData.profilePicture}
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
                    {selectedApplicant?.userData.projects
                      ? "Projects"
                      : "Products"}
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
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={closeDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Dialog for selecting applicants */}
      <Dialog open={isDialogOpen} onClickBackdrop={closeSelectionDialog}>
        <DialogHeader>Select Applicants</DialogHeader>
        <DialogBody>
          <ul>
            {applicantsData.map((applicant) => (
              <li key={applicant.id}>
                <label>
                  <input
                    type="checkbox"
                    value={applicant.id}
                    checked={selectedApplicantsIds.includes(applicant.id)}
                    onChange={() => handleApplicantSelection(applicant.id)}
                    disabled={
                      selectedApplicantsIds.length >= 2 &&
                      !selectedApplicantsIds.includes(applicant.id)
                    }
                  />
                  {applicant.userData.name} ({applicant.email})
                </label>
              </li>
            ))}
          </ul>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={submitSelectedApplicants}>
            Confirm Selection
          </Button>
          <Button color="red" onClick={closeSelectionDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
      {/* Link to the milestone page after selecting applicants */}
      {selectedApplicantsIds.length === 2 && (
        <div className="flex justify-center p-4">
          <Link to={`/milestone/${postId}`}>
            <Button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
              Go to Milestones
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
