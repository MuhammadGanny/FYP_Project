// import { Fragment } from 'react'
// import {
//   BriefcaseIcon,
//   CalendarIcon,
//   CheckIcon,
//   ChevronDownIcon,
//   CurrencyDollarIcon,
//   LinkIcon,
//   MapPinIcon,
//   PencilIcon,
// } from '@heroicons/react/20/solid'
// import { Menu, Transition } from '@headlessui/react'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
import Header from "../components/header"
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { SaveAll } from 'lucide-react';

export default function Profile() {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Implement your save logic here
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the edited text to the original value
    setEditedText("I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.");
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };
  return (
    <>
    <Header/>
    <div className="w-full h-full flex items-center justify-center">
    <div className="profile-page max-w-3/4 md:max-w-1/2 w-full h-full">
      <div className="profiel-wrap px-5% pb-10 md:pt-5% pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-1">
        <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-10% w-full z-1 rounded-t-lg"></div>
        <div className="profile-box flex-none md:text-start text-center">
          <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
            <div className="flex-none">
              <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                <img src="your-profile-image.jpg" alt="profile photo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-3px">
                <h2>Muhammad Bin Abdul Ganny</h2>
              </div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">Front End Developer</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
  <div className="max-w-[50%] mx-auto bg-white p-5 rounded-lg shadow-md">
    
    {/* <div className="card p-5 my-3">
      <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">About Me</div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        <p>
          I'm a passionate Front End Developer with a love for creating beautiful and user-friendly web interfaces. I have a strong background in web development, Java programming, and UI design.
        </p>
      </div>
    </div> */}


  
<div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">About Me</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
          
        </div>
      </div>
    </div>
  
{/*         
        <div className="card p-5 my-3">
          <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">Projects</div>
          <div className="card-content text-slate-600 dark:text-slate-400">
            <div class="project">
              <h3>Portfolio Website</h3>
              <p>A personal website showcasing my work and skills.</p>
              <a href="https://github.com/yourusername/portfolio-website">GitHub Repository</a>
            </div>
            <div class="project">
              <h3>Task Manager App</h3>
              <p>An app to manage tasks and to-do lists.</p>
              <a href="https://github.com/yourusername/task-manager-app">GitHub Repository</a>
            </div>
          </div>
        </div> */}

<div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">Projects</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
          
        </div>
      </div>
    </div>
       
    <div className="card p-5 my-3">
      <div className="flex items-center justify-between">
        <div className="card-title text-xl font-medium text-slate-900 dark:text-slate-200">Experience</div>
        <div className="cursor-pointer" onClick={handleToggleEdit}>
          {isEditing ? <SaveAll /> : <Pencil />  }
        </div>
      </div>
      <div className="card-content text-slate-600 dark:text-slate-400">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleInputChange}
            className="w-5/5 rounded-md border-1 py-4 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        ) : (
          <p>{editedText}</p>
        )}
        <div className="mt-2">
        </div>
      </div>
    </div>




      </div>
    </div>

    </div>
  </div>
  
  </>
  )
  }

// {/* <div className="lg:flex lg:items-center lg:justify-between">
// <div className="min-w-0 flex-1">
//   <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
//     Back End Developer
//   </h2>
//   <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
//     <div className="mt-2 flex items-center text-sm text-gray-500">
//       <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//       Full-time
//     </div>
//     <div className="mt-2 flex items-center text-sm text-gray-500">
//       <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//       Remote
//     </div>
//     <div className="mt-2 flex items-center text-sm text-gray-500">
//       <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//       $120k &ndash; $140k
//     </div>
//     <div className="mt-2 flex items-center text-sm text-gray-500">
//       <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
//       Closing on January 9, 2020
//     </div>
//   </div>
// </div>
// <div className="mt-5 flex lg:ml-4 lg:mt-0">
//   <span className="hidden sm:block">
//     <button
//       type="button"
//       className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//     >
//       <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
//       Edit
//     </button>
//   </span>

//   <span className="ml-3 hidden sm:block">
//     <button
//       type="button"
//       className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//     >
//       <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
//       View
//     </button>
//   </span>

//   <span className="sm:ml-3">
//     <button
//       type="button"
//       className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//     >
//       <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
//       Publish
//     </button>
//   </span>

//   {/* Dropdown */}
// //   <Menu as="div" className="relative ml-3 sm:hidden">
// //     <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
// //       More
// //       <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
// //     </Menu.Button>

// //     <Transition
// //       as={Fragment}
// //       enter="transition ease-out duration-200"
// //       enterFrom="transform opacity-0 scale-95"
// //       enterTo="transform opacity-100 scale-100"
// //       leave="transition ease-in duration-75"
// //       leaveFrom="transform opacity-100 scale-100"
// //       leaveTo="transform opacity-0 scale-95"
// //     >
// //       <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
// //         <Menu.Item>
// //           {({ active }) => (
// //             <a
// //               href="#"
// //               className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
// //             >
// //               Edit
// //             </a>
// //           )}
// //         </Menu.Item>
// //         <Menu.Item>
// //           {({ active }) => (
// //             <a
// //               href="#"
// //               className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
// //             >
// //               View
// //             </a>
// //           )}
// //         </Menu.Item>
// //       </Menu.Items>
// //     </Transition>
// //   </Menu>
// // </div>
// // </div> */}