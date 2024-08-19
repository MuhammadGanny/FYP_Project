import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { Card, Button } from "@material-tailwind/react";
import { Copy } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export default function Project() {
  const [applicantsData, setApplicantsData] = useState([]);
  const [activeTab, setActiveTab] = useState("html");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplicantsIds, setSelectedApplicantsIds] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [projectStarted, setProjectStarted] = useState(false); // New state for project status

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
              id: applicant,
              userData: userProfile,
              email: email,
            };
          })
        );

        setApplicantsData(applicantsWithUserData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    const fetchMilestones = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/milestone/${postId}`
        );
        setMilestones(response.data);
        setProjectStarted(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchApplicants();
    fetchMilestones();
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

  // const submitSelectedApplicants = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/posts/select-applicants", {
  //       postId,
  //       applicantIds: selectedApplicantsIds,
  //     });

  //     if (selectedApplicantsIds.length === 2)
  //       toast.success("Applicants selected successfully!");
  //     else toast.error("Minimum 2 applicants");

  //     closeSelectionDialog();
  //   } catch (error) {
  //     console.error("Error submitting selected applicants:", error);
  //     toast.error("Failed to select applicants.");
  //   }
  // };

  const submitSelectedApplicants = async () => {
    try {
      const userId = Cookies.get("userId"); // Retrieve the userId from cookies

      await axios.post("http://localhost:5000/posts/select-applicants", {
        postId,
        applicantIds: selectedApplicantsIds,
        userId, // Include the userId in the request body
      });

      if (selectedApplicantsIds.length === 2) {
        toast.success("Applicants selected successfully!");
      } else {
        toast.error("Minimum 2 applicants required");
      }

      closeSelectionDialog();
    } catch (error) {
      console.error("Error submitting selected applicants:", error);
      toast.error("Failed to select applicants.");
    }
  };
  // const submitSelectedApplicants = async () => {
  //   try {
  //     const token = Cookies.get("token");
  //     const userId = Cookies.get("userId"); // If required

  //     await axios.post(
  //       "http://localhost:5000/posts/select-applicants",
  //       {
  //         postId,
  //         applicantIds: selectedApplicantsIds,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include the token in the headers
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (selectedApplicantsIds.length === 2) {
  //       toast.success("Applicants selected successfully!");
  //     } else {
  //       toast.error("Minimum 2 applicants required");
  //     }

  //     closeSelectionDialog();
  //   } catch (error) {
  //     console.error("Error submitting selected applicants:", error);
  //     toast.error("Failed to select applicants.");
  //   }
  // };

  const openDialog = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeDialog = () => {
    setSelectedApplicant(null);
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    toast.info("Email copied to clipboard!");
  };

  return (
    <div className="bg-[#DEE4EA]">
      <Header />
      <ToastContainer />
      <div className="p-10">
        <Card className="">
          <Tabs value={activeTab} className="m-5">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {}
              <Tab
                value="Applicants"
                onClick={() => setActiveTab("Applicants")}
                className={activeTab === "Applicants" ? "text-gray-900" : ""}
              >
                Applicants
              </Tab>
              <Tab
                value="dashboard"
                onClick={() => setActiveTab("dashboard")}
                className={activeTab === "dashboard" ? "text-gray-900" : ""}
              >
                Dashboard
              </Tab>
            </TabsHeader>

            <TabsBody>
              <TabPanel value="Applicants">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Applicants</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {applicantsData.map((applicant) => (
                      <Card key={applicant.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-lg">
                              {applicant.userData.name}
                            </h3>
                            <div className="flex items-center">
                              <span className="mr-2">{applicant.email}</span>
                              <button
                                onClick={() => copyToClipboard(applicant.email)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Copy className="text-black hover:text-gray-500" />
                              </button>
                            </div>
                          </div>
                          <Button
                            onClick={() => openDialog(applicant)}
                            className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            View Profile
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="dashboard">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                  {!projectStarted ? (
                    <Button
                      className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={openSelectionDialog}
                    >
                      Start Project
                    </Button>
                  ) : (
                    <div>
                      <Link to={`/milestone/${postId}`}>
                        <Button className="w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-4">
                          Go to Milestones
                        </Button>
                      </Link>
                      <h2 className="text-lg font-semibold mb-4">Milestones</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {milestones.map((milestone, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-bold text-lg">
                                {milestone.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Status: {milestone.status}
                              </p>
                            </div>
                            <p>{milestone.description}</p>
                            <p>
                              Start Date:{" "}
                              {new Date(
                                milestone.startDate
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              End Date:{" "}
                              {new Date(milestone.endDate).toLocaleDateString()}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
      </div>

      <Dialog open={!!selectedApplicant} onClickBackdrop={closeDialog}>
        <DialogBody className="flex justify-center items-center">
          <div className="max-h-[80vh] overflow-y-auto w-[1000px]">
            <div className="h-full overflow-auto p-6">
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden">
                  <img
                    className="h-40 w-40 object-cover"
                    src={selectedApplicant?.userData.profilePicture}
                    // alt="Profile Picture"
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
                  <span className="ml-2">
                    {applicant.userData.name} ({applicant.email})
                  </span>
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
