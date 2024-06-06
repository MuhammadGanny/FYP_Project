// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/header";
// import { Card, Button } from "@material-tailwind/react";
// // import { FaEdit } from "react-icons/fa"; // Import edit icon
// import { Pencil } from "lucide-react";

// export default function Milestone() {
//   const { postId } = useParams();
//   const [milestone, setMilestone] = useState({
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [savedMilestones, setSavedMilestones] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingMilestoneId, setEditingMilestoneId] = useState(null);

//   const handleMilestoneChange = (field, value) => {
//     setMilestone({
//       ...milestone,
//       [field]: value,
//     });
//   };

//   const handleSaveMilestone = async () => {
//     if (isEditing) {
//       await handleUpdateMilestone();
//     } else {
//       try {
//         const response = await axios.post("http://localhost:5000/milestone", {
//           postId,
//           ...milestone,
//         });
//         setSavedMilestones((prevMilestones) => [
//           ...prevMilestones,
//           response.data.milestone,
//         ]);
//         setMilestone({
//           name: "",
//           description: "",
//           startDate: "",
//           endDate: "",
//         });
//       } catch (error) {
//         console.error("Error saving milestone:", error);
//       }
//     }
//   };

//   const handleEditMilestone = (milestone) => {
//     setIsEditing(true);
//     setEditingMilestoneId(milestone._id);
//     console.log(milestone._id);
//     setMilestone({
//       name: milestone.name,
//       description: milestone.description,
//       startDate: milestone.startDate.split("T")[0], // Format date correctly
//       endDate: milestone.endDate.split("T")[0], // Format date correctly
//     });
//   };

//   const handleUpdateMilestone = async () => {
//     try {
//       await axios.put(`http://localhost:5000/milestone/${editingMilestoneId}`, {
//         postId,
//         ...milestone,
//       });
//       setSavedMilestones((prevMilestones) =>
//         prevMilestones.map((m) =>
//           m._id === editingMilestoneId ? { ...m, ...milestone } : m
//         )
//       );
//       setMilestone({
//         name: "",
//         description: "",
//         startDate: "",
//         endDate: "",
//       });
//       setIsEditing(false);
//       setEditingMilestoneId(null);
//     } catch (error) {
//       console.error("Error updating milestone:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchMilestones = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/milestone/${postId}`
//         );
//         setSavedMilestones(response.data);
//       } catch (error) {
//         console.error("Error fetching milestones:", error);
//       }
//     };

//     fetchMilestones();
//   }, [postId]);

