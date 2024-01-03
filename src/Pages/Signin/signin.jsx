import LOGO from "../Assets/logo.svg";
import axios from "axios";
import { useState } from "react";
import React from "react";

export default function Signin() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.target.email.value;
    const passwordInput = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        console.log("User is signed in.");
        setMessage("User is signed in.");
        setErrorMessage("");
        window.location.href = "/homepage";
      } else {
        console.error("Login failed.");
        setMessage("");
        if (response.status === 401) {
          setErrorMessage("Incorrect Email & Password");
        } else {
          // Handle other cases as needed
          setErrorMessage("Login failed: " + response.data.error);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
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
            <span className="font-semibold leading-6 flex mr-4 flex mt-4">
              <a
                href="/student/register"
                className="flex mr-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as Student
              </a>
              <a
                href="/company/register"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as Company
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
