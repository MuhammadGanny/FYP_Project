import React, { useState } from "react";
import Header from "../components/header";
import { Card, Button } from "@material-tailwind/react";

export default function Milestone() {
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

  const handleSaveMilestone = () => {
    setSavedMilestones((prevMilestones) => [...prevMilestones, milestone]);
    setMilestone({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

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

// import React, { useState } from "react";
// import Header from "../components/header";
// import { Card, Button, Input } from "@material-tailwind/react";

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
//     setSavedMilestones([...savedMilestones, milestone]);
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
//               <Input
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
//               <Input
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
//               <Input
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
//               <Input
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
//             {/* <Button
//               className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               onClick={handleSaveMilestone}
//             >
//               Save Milestone
//             </Button> */}
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

// import React, { useState } from "react";
// import Header from "../components/header";
// import { Card, Button, Input } from "@material-tailwind/react";

// export default function Milestone() {
//   const [milestones, setMilestones] = useState([
//     { name: "", description: "", startDate: "", endDate: "" },
//   ]);
//   const [savedMilestones, setSavedMilestones] = useState([]);

//   const handleAddMilestone = () => {
//     setMilestones([
//       ...milestones,
//       { name: "", description: "", startDate: "", endDate: "" },
//     ]);
//   };

//   const handleMilestoneChange = (index, field, value) => {
//     const newMilestones = [...milestones];
//     newMilestones[index][field] = value;
//     setMilestones(newMilestones);
//   };

//   const handleSubmit = () => {
//     setSavedMilestones([...savedMilestones, ...milestones]);
//     setMilestones([{ name: "", description: "", startDate: "", endDate: "" }]);
//   };

//   return (
//     <div className="bg-[#DEE4EA]">
//       <Header />
//       <div className="p-10">
//         <Card className="mb-8">
//           <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Milestone Details</h1>
//             {milestones.map((milestone, index) => (
//               <div key={index} className="mb-4">
//                 <label
//                   htmlFor={`name-${index}`}
//                   className="block mb-1 font-semibold text-gray-800"
//                 >
//                   Milestone Name
//                 </label>
//                 <Input
//                   type="text"
//                   placeholder="Milestone Name"
//                   id={`name-${index}`}
//                   value={milestone.name}
//                   onChange={(e) =>
//                     handleMilestoneChange(index, "name", e.target.value)
//                   }
//                   className="mb-2"
//                 />
//                 <label
//                   htmlFor={`description-${index}`}
//                   className="block mb-1 font-semibold text-gray-800"
//                 >
//                   Description
//                 </label>
//                 <Input
//                   type="text"
//                   placeholder="Description"
//                   id={`description-${index}`}
//                   value={milestone.description}
//                   onChange={(e) =>
//                     handleMilestoneChange(index, "description", e.target.value)
//                   }
//                   className="mb-2"
//                 />
//                 <label
//                   htmlFor={`start-date-${index}`}
//                   className="block mb-1 font-semibold text-gray-800"
//                 >
//                   Start Date
//                 </label>
//                 <Input
//                   type="date"
//                   placeholder="Start Date"
//                   id={`start-date-${index}`}
//                   value={milestone.startDate}
//                   onChange={(e) =>
//                     handleMilestoneChange(index, "startDate", e.target.value)
//                   }
//                   className="mb-2"
//                 />
//                 <label
//                   htmlFor={`end-date-${index}`}
//                   className="block mb-1 font-semibold text-gray-800"
//                 >
//                   End Date
//                 </label>
//                 <Input
//                   type="date"
//                   placeholder="End Date"
//                   id={`end-date-${index}`}
//                   value={milestone.endDate}
//                   onChange={(e) =>
//                     handleMilestoneChange(index, "endDate", e.target.value)
//                   }
//                   className="mb-4"
//                 />
//               </div>
//             ))}
//             <div className="flex justify-between">
//               <Button
//                 className="w-[48%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 onClick={handleAddMilestone}
//               >
//                 Add Milestone
//               </Button>
//               <Button
//                 className="w-[48%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 onClick={handleSubmit}
//               >
//                 Save Milestones
//               </Button>
//             </div>
//           </div>
//         </Card>
//         <Card className="mb-8">
//           <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Saved Milestones</h1>
//             {savedMilestones.map((milestone, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-gray-500 mb-1">Milestone {index + 1}</p>
//                 <p className="font-semibold">{milestone.name}</p>
//                 <p>{milestone.description}</p>
//                 <p>Start Date: {milestone.startDate}</p>
//                 <p>End Date: {milestone.endDate}</p>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
