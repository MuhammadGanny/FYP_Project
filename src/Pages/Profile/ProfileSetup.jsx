// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/header";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import HeaderStudent from "../components/headerStudent.jsx";

// export default function ProfileSetup() {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [redirectToProfile, setRedirectToProfile] = useState(false);
//   const navigate = useNavigate();
//   const [studentProfileData, setStudentProfileData] = useState({
//     name: "",
//     university: "",
//     bio: "",
//     projects: [],
//     skills: [],
//     experiences: [],
//     education: [],
//     profilePicture: "",
//   });

//   const [companyProfileData, setCompanyProfileData] = useState({
//     companyName: "",
//     description: "",
//     products: [],
//     services: [],
//     profilePicture: "",
//   });

//   const [userType, setUserType] = useState("");
//   const [token, setToken] = useState("");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const userIdFromCookie = Cookies.get("userId");
//     const userTypeFromCookie = Cookies.get("userType");
//     const tokenFromCookie = Cookies.get("token");

//     if (userIdFromCookie && userTypeFromCookie && tokenFromCookie) {
//       setUserId(userIdFromCookie);
//       setUserType(userTypeFromCookie);
//       setToken(tokenFromCookie);

//       console.log("User ID:", userIdFromCookie);
//       console.log("User Type:", userTypeFromCookie);
//       console.log("Token:", tokenFromCookie);
//     } else {
//       console.log("ID type and Token Not avauilable in cookies ");
//     }
//   }, []);
//   useEffect(() => {
//     if (redirectToProfile) {
//       // setTimeout(() => {
//       navigate("/profile");

//       //}, 3000);
//     }
//   }, [redirectToProfile]);

//   const handleProfileSetup = async () => {
//     try {
//       if (userType === "student") {
//         const requiredFields = [
//           "name",
//           "university",
//           "bio",
//           "projects",
//           "skills",
//           "experiences",
//           "education",
//         ];
//         const missingFields = requiredFields.filter(
//           (field) => !studentProfileData[field]
//         );

//         if (missingFields.length > 0) {
//           const missingFieldsMessage = `Missing required fields: ${missingFields.join(
//             ", "
//           )}`;
//           console.error(missingFieldsMessage);
//           setErrorMessage(missingFieldsMessage);
//           setSuccessMessage("");
//           return;
//         }
//       } else if (userType === "company") {
//         const requiredFields = [
//           "companyName",
//           "description",
//           "products",
//           "services",
//         ];
//         const missingFields = requiredFields.filter(
//           (field) => !companyProfileData[field]
//         );

//         if (missingFields.length > 0) {
//           const missingFieldsMessage = `Missing required fields: ${missingFields.join(
//             ", "
//           )}`;
//           console.error(missingFieldsMessage);
//           setErrorMessage(missingFieldsMessage);
//           setSuccessMessage("");
//           return;
//         }
//       }

//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("userType", userType);

//       if (userType === "student") {
//         formData.append("profileData", JSON.stringify(studentProfileData));
//         formData.append(
//           "profilePicture",
//           studentProfileData.profilePicture

//           //document.getElementById("file-upload").files[0]
//         );
//       } else if (userType === "company") {
//         console.log("company profile picture ", companyProfileData);
//         formData.append("profileData", JSON.stringify(companyProfileData));
//         formData.append("profilePicture", companyProfileData.profilePicture);
//       }

//       console.log("append form data", formData);

//       await axios.post(
//         "http://localhost:5000/profile/setup-profile",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setSuccessMessage("Profile successfully set up!");
//       setErrorMessage("");
//       setRedirectToProfile(true);
//     } catch (error) {
//       console.error(error);
//       setSuccessMessage(""); // Clear any previous success messages
//       setErrorMessage("Error setting up the profile. Please try again.");
//     }
//   };

//   return (
//     <>
//       {userType === "student" ? <HeaderStudent /> : <Header />}
//       <div className="flex items-center justify-center h-full bg-gray-100">
//         <div className="w-100 mt-1 p-6 bg-white  rounded-md shadow-md">
//           <h1 className="text-3xl mb-4">Profile Setup </h1>
//           <div>
//             {userType === "student" && (
//               <div>
//                 <label className="block mb-2">
//                   Name:
//                   <input
//                     type="text"
//                     name="name"
//                     value={studentProfileData.name || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         name: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   University:
//                   <input
//                     type="text"
//                     name="university"
//                     value={studentProfileData.university || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         university: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Bio:
//                   <input
//                     value={studentProfileData.bio || ""}
//                     name="bio"
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         bio: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>

//                 <label className="block mb-2">
//                   Projects (one per line):
//                   <textarea
//                     type="text"
//                     name="projects"
//                     value={studentProfileData.projects.join("\n") || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         projects: e.target.value.split("\n"),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Skills (one per line):
//                   <textarea
//                     type="text"
//                     name="skills"
//                     value={studentProfileData.skills.join("\n") || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         skills: e.target.value.split("\n"),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Experiences(one per line):
//                   <textarea
//                     type="text"
//                     name="experiences"
//                     value={studentProfileData.experiences.join("\n") || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         experiences: e.target.value.split("\n"),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Education:(one per line):
//                   <textarea
//                     type="text"
//                     name="education"
//                     value={studentProfileData.education.join("\n") || ""}
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         education: e.target.value.split("\n"),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>

