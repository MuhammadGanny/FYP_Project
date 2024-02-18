import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const navigate = useNavigate();
  const [studentProfileData, setStudentProfileData] = useState({
    name: "",
    university: "",
    bio: "",
    projects: [],
    skills: [],
    experiences: [],
    education: [],
    profilePicture: "",
  });

  const [companyProfileData, setCompanyProfileData] = useState({
    companyName: "",
    description: "",
    products: [],
    services: [],
    profilePicture: "",
  });

  const [userType, setUserType] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    const userTypeFromCookie = Cookies.get("userType");
    const tokenFromCookie = Cookies.get("token");

    if (userIdFromCookie && userTypeFromCookie && tokenFromCookie) {
      setUserId(userIdFromCookie);
      setUserType(userTypeFromCookie);
      setToken(tokenFromCookie);

      console.log("User ID:", userIdFromCookie);
      console.log("User Type:", userTypeFromCookie);
      console.log("Token:", tokenFromCookie);
    } else {
      console.log("ID type and Token Not avauilable in cookies ");
    }
  }, []);
  useEffect(() => {
    if (redirectToProfile) {
      // setTimeout(() => {
      navigate("/profile");

      //}, 3000);
    }
  }, [redirectToProfile]);

  const handleProfileSetup = async () => {
    try {
      if (userType === "student") {
        const requiredFields = [
          "name",
          "university",
          "bio",
          "projects",
          "skills",
          "experiences",
          "education",
        ];
        const missingFields = requiredFields.filter(
          (field) => !studentProfileData[field]
        );

        if (missingFields.length > 0) {
          const missingFieldsMessage = `Missing required fields: ${missingFields.join(
            ", "
          )}`;
          console.error(missingFieldsMessage);
          setErrorMessage(missingFieldsMessage);
          setSuccessMessage("");
          return;
        }
      } else if (userType === "company") {
        const requiredFields = [
          "companyName",
          "description",
          "products",
          "services",
        ];
        const missingFields = requiredFields.filter(
          (field) => !companyProfileData[field]
        );

        if (missingFields.length > 0) {
          const missingFieldsMessage = `Missing required fields: ${missingFields.join(
            ", "
          )}`;
          console.error(missingFieldsMessage);
          setErrorMessage(missingFieldsMessage);
          setSuccessMessage("");
          return;
        }
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userType", userType);

      if (userType === "student") {
        formData.append("profileData", JSON.stringify(studentProfileData));
        formData.append(
          "profilePicture",
          studentProfileData.profilePicture

          //document.getElementById("file-upload").files[0]
        );
      } else if (userType === "company") {
        formData.append("profileData", JSON.stringify(companyProfileData));
        formData.append(
          "profilePicture",
          document.getElementById("file-upload").files[0]
        );
      }

      console.log(formData);

      await axios.post(
        "http://localhost:5000/profile/setup-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Profile successfully set up!");
      setErrorMessage("");
      setRedirectToProfile(true);
    } catch (error) {
      console.error(error);
      setSuccessMessage(""); // Clear any previous success messages
      setErrorMessage("Error setting up the profile. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="w-100 mt-1 p-6 bg-white  rounded-md shadow-md">
          <h1 className="text-3xl mb-4">Profile Setup </h1>
          <div>
            {userType === "student" && (
              <div>
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={studentProfileData.name || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  University:
                  <input
                    type="text"
                    name="university"
                    value={studentProfileData.university || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        university: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Bio:
                  <input
                    value={studentProfileData.bio || ""}
                    name="bio"
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        bio: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Projects (comma-separated):
                  <textarea
                    type="text"
                    name="projects"
                    value={studentProfileData.projects.join(", ") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        projects: e.target.value.split(","),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Skills (comma-separated):
                  <input
                    type="text"
                    name="skills"
                    value={studentProfileData.skills.join(", ") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        skills: e.target.value.split(","),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Experiences (comma-separated):
                  <textarea
                    type="text"
                    name="experiences"
                    value={studentProfileData.experiences.join(", ") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        experiences: e.target.value.split(","),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Education:
                  <textarea
                    type="text"
                    name="education"
                    value={studentProfileData.education || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        education: e.target.value.split(","),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                {/* <label className="block mb-2">
                  Profile Picture URL:
                  <input
                    id="file-upload"
                    name="profilePicture"
                    type="file"
                    value={studentProfileData.profilePicture || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        profilePicture: e.target.files[0],
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label> */}
              </div>
            )}
            {userType === "company" && (
              <div>
                <label className="block mb-2">
                  Company Name:
                  <input
                    type="text"
                    value={companyProfileData.companyName || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <textarea
                    value={companyProfileData.description || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Products (comma-separated):
                  <textarea
                    type="text"
                    value={companyProfileData.products.join(", ") || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        products: e.target.value.split(","),
                        // .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Services (comma-separated):
                  <textarea
                    type="text"
                    value={companyProfileData.services.join(", ") || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        services: e.target.value.split(","),
                        // .map((s) => s.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                {/* <label className="block mb-2">
                  Profile Picture URL:
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    value={companyProfileData.profilePicture || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        profilePicture: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label> */}
              </div>
            )}
          </div>
          <button
            onClick={handleProfileSetup}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Complete Profile Setup
          </button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}
