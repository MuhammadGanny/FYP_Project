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
  const [activeTab, setActiveTab] = useState("dashboard");
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

  const openDialog = (applicant) => {
    console.log("Selected Applicant:", applicant);
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
    <div className="bg-[#DEE4EA] ">
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
                  {/* <div className="grid grid-cols-1 gap-4">
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
                  </div> */}
                  <div className="grid grid-cols-1 gap-4">
                    {applicantsData.map((applicant) => (
                      <Card
                        key={applicant.id}
                        className={`p-4 ${
                          selectedApplicantsIds.includes(applicant.id)
                            ? "border-2 border-green-500"
                            : ""
                        }`} // Highlight if selected
                      >
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
                            {selectedApplicantsIds.includes(applicant.id) && (
                              <span className="text-green-600 font-semibold mt-2 block">
                                Selected for Project
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => openDialog(applicant)}
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

      <dialog
        open={!!selectedApplicant}
        onClickBackdrop={closeDialog}
        className="rounded-lg shadow-lg bg-white p-6"
      >
        <DialogBody className="flex justify-center items-center">
          <div className="max-h-[80vh] overflow-y-auto w-[800px] bg-white rounded-lg">
            <div className="h-full p-6">
              <div className="flex items-center">
                <div className="rounded-full overflow-hidden shadow-md">
                  <img
                    className="h-40 w-40 object-cover rounded-full"
                    src={
                      selectedApplicant?.userData?.profilePicture
                        ? `/${selectedApplicant.userData.profilePicture.replace(
                            /^public\\/,
                            ""
                          )}`
                        : "/logo.jpeg"
                    }
                    alt="Profile Picture"
                  />
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedApplicant?.userData.name ||
                      selectedApplicant?.userData.companyName}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {selectedApplicant?.userData.university || "Company"}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  About Me
                </h2>
                <p className="text-gray-700 mt-2">
                  {selectedApplicant?.userData.bio ||
                    selectedApplicant?.userData.description}
                </p>
              </div>
              {selectedApplicant?.userData.projects ||
              selectedApplicant?.userData.products ? (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedApplicant?.userData.projects
                      ? "Projects"
                      : "Products"}
                  </h2>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {(
                      selectedApplicant?.userData.projects ||
                      selectedApplicant?.userData.products
                    )?.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selectedApplicant?.userData.skills && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedApplicant?.userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-200 text-gray-800 px-3 py-1 rounded-md"
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
          <Button
            color="blue"
            onClick={closeDialog}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Close
          </Button>
        </DialogFooter>
      </dialog>
      <dialog
        open={isDialogOpen}
        onClickBackdrop={closeSelectionDialog}
        className="rounded-lg shadow-lg bg-white p-6"
      >
        <DialogHeader className="text-xl font-bold text-gray-900">
          Select Applicants
        </DialogHeader>
        <DialogBody className="mt-4">
          <ul>
            {applicantsData.map((applicant) => (
              <li key={applicant.id} className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={applicant.id}
                    checked={selectedApplicantsIds.includes(applicant.id)}
                    onChange={() => handleApplicantSelection(applicant.id)}
                    disabled={
                      selectedApplicantsIds.length >= 2 &&
                      !selectedApplicantsIds.includes(applicant.id)
                    }
                    className="form-checkbox text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    {applicant.userData.name} ({applicant.email})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </DialogBody>
        <DialogFooter>
          <Button
            color="blue"
            onClick={submitSelectedApplicants}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Confirm Selection
          </Button>
          <Button
            color="red"
            onClick={closeSelectionDialog}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancel
          </Button>
        </DialogFooter>
      </dialog>

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
