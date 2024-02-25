import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LOGO from "../Assets/logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Home() {
  const [projectPosts, setProjectPosts] = useState([]);
  const [userIdFromCookie, setUserIdFromCookie] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/posts")
  //     .then((response) => {
  //       const reversedPosts = response.data.posts.reverse();
  //       setProjectPosts(reversedPosts);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching project posts:", error);
  //     });
  // }, []);

  useEffect(() => {
    // Fetch posts by author (user ID from cookies)
    const fetchPostsByAuthor = async () => {
      try {
        const userIdFromCookie = Cookies.get("userId");
        setUserIdFromCookie(userIdFromCookie);

        const response = await axios.get(
          `http://localhost:5000/posts/author/${userIdFromCookie}`
        );
        const reversedPosts = response.data.posts.reverse();
        setProjectPosts(reversedPosts);
      } catch (error) {
        console.error("Error fetching project posts:", error);
      }
    };
    fetchPostsByAuthor();
  }, []);

  const handleConnect = async (postId, studentId) => {
    try {
      await axios.post("http://localhost:5000/posts/connect", {
        postId,
        studentId, //student will be only shown the button
      });
      // Show success message or update UI accordingly
    } catch (error) {
      console.error("Error connecting with project:", error);
      // Show error message or handle error case
    }
  };
  useEffect(() => {
    // const setUserIdFromCookie = Cookies.get("userId");
    // setUserIdFromCookie(userIdFromCookie);
    const userIdFromCookie = Cookies.get("userId");
    setUserIdFromCookie(userIdFromCookie);
    const userTypeFromCookie = Cookies.get("userType");
    const tokenFromCookie = Cookies.get("token");

    console.log("User ID: in post area ", userIdFromCookie);
    // console.log("User Type: in post area ", userTypeFromCookie);
    // console.log("Token: in post area ", tokenFromCookie);
    // } else {
    //   console.log("ID type and Token Not avauilable in cookies ");
    // }
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Header />

        <header className="bg-[#DEE4EA] shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Project Listing
            </h1>
          </div>
        </header>
        <main className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {projectPosts.map((post) => (
              <Card key={post._id} className="mt-6 w-[60%] ml-[20%]">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {post.projectHeading}
                  </Typography>
                  <Typography>{post.projectDescription}</Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Skills
                  </Typography>
                  <Typography>{post.skills}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  {/* <Button className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Connect
                  </Button> */}
                  <Button
                    className="flex ml-[25%] w-[50%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleConnect(post._id, userIdFromCookie)} // Assuming you have access to studentId
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
