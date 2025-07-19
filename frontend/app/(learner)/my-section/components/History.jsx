import React from 'react'
import VideosRibbon from './VideosRibbon'
export const videoData = [
  {
    id: 1,
    title: "Python for Data Science",
    instructor: "Dr. Michael Chen",
    role: "Data Scientist at Microsoft",
    thumbnail: "/video-tutorial.png",
    tags: ["Python", "Data Science", "NumPy", "Pandas"],
    points: [
      "Python programming fundamentals",
      "Data manipulation with Pandas",
      "Statistical analysis techniques",
      "Data visualization with Matplotlib",
      "Machine learning basics",
    ],
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    instructor: "Sarah Johnson",
    role: "Full Stack Developer at Google",
    thumbnail: "/video-tutorial.png",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    points: [
      "Build responsive web pages",
      "Master HTML5 and CSS3",
      "Interactive websites using JavaScript",
      "Front-end with React",
      "Project-based learning",
    ],
  },
  {
    id: 3,
    title: "Intro to Machine Learning",
    instructor: "Ankit Sharma",
    role: "ML Engineer at Amazon",
    thumbnail: "/video-tutorial.png",
    tags: ["Machine Learning", "Scikit-learn", "Python"],
    points: [
      "Understand supervised and unsupervised learning",
      "Build models with scikit-learn",
      "Cross-validation techniques",
      "Model evaluation metrics",
      "Hands-on mini projects",
    ],
  },
  {
    id: 4,
    title: "Java Programming Mastery",
    instructor: "Priya Desai",
    role: "Software Engineer at Oracle",
    thumbnail: "/video-tutorial.png",
    tags: ["Java", "OOP", "Data Structures"],
    points: [
      "Java syntax and core concepts",
      "Object-oriented programming",
      "Working with collections",
      "File I/O and exceptions",
      "Building CLI applications",
    ],
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Kim",
    role: "Product Designer at Adobe",
    thumbnail: "/video-tutorial.png",
    tags: ["UI Design", "UX Research", "Figma"],
    points: [
      "Design principles and user psychology",
      "Wireframing and prototyping",
      "User research and testing",
      "Working with Figma",
      "Building responsive layouts",
    ],
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    instructor: "Rohit Mehta",
    role: "Security Analyst at Cisco",
    thumbnail: "/video-tutorial.png",
    tags: ["Cybersecurity", "Networking", "Linux"],
    points: [
      "Cybersecurity fundamentals",
      "Threats, vulnerabilities, and risks",
      "Basics of networking and firewalls",
      "Linux commands for security",
      "Ethical hacking introduction",
    ],
  },
  {
    id: 7,
    title: "Data Structures & Algorithms",
    instructor: "Megha Nair",
    role: "SDE at Flipkart",
    thumbnail: "/video-tutorial.png",
    tags: ["DSA", "C++", "Coding Interviews"],
    points: [
      "Arrays, Linked Lists, Stacks, Queues",
      "Trees, Graphs, and Hashing",
      "Sorting and searching algorithms",
      "Recursion and dynamic programming",
      "Mock interview problems",
    ],
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    instructor: "Dev Patel",
    role: "Cloud Engineer at AWS",
    thumbnail: "/video-tutorial.png",
    tags: ["AWS", "Cloud", "DevOps"],
    points: [
      "Introduction to cloud computing",
      "AWS services (EC2, S3, RDS)",
      "IAM roles and security",
      "Deploying apps in the cloud",
      "Monitoring and scaling",
    ],
  },
  {
    id: 9,
    title: "Database Management Systems",
    instructor: "Neha Reddy",
    role: "DBA at Infosys",
    thumbnail: "/video-tutorial.png",
    tags: ["SQL", "MySQL", "Database"],
    points: [
      "Database concepts and ER diagrams",
      "SQL queries and Joins",
      "Normalization and indexing",
      "Transactions and concurrency",
      "Hands-on with MySQL",
    ],
  },
];


function History() {
  return (
    <div>
        <VideosRibbon videoData={videoData} />
    </div>
  )
}

export default History
