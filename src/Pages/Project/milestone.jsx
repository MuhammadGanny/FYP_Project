// import React, { useState } from "react";
// import Header from "../components/header";
// import { Card, Button } from "@material-tailwind/react";

// export default function Milestone() {
//   const [milestone, setMilestone] = useState({
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [savedMilestones, setSavedMilestones] = useState([]);

//   const handleMilestoneChange = (field, value) => {
//     setMilestone({
//       ...milestone,
//       [field]: value,
//     });
//   };

//   const handleSaveMilestone = () => {
//     setSavedMilestones((prevMilestones) => [...prevMilestones, milestone]);
//     setMilestone({
//       name: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   return (
//     <div className="bg-[#DEE4EA]">
//       <Header />
//       <div className="p-10">
//         <Card className="mb-8">
//           <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Milestone Details</h1>
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
//               Save Milestone
//             </Button>
//           </div>
//         </Card>
//         <Card className="mb-8">
//           <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Saved Milestones</h1>
//             {savedMilestones.map((savedMilestone, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-gray-500 mb-1">Milestone {index + 1}</p>
//                 <p className="font-semibold">{savedMilestone.name}</p>
//                 <p>{savedMilestone.description}</p>
//                 <p>Start Date: {savedMilestone.startDate}</p>
//                 <p>End Date: {savedMilestone.endDate}</p>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import { Card, Button } from "@material-tailwind/react";

export default function Milestone() {
  const { postId } = useParams();
  const [milestone, setMilestone] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [savedMilestones, setSavedMilestones] = useState([]);

  const handleMilestoneChange = (field, value) => {
    setMilestone({
      ...milestone,
      [field]: value,
    });
  };

  const handleSaveMilestone = async () => {
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
    } catch (error) {
      console.error("Error saving milestone:", error);
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
      <div className="p-10">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Milestone Details</h1>
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
              Save Milestone
            </Button>
          </div>
        </Card>
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Saved Milestones</h1>
            {savedMilestones.map((savedMilestone, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-500 mb-1">Milestone {index + 1}</p>
                <p className="font-semibold">{savedMilestone.name}</p>
                <p>{savedMilestone.description}</p>
                <p>Start Date: {savedMilestone.startDate}</p>
                <p>End Date: {savedMilestone.endDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
