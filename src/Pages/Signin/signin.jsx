import LOGO from "../Assets/logo.svg";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Signin() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // const validatePassword = (password) => {
  //   return password.length >= 8;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.target.email.value;
    const passwordInput = e.target.password.value;
    const userTypeInput = e.target.userType ? e.target.userType.value : null;

    if (!validateEmail(emailInput)) {
      setErrorMessage(
        "Invalid email format. Please enter a valid email address ending with .com."
      );
      return;
    }

    try {
      let userResponse;
      userResponse = await axios.post("http://localhost:5000/user/login", {
        email: emailInput,
        password: passwordInput,
        userType: userTypeInput,
      });

      if (userResponse.status === 200) {
        console.log("User is signed in.");
        setMessage("User is signed in.");

        // Extract userType from response data
        const userType = userResponse.data.userType;

        // Set cookies
        const token = userResponse.data.token;
        const userId = userResponse.data.userId;
        Cookies.set("token", token);
        Cookies.set("userId", userId);
        Cookies.set("userType", userType);

        // Redirect based on userType
        if (userType === "student") {
          navigate("/homepageStudent");
        } else if (userType === "company") {
          navigate("/homepage");
        }

        setErrorMessage("");
        return;
      }
      console.error("Login failed.");
      setMessage("");

      if (
        userResponse.status === 401 &&
        userResponse.data.error === "Invalid credentials."
      ) {
        setErrorMessage("Incorrect Email & Password");
      } else {
        setErrorMessage("Login failed: " + userResponse.data.error);
      }
    } catch (error) {
      console.error("General error occurred:", error);
      setMessage("");
      setErrorMessage("Error occurred during login");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={LOGO} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="/homepage"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {message && (
            <div className="text-center text-l text-indigo-600">{message}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered?{" "}
            <a
              href="/register"
              className="mr-4   justify-center rounded-md   text-sm font-semibold leading-6 text-whitetext-gray-500  hover:text-indigo-500 "
            >
              Register Your Self First
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