//   return (
//     <div className="bg-[#DEE4EA]">
//       <Header />
//       <div className="p-10">
//         <Card className="mb-8">
//           <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">
//               {isEditing ? "Edit Milestone" : "Milestone Details"}
//             </h1>
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block mb-1 font-semibold text-gray-800"
//               >
//                 Milestone Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Milestone Name"
//                 value={milestone.name}
//                 onChange={(e) => handleMilestoneChange("name", e.target.value)}
//                 className="mb-2"
//               />
//               <label
//                 htmlFor="description"
//                 className="block mb-1 font-semibold text-gray-800"
//               >
//                 Description
//               </label>
//               <input
//                 type="text"
//                 id="description"
//                 placeholder="Description"
//                 value={milestone.description}
//                 onChange={(e) =>
//                   handleMilestoneChange("description", e.target.value)
//                 }
//                 className="mb-2"
//               />
//               <label
//                 htmlFor="startDate"
//                 className="block mb-1 font-semibold text-gray-800"
//               >
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 id="startDate"
//                 placeholder="Start Date"
//                 value={milestone.startDate}
//                 onChange={(e) =>
//                   handleMilestoneChange("startDate", e.target.value)
//                 }
//                 className="mb-2"
//               />
//               <label
//                 htmlFor="endDate"
//                 className="block mb-1 font-semibold text-gray-800"
//               >
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 id="endDate"
//                 placeholder="End Date"
//                 value={milestone.endDate}
//                 onChange={(e) =>
//                   handleMilestoneChange("endDate", e.target.value)
//                 }
//                 className="mb-4"
//               />
//             </div>
//             <Button
//               onClick={handleSaveMilestone}
//               className="w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//             >
//               {isEditing ? "Update Milestone" : "Save Milestone"}
//             </Button>
//           </div>
//         </Card>
//         <div className="grid grid-cols-1 gap-4">
//           {savedMilestones.map((savedMilestone, index) => (
//             <Card key={index} className="p-4">
//               <div className="flex justify-between items-center mb-1">
//                 <p className="text-gray-500">Milestone {index + 1}</p>
//                 <button
//                   onClick={() => handleEditMilestone(savedMilestone)}
//                   className="text-indigo-600 hover:text-indigo-800"
//                 >
//                   {/* <FaEdit /> */}
//                   {/* edit */}
//                   <Pencil />
//                 </button>
//               </div>
//               <p className="font-semibold">{savedMilestone.name}</p>
//               <p>{savedMilestone.description}</p>
//               <p>
//                 Start Date:{" "}
//                 {new Date(savedMilestone.startDate).toLocaleDateString()}
//               </p>
//               <p>
//                 End Date:{" "}
//                 {new Date(savedMilestone.endDate).toLocaleDateString()}
//               </p>
//               <p>Status: {savedMilestone.status}</p>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import { Card, Button } from "@material-tailwind/react";
import { Pencil } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Milestone() {
  const { postId } = useParams();
  const [milestone, setMilestone] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [savedMilestones, setSavedMilestones] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState(null);

  const handleMilestoneChange = (field, value) => {
    setMilestone({
      ...milestone,
      [field]: value,
    });
  };

  const handleSaveMilestone = async () => {
    if (isEditing) {
      await handleUpdateMilestone();
    } else {
      try {
        const response = await axios.post("http://localhost:5000/milestone", {
          postId,
          ...milestone,
        });
        setSavedMilestones((prevMilestones) => [
          ...prevMilestones,
          response.data.milestone,
        ]);
        setMilestone({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        toast.success("Milestone added successfully!");
      } catch (error) {
        console.error("Error saving milestone:", error);
        toast.error("Failed to add milestone.");
      }
    }
  };

  const handleEditMilestone = (milestone) => {
    setIsEditing(true);
    setEditingMilestoneId(milestone._id);
    setMilestone({
      name: milestone.name,
      description: milestone.description,
      startDate: milestone.startDate.split("T")[0], // Format date correctly
      endDate: milestone.endDate.split("T")[0], // Format date correctly
    });
    toast.info("Editing milestone.");
  };

  const handleUpdateMilestone = async () => {
    try {
      await axios.put(`http://localhost:5000/milestone/${editingMilestoneId}`, {
        postId,
        ...milestone,
      });
      setSavedMilestones((prevMilestones) =>
        prevMilestones.map((m) =>
          m._id === editingMilestoneId ? { ...m, ...milestone } : m
        )
      );
      setMilestone({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setIsEditing(false);
      setEditingMilestoneId(null);
      toast.success("Milestone updated successfully!");
    } catch (error) {
      console.error("Error updating milestone:", error);
      toast.error("Failed to update milestone.");
    }
  };

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/milestone/${postId}`
        );
        setSavedMilestones(response.data);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, [postId]);

  return (
    <div className="bg-[#DEE4EA]">
      <Header />
      <ToastContainer />
      <div className="p-10">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Milestone" : "Milestone Details"}
            </h1>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1 font-semibold text-gray-800"
              >
                Milestone Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Milestone Name"
                value={milestone.name}
                onChange={(e) => handleMilestoneChange("name", e.target.value)}
                className="mb-2"
              />
              <label
                htmlFor="description"
                className="block mb-1 font-semibold text-gray-800"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Description"
                value={milestone.description}
                onChange={(e) =>
                  handleMilestoneChange("description", e.target.value)
                }
                className="mb-2"
              />
              <label
                htmlFor="startDate"
                className="block mb-1 font-semibold text-gray-800"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                placeholder="Start Date"
                value={milestone.startDate}
                onChange={(e) =>
                  handleMilestoneChange("startDate", e.target.value)
                }
                className="mb-2"
              />
              <label
                htmlFor="endDate"
                className="block mb-1 font-semibold text-gray-800"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                placeholder="End Date"
                value={milestone.endDate}
                onChange={(e) =>
                  handleMilestoneChange("endDate", e.target.value)
                }
                className="mb-4"
              />
            </div>
            <Button
              onClick={handleSaveMilestone}
              className="w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {isEditing ? "Update Milestone" : "Save Milestone"}
            </Button>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          {savedMilestones.map((savedMilestone, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-500">Milestone {index + 1}</p>
                <button
                  onClick={() => handleEditMilestone(savedMilestone)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Pencil />
                </button>
              </div>
              <p className="font-semibold">{savedMilestone.name}</p>
              <p>{savedMilestone.description}</p>
              <p>
                Start Date:{" "}
                {new Date(savedMilestone.startDate).toLocaleDateString()}
              </p>
              <p>
                End Date:{" "}
                {new Date(savedMilestone.endDate).toLocaleDateString()}
              </p>
              <p>Status: {savedMilestone.status}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
