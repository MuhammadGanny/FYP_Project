import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import HeaderStudent from "../components/headerStudent.jsx";

export default function UpdateProfile() {
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

      fetchProfileData(userIdFromCookie, userTypeFromCookie, tokenFromCookie);
    } else {
      console.log("ID type and Token Not available in cookies ");
    }
  }, []);

  const fetchProfileData = async (userId, userType, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/profile/profile?userId=${userId}&userType=${userType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = response.data;

      if (userType === "student") {
        setStudentProfileData({
          name: profileData.userProfile.name || "",
          university: profileData.userProfile.university || "",
          bio: profileData.userProfile.bio || "",
          projects: profileData.userProfile.projects || [],
          skills: profileData.userProfile.skills || [],
          experiences: profileData.userProfile.experiences || [],
          education: profileData.userProfile.education || [],
          profilePicture: profileData.userProfile.profilePicture || "",
        });
      } else if (userType === "company") {
        setCompanyProfileData({
          companyName: profileData.userProfile.companyName || "",
          description: profileData.userProfile.description || "",
          products: profileData.userProfile.products || [],
          services: profileData.userProfile.services || [],
          profilePicture: profileData.userProfile.profilePicture || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userType", userType);

      if (userType === "student") {
        formData.append("profileData", JSON.stringify(studentProfileData));
        formData.append("profilePicture", studentProfileData.profilePicture);
      } else if (userType === "company") {
        formData.append("profileData", JSON.stringify(companyProfileData));
        formData.append("profilePicture", companyProfileData.profilePicture);
      }

      await axios.put(
        "http://localhost:5000/profile/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Profile successfully updated!");
      setErrorMessage("");
      setRedirectToProfile(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("");
      setErrorMessage("Error updating the profile. Please try again.");
    }
  };

  useEffect(() => {
    if (redirectToProfile) {
      navigate("/profile");
    }
  }, [redirectToProfile]);

  return (
    <>
      {userType === "student" ? <HeaderStudent /> : <Header />}
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="w-100 mt-1 p-6 bg-white rounded-md shadow-md">
          <h1 className="text-3xl mb-4">Update Profile</h1>
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
                  Projects (one per line):
                  <textarea
                    type="text"
                    name="projects"
                    value={studentProfileData.projects.join("\n") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        projects: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Skills (one per line):
                  <textarea
                    type="text"
                    name="skills"
                    value={studentProfileData.skills.join("\n") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        skills: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Experiences (one per line):
                  <textarea
                    type="text"
                    name="experiences"
                    value={studentProfileData.experiences.join("\n") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        experiences: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Education (one per line):
                  <textarea
                    type="text"
                    name="education"
                    value={studentProfileData.education.join("\n") || ""}
                    onChange={(e) =>
                      setStudentProfileData({
                        ...studentProfileData,
                        education: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                {/* <label className="block mb-2">
                  Profile Picture:
                  <input
                    type="file"
                    accept="image/*"
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
                  Products (One per line):
                  <textarea
                    type="text"
                    value={companyProfileData.products.join("\n") || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        products: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                <label className="block mb-2">
                  Services (One per line):
                  <textarea
                    type="text"
                    value={companyProfileData.services.join("\n") || ""}
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        services: e.target.value.split("\n"),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label>
                {/* <label className="block mb-2">
                  Profile Picture:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCompanyProfileData({
                        ...companyProfileData,
                        profilePicture: e.target.files[0],
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </label> */}
              </div>
            )}
          </div>
          <button
            onClick={handleProfileUpdate}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Update Profile
          </button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}