//                 <label className="block mb-2">
//                   Profile Picture:
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setStudentProfileData({
//                         ...studentProfileData,
//                         profilePicture: e.target.files[0],
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//               </div>
//             )}
//             {userType === "company" && (
//               <div>
//                 <label className="block mb-2">
//                   Company Name:
//                   <input
//                     type="text"
//                     value={companyProfileData.companyName || ""}
//                     onChange={(e) =>
//                       setCompanyProfileData({
//                         ...companyProfileData,
//                         companyName: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Description:
//                   <textarea
//                     value={companyProfileData.description || ""}
//                     onChange={(e) =>
//                       setCompanyProfileData({
//                         ...companyProfileData,
//                         description: e.target.value,
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Products (One per line):
//                   <textarea
//                     type="text"
//                     value={companyProfileData.products.join("\n") || ""}
//                     //value={companyProfileData.products.join(", ") || ""}
//                     onChange={(e) =>
//                       setCompanyProfileData({
//                         ...companyProfileData,
//                         products: e.target.value.split("\n"),
//                         // .map((s) => s.trim()),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Services (One per line):
//                   <textarea
//                     type="text"
//                     value={companyProfileData.services.join("\n") || ""}
//                     onChange={(e) =>
//                       setCompanyProfileData({
//                         ...companyProfileData,
//                         services: e.target.value.split("\n"),
//                         // .map((s) => s.trim()),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>

//                 <label className="block mb-2">
//                   Profile Picture:
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       console.log("on selection file ", e.target.files);
//                       setCompanyProfileData({
//                         ...companyProfileData,
//                         profilePicture: e.target.files[0],
//                       });
//                     }}
//                     className="w-full border border-gray-300 rounded p-2 mb-2"
//                   />
//                 </label>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={handleProfileSetup}
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Complete Profile Setup
//           </button>
//           {successMessage && <p className="text-green-500">{successMessage}</p>}
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import HeaderStudent from "../components/headerStudent";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Loading spinner
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileSetup() {
  const [studentProfileData, setStudentProfileData] = useState({
    name: "",
    university: "",
    bio: "",
    projects: [],
    skills: [],
    experiences: [],
    education: [],
    profilePicture: null,
  });

  const [companyProfileData, setCompanyProfileData] = useState({
    companyName: "",
    description: "",
    products: [],
    services: [],
    profilePicture: null,
  });

  const [userType, setUserType] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [profileExists, setProfileExists] = useState(null); // null indicates loading
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    const userTypeFromCookie = Cookies.get("userType");
    const tokenFromCookie = Cookies.get("token");

    if (userIdFromCookie && userTypeFromCookie && tokenFromCookie) {
      setUserId(userIdFromCookie);
      setUserType(userTypeFromCookie);
      setToken(tokenFromCookie);

      checkProfileExists(userIdFromCookie, userTypeFromCookie, tokenFromCookie);
    } else {
      toast.error("User not authenticated. Please log in.");
      navigate("/signin"); // Redirect to sign-in page if not authenticated
    }
  }, [navigate]);

  const checkProfileExists = async (userId, userType, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/profile/profile?userId=${userId}&userType=${userType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.userProfile) {
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error("Error checking profile existence:", error);
      toast.error("Error checking profile status. Please try again later.");
      setProfileExists(false); // Allow profile setup in case of error
    }
  };

  const handleProfileSetup = async () => {
    try {
      // Validate required fields
      if (userType === "student") {
        const {
          name,
          university,
          bio,
          projects,
          skills,
          experiences,
          education,
          profilePicture,
        } = studentProfileData;

        if (
          !name ||
          !university ||
          !bio ||
          projects.length === 0 ||
          skills.length === 0 ||
          experiences.length === 0 ||
          education.length === 0 ||
          !profilePicture
        ) {
          toast.error("Please fill in all required fields.");
          return;
        }
      } else if (userType === "company") {
        const { companyName, description, products, services, profilePicture } =
          companyProfileData;

        if (
          !companyName ||
          !description ||
          products.length === 0 ||
          services.length === 0 ||
          !profilePicture
        ) {
          toast.error("Please fill in all required fields.");
          return;
        }
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userType", userType);

      if (userType === "student") {
        formData.append(
          "profileData",
          JSON.stringify({
            ...studentProfileData,
            projects: studentProfileData.projects.filter(Boolean),
            skills: studentProfileData.skills.filter(Boolean),
            experiences: studentProfileData.experiences.filter(Boolean),
            education: studentProfileData.education.filter(Boolean),
          })
        );
        formData.append("profilePicture", studentProfileData.profilePicture);
      } else if (userType === "company") {
        formData.append(
          "profileData",
          JSON.stringify({
            ...companyProfileData,
            products: companyProfileData.products.filter(Boolean),
            services: companyProfileData.services.filter(Boolean),
          })
        );
        formData.append("profilePicture", companyProfileData.profilePicture);
      }

      await axios.post(
        "http://localhost:5000/profile/setup-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile successfully set up!");
      navigate("/profile"); // Redirect to profile page after successful setup
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error(
        error.response?.data?.message ||
          "Error setting up the profile. Please try again."
      );
    }
  };

  if (profileExists === null) {
    // Loading state
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (profileExists) {
    // Profile already exists
    return (
      <>
        {userType === "student" ? <HeaderStudent /> : <Header />}
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Your profile is already set up!
            </h2>
            <p className="mb-6">
              If you wish to update your profile information, please visit the
              update profile page.
            </p>
            <Link to="/updateprofile">
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Update Profile
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Profile does not exist, render setup form
  return (
    <>
      {userType === "student" ? <HeaderStudent /> : <Header />}
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl mt-5 p-8 bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Profile Setup
          </h1>
          {userType === "student" ? (
            <StudentProfileForm
              studentProfileData={studentProfileData}
              setStudentProfileData={setStudentProfileData}
              handleProfileSetup={handleProfileSetup}
            />
          ) : (
            <CompanyProfileForm
              companyProfileData={companyProfileData}
              setCompanyProfileData={setCompanyProfileData}
              handleProfileSetup={handleProfileSetup}
            />
          )}
        </div>
      </div>
    </>
  );
}

function StudentProfileForm({
  studentProfileData,
  setStudentProfileData,
  handleProfileSetup,
}) {
  return (
    <div>
      <InputField
        label="Name"
        value={studentProfileData.name}
        onChange={(value) =>
          setStudentProfileData({ ...studentProfileData, name: value })
        }
      />
      <InputField
        label="University"
        value={studentProfileData.university}
        onChange={(value) =>
          setStudentProfileData({ ...studentProfileData, university: value })
        }
      />
      <InputField
        label="Bio"
        value={studentProfileData.bio}
        onChange={(value) =>
          setStudentProfileData({ ...studentProfileData, bio: value })
        }
        textarea
      />
      <InputField
        label="Projects (one per line)"
        value={studentProfileData.projects.join("\n")}
        onChange={(value) =>
          setStudentProfileData({
            ...studentProfileData,
            projects: value.split("\n"),
          })
        }
        textarea
      />
      <InputField
        label="Skills (one per line)"
        value={studentProfileData.skills.join("\n")}
        onChange={(value) =>
          setStudentProfileData({
            ...studentProfileData,
            skills: value.split("\n"),
          })
        }
        textarea
      />
      <InputField
        label="Experiences (one per line)"
        value={studentProfileData.experiences.join("\n")}
        onChange={(value) =>
          setStudentProfileData({
            ...studentProfileData,
            experiences: value.split("\n"),
          })
        }
        textarea
      />
      <InputField
        label="Education (one per line)"
        value={studentProfileData.education.join("\n")}
        onChange={(value) =>
          setStudentProfileData({
            ...studentProfileData,
            education: value.split("\n"),
          })
        }
        textarea
      />
      <FileInputField
        label="Profile Picture"
        onChange={(file) =>
          setStudentProfileData({
            ...studentProfileData,
            profilePicture: file,
          })
        }
      />
      <SubmitButton onClick={handleProfileSetup} />
    </div>
  );
}

function CompanyProfileForm({
  companyProfileData,
  setCompanyProfileData,
  handleProfileSetup,
}) {
  return (
    <div>
      <InputField
        label="Company Name"
        value={companyProfileData.companyName}
        onChange={(value) =>
          setCompanyProfileData({ ...companyProfileData, companyName: value })
        }
      />
      <InputField
        label="Description"
        value={companyProfileData.description}
        onChange={(value) =>
          setCompanyProfileData({ ...companyProfileData, description: value })
        }
        textarea
      />
      <InputField
        label="Products (one per line)"
        value={companyProfileData.products.join("\n")}
        onChange={(value) =>
          setCompanyProfileData({
            ...companyProfileData,
            products: value.split("\n"),
          })
        }
        textarea
      />
      <InputField
        label="Services (one per line)"
        value={companyProfileData.services.join("\n")}
        onChange={(value) =>
          setCompanyProfileData({
            ...companyProfileData,
            services: value.split("\n"),
          })
        }
        textarea
      />
      <FileInputField
        label="Profile Picture"
        onChange={(file) =>
          setCompanyProfileData({
            ...companyProfileData,
            profilePicture: file,
          })
        }
      />
      <SubmitButton onClick={handleProfileSetup} />
    </div>
  );
}

function InputField({ label, value, onChange, textarea = false }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}:</label>
      {textarea ? (
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function FileInputField({ label, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">{label}:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full"
      />
    </div>
  );
}

function SubmitButton({ onClick }) {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Complete Profile Setup
      </button>
    </div>
  );
}
