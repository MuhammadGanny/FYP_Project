import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Posting() {
  const [projectHeading, setProjectHeading] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skills, setSkills] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!projectHeading || !projectDescription || !skills) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/posts", {
        projectHeading,
        projectDescription,
        skills,
      });

      if (response.status === 201) {
        setSuccessMessage("Post created successfully");
        setErrorMessage("");
        setProjectHeading("");
        setProjectDescription("");
        setSkills("");
      } else {
        setErrorMessage("Failed to save the post: " + response.data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error creating post: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="m-12">
        <Card className="w-[60%] ml-[20%]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h3"
              className="mb-4 grid h-28 place-items-center"
            >
              Post Ideas
            </Typography>
            <label className="block text-sm font-bold leading-6 text-gray-900">
              PROJECT HEADING
            </label>
            <input
              value={projectHeading}
              onChange={(e) => setProjectHeading(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label className="block text-sm  font-bold leading-6 text-gray-900">
              PROJECT DISCRIPTION
            </label>

            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label className="block text-sm  font-bold leading-6 text-gray-900">
              SKILLS
            </label>

            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {successMessage && (
              <div className="text-green-500 text-center">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              onClick={handleSubmit}
              className="bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              POST
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
