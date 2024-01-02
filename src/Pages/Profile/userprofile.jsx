import React from 'react';
import { Avatar, Card, Container } from '@material-tailwind/react';




// const user = {
//   picture: 'https://example.com/profile-picture.jpg',
//   name: 'John Doe',
//   profession: 'Software Engineer',
//   university: 'Stanford University',
//   aboutMe: 'I am a software engineer with a passion for building innovative products',
//   education: [
//     {
//       id: 1,
//       name: 'Bachelor of Science in Computer Science',
//     },
//   ],
//   skills: [
//     {
//       id: 1,
//       name: 'React',
//     },
//     {
//       id: 2,
//       name: 'Node.js',
//     },
//   ],
//   projects: [
//     {
//       id: 1,
//       title: 'My Portfolio Website',
//       link: 'https://example.com/portfolio',
//       picture: 'https://example.com/portfolio-screenshot.jpg',
//       description: 'This is my personal portfolio website.',
//     },
//   ],
//   experience: [
//     {
//       id: 1,
//       title: 'Software Engineer Intern',
//       company: 'Google',
//       description: 'I worked on the development of a new machine learning algorithm.',
//     },
//   ],
// };

  
//   <UserProfile user={user} />
  
// export default function UserProfile ({ user }) {
export default function UserProfile () {
  // const { picture, name, profession, university, aboutMe, education, skills, projects, experience } = user;

  return (
    <Container>
      <Card>
        <div className="flex items-center">
          <Avatar src=''  />
          <div className="ml-4">
            <h3 className="text-lg font-medium">name</h3>
            <p className="text-sm text-gray-500"> professipon</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-medium">About Me</h4>
          <p className="text-sm">kjbkjbakdbkadvbjkdvbakdvb</p>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-medium">Education</h4>
          <ul className="list-none">list education
            {/* {education.map((item) => (
              <li key={item.id} className="text-sm">
                {item.name}
              </li>
            ))} */}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-medium">Skills</h4>
          <ul className="list-none">list skills 
            {/* {skills.map((item) => (
              <li key={item.id} className="text-sm">
                {item.name}
              </li>
            ))} */}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-medium">Projects</h4>
          <ul className="list-none">list ptojects 
            {/* {projects.map((item) => (
              <li key={item.id} className="text-sm">
                <a href={item.link}>
                  {item.title}
                </a>
                <img src={item.picture} alt={item.title} />
                <p className="text-sm">{item.description}</p>
              </li>
            ))} */}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-medium">Experience</h4>
          <ul className="list-none"> list experience
            {/* {experience.map((item) => (
              <li key={item.id} className="text-sm">
                {item.title}
                <p className="text-sm">{item.company}</p>
                <p className="text-sm">{item.description}</p>
              </li>
            ))} */}
          </ul>
        </div>
      </Card>
    </Container>
  );
};

// export default UserProfile;
