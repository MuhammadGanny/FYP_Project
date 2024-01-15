import LOGO from "../Assets/logo.svg";
import React, { useState } from "react";
import axios from "axios";
import { Select, Option } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';

export default function Register() {
  // const [userType, setUserType] = useState('university'); // Default to university
  const [formData, setFormData] = useState({
   // name: "",
    email: "",
    password: "",
    userType:"",
    //phone: "",
   // university: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );

      if (response.status === 201) {
        console.log("Registration successful");

        //window.location.href = "/signin";
        setTimeout(() => {
          navigate('/signin');// Use navigate
        }, 3000);
        setSuccessMessage("Registration successful");
        setErrorMessage("");
      } else {
        console.error("Registration failed");
        setErrorMessage("Registration failed");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error occurred:", error);

      setErrorMessage(error.response.data.error);
      setSuccessMessage("");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  //  // console.log("Form Datas:", formData);
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      console.log("Form Datas:", { ...prevData, [name]: value });
      return { ...prevData, [name]: value };
    });
  };
  

  const handleSelect = (selectedUsertype) => {
    // Check if usertype is not empty
    if (!selectedUsertype) {
      console.error('Usertype cannot be empty');
      return;
    }
  
    // Some other logic...
  
    // Pass the selected value directly to handleInputChange
    handleInputChange({ target: { name: 'userType', value: selectedUsertype } });
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={LOGO} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* <div className=" mt-2  ">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Type
              </label>
              <Select variant="outlined" >
                <Option>Student</Option>
                <Option>Company</Option>
              </Select>
            </div> */}
            <div className=" mt-2  ">
              <label
                htmlFor="userType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Type
              </label>
              <Select
                variant="outlined"
                value={formData.userType}
                name="userType"
                onChange={handleSelect}
              >
                <Option value="student">Student</Option>
                <Option value="company">Company</Option>
              </Select>
            </div>
            <div className=" mt-2  ">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          {successMessage && (
            <div className="text-indigo-600 text-center">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Registered?{" "}
            <a
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signin Here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}