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
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Project() {
  const [applicants, setApplicants] = useState([]);
  const [postId, setPostId] = useState("65dba2d3b708254c13daea1c");

  useEffect(() => {
    // Fetch applicants when the component mounts
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}/applicants`
        );
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  const [activeTab, setActiveTab] = React.useState("html");

  const data = [
    {
      label: "Project Details",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Applicants",
      value: "Applicants",
      desc: (
        <div>
          {/* {applicants &&
            applicants.map((applicant) => (
              <div key={applicant._id}>
                console.log(applicant._id)
                <p>Name: {applicant.name}</p>
                Include other applicant details as needed
              </div>
            ))} */}
        </div>
      ),
    },
    {
      label: "Dashboard",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    // <div className="bg-[#DEE4EA] ">
    //   <Header />
    //   <div className="p-10">
    //     <Card className="">
    //       <CardBody>
    //         <Typography variant="h5" color="blue-gray" className="mb-2">
    //           Applicants
    //         </Typography>
    //         {applicants.map((applicant) => (
    //           <div key={applicant._id}>
    //             {/* Render applicant details here */}
    //             <Typography>{applicant.name}</Typography>
    //             {/* Include other applicant details as needed */}
    //           </div>
    //         ))}
    //       </CardBody>
    //     </Card>
    //   </div>
    // </div>

    <div className="bg-[#DEE4EA] ">
      <Header />
      <div className=" p-10">
        <Card className="">
          <Tabs value={activeTab} className="m-5">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-gray-900" : ""}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
