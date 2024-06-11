import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/header";
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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${selectedPostId}`);
      setProjectPosts(
        projectPosts.filter((post) => post._id !== selectedPostId)
      );
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

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
              <div key={post._id} className="mt-6 w-[60%] ml-[20%]">
                <Card>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {post.projectHeading}
                    </Typography>
                    <Typography>{post.projectDescription}</Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Skills
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {post.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-200 px-2 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between">
                      <Link to={`/projectpage/${post._id}`}>
                        <Button className="flex w-[100%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          View Details
                        </Button>
                      </Link>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => {
                            setSelectedPostId(post._id);
                            setDeleteConfirmationOpen(true);
                          }}
                          // className="flex  w-[100%] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                          className="flex w-[100%] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          Delete
                        </Button>

                        <Link to={`/updatepost/${post._id}`}>
                          <Button
                            className="flex  w-[100%] justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            //className="flex w-[76%] justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                          >
                            Update
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </main>
      </div>
      {deleteConfirmationOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full text-center">
              <div className="text-red-500"></div>
              <p className="mt-4">Are you sure you want to delete this post?</p>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleDelete}
                  className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setDeleteConfirmationOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
