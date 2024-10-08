import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LOGO from "../Assets/logo.svg";
import axios from "axios";
import Cookies from "js-cookie";
import socket from "../socket"; // Import socket instance

const navigation = [
  { name: "Projects", href: "/homepagestudent", current: false },
  { name: "Ongoing Projects", href: "/ongoing-projects", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Profile Setup", href: "/profilesetup" },
  { name: "Update Profile", href: "/updateprofile" },
  { name: "Sign out", href: "/signin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderStudent() {
  const [userProfile, setUserProfile] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const userType = Cookies.get("userType");

    axios
      .get(
        `http://localhost:5000/profile/profile?userId=${userId}&userType=${userType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUserProfile(response.data.userProfile);
      })
      .catch((error) => {
        console.error("Error fetching user profile data:", error);
      });

    // Fetch initial notifications
    axios
      .get(`http://localhost:5000/notifications?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //const reversednotifications = response.data.notifications.reverse();
        setNotifications(response.data.notifications.reverse());
        checkUnreadNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });

    // Listen for real-time notifications
    socket.emit("joinRoom", { userId });
    socket.on("newNotification", (notification) => {
      console.log("Received notification:", notification); // Log the notification data
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      setHasUnreadNotifications(true); // Show red dot on new notification
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("userType");
    navigate("/signin");
  };

  const profilePictureUrl = userProfile.profilePicture
    ? `/${userProfile.profilePicture.split("/").pop()}`
    : "/default-profile.jpeg";

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      markNotificationsAsRead(); // Mark as read when opening notifications
    }
  };

  const checkUnreadNotifications = (notifications) => {
    const hasUnread = notifications.some(
      (notification) => !notification.isRead
    );
    setHasUnreadNotifications(hasUnread);
  };

  const markNotificationsAsRead = () => {
    const userId = Cookies.get("userId");

    axios
      .put(`http://localhost:5000/notifications/markAsRead`, { userId })
      .then(() => {
        setNotifications(
          notifications.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );
        setHasUnreadNotifications(false); // Remove red dot
      })
      .catch((error) => {
        console.error("Error marking notifications as read:", error);
      });
  };

  return (
    <Disclosure as="nav" className="bg-[#ffffff]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-14 w-25" src={LOGO} alt="Your Company" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-black"
                            : "text-gray-600 hover:bg-[#DEE4EA] hover:text-gray-900 hover:pb-2",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={toggleNotifications}
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {hasUnreadNotifications && (
                          <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-2 -translate-y-1/2 bg-red-600 rounded-full" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      show={isNotificationsOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {/* <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification, index) => {
                            const senderProfile =
                              notification.senderId.userType === "student"
                                ? notification.senderId.Sprofile
                                : notification.senderId.Cprofile;

                            return (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        className="h-6 w-6 rounded-full"
                                        src={
                                          senderProfile?.profilePicture || LOGO
                                        }
                                        alt=""
                                      />
                                      <span className="ml-2">
                                        {senderProfile?.name ||
                                          senderProfile?.companyName ||
                                          "Unknown"}
                                      </span>
                                    </div>
                                    <div>{notification.message}</div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(
                                        notification.createdAt
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })
                        )}
                      </Menu.Items> */}
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-sm text-gray-500">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification, index) => {
                            const senderProfile =
                              notification.senderId.userType === "student"
                                ? notification.senderId.Sprofile
                                : notification.senderId.Cprofile;

                            return (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        className="h-6 w-6 rounded-full"
                                        src={
                                          senderProfile?.profilePicture || LOGO
                                        }
                                        alt=""
                                      />
                                      <span className="ml-2">
                                        {senderProfile?.name ||
                                          senderProfile?.companyName ||
                                          "Unknown"}
                                      </span>
                                    </div>
                                    <div>{notification.message}</div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(
                                        notification.createdAt
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu as="div" className="relative ml-3">
                    <div className="flex items-center">
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={profilePictureUrl}
                          alt=""
                        />
                      </Menu.Button>
                      <div className="ml-2 flex flex-col">
                        <h3 className="text-base font-semibold text-gray-600">
                          {userProfile.name || userProfile.companyName}
                        </h3>
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={
                                  item.name === "Sign out"
                                    ? handleSignOut
                                    : undefined
                                }
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-800 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={profilePictureUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-400">
                    {userProfile.name || userProfile.companyName}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  {hasUnreadNotifications && (
                    <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-2 -translate-y-1/2 bg-red-600 rounded-full" />
                  )}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    onClick={
                      item.name === "Sign out" ? handleSignOut : undefined
                    }
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-400 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
