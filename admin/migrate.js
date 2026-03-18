import { v2 as cloudinary } from 'cloudinary';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, addDoc, collection, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

cloudinary.config({
  cloud_name: 'dpvab3v9f',
  api_key: '915544357637558',
  api_secret: 'eQR7z9rrUXMTa2qjvScLyUdZrp4'
});

const firebaseConfig = {
  apiKey: "AIzaSyBpT7bdQ_t9ANjheg9IklI18LEgBMmJuSU",
  authDomain: "portfolio-6647d.firebaseapp.com",
  projectId: "portfolio-6647d",
  storageBucket: "portfolio-6647d.firebasestorage.app",
  messagingSenderId: "305986669481",
  appId: "1:305986669481:web:3d606c719580d11a19d2b8",
  measurementId: "G-JKY097D1BX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_DIR = path.join(process.cwd(), '..', 'public');

async function uploadToCloudinary(filePath) {
  try {
    const fullPath = path.join(BASE_DIR, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return filePath; // return original if not found
    }

    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'portfolio',
      resource_type: 'auto'
    });
    console.log(`Uploaded ${filePath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
    return filePath;
  }
}

async function migrate() {
  console.log('Starting Migration...');

  // 1. General Settings
  console.log('Migrating General Settings...');
  const heroImage = await uploadToCloudinary('/images/home.png');
  const generalData = {
    heroImage,
    name: 'Arya Sharma',
    tagline: 'MTech (IT) Student | Backend Developer | MERN Stack Intern',
    tag1: 'Software Developer',
    tag2: 'Web Developer',
    tag3: 'Project Manager',
    tag4: 'Database Engineer',
    socialLinks: [
      { id: 1, platform: 'GitHub', icon: 'bx bxl-github', url: 'https://github.com/arya-5990' },
      { id: 2, platform: 'LinkedIn', icon: 'bx bxl-linkedin', url: 'https://www.linkedin.com/in/arya-sharma-1963b030a/' }
    ]
  };
  await setDoc(doc(db, 'portfolio', 'general'), generalData);

  // 2. About Me
  console.log('Migrating About Me...');
  const aboutData = {
    heading: 'About Me',
    subheading: 'MTech (Information Technology) Student | Backend & Full-Stack Developer',
    description1: 'I am an MTech (Information Technology) student at IIPS, DAVV, Indore, with hands-on experience in backend and full-stack web development through multiple industry internships. I have worked on building RESTful APIs using Node.js and Express, implementing authentication with Firebase, and managing databases using MongoDB and Firestore.',
    description2: 'My experience spans MERN and MEAN stacks, where I collaborated closely with frontend teams to deliver secure, scalable, and performance-oriented applications. Alongside development, I have a strong foundation in Data Structures and Algorithms and enjoy applying problem-solving skills to real-world projects.',
    description3: 'I actively participate in hackathons and tech communities to continuously improve my technical and communication skills. Currently, I am focused on backend development, scalable system design, and growing my expertise in modern web technologies.'
  };
  await setDoc(doc(db, 'portfolio', 'about'), aboutData);

  // 3. Contact
  console.log('Migrating Contact...');
  const contactData = {
    email: 'aryasha4906c@gmail.com',
    phone: '+91 7049780160',
    linkedin: 'Arya Sharma',
    linkedinLink: 'https://www.linkedin.com/in/arya-sharma-1963b030a/'
  };
  await setDoc(doc(db, 'portfolio', 'contact'), contactData);

  // 4. Skills
  console.log('Migrating Skills...');
  const skillsList = [
    { id: 1, name: 'C', icon: 'bx bx-code' },
    { id: 2, name: 'C++', icon: 'bx bx-code-alt' },
    { id: 3, name: 'Java', icon: 'bx bxl-java' },
    { id: 4, name: 'Python', icon: 'bx bxl-python' },
    { id: 5, name: 'HTML', icon: 'bx bxl-html5' },
    { id: 6, name: 'CSS', icon: 'bx bxl-css3' },
    { id: 7, name: 'JavaScript', icon: 'bx bxl-javascript' },
    { id: 8, name: 'jQuery', icon: 'bx bxl-jquery' },
    { id: 9, name: 'MySQL', icon: 'bx bx-data' },
    { id: 10, name: 'Firebase', icon: 'bx bxl-firebase' },
    { id: 11, name: 'MongoDB', icon: 'bx bxl-mongodb' },
    { id: 12, name: 'Data Structures', icon: 'bx bx-data' },
    { id: 13, name: 'Algorithms', icon: 'bx bx-brain' },
    { id: 14, name: 'MERN Stack', icon: 'bx bx-layer' },
    { id: 15, name: 'MEAN Stack', icon: 'bx bx-layer' },
    { id: 16, name: 'PHP', icon: 'bx bxl-php' },
    { id: 17, name: 'Laravel', icon: 'bx bxl-php' },
    { id: 18, name: 'Project Management', icon: 'bx bx-briefcase-alt' }
  ];
  await setDoc(doc(db, 'portfolio', 'skills'), { data: skillsList });

  // 5. Experience
  console.log('Migrating Experience...');
  const experiences = [
    {
      id: 1,
      name: 'Mittal Alliance Industries Private Limited',
      logoOriginal: '/images/mittal.png',
      position: 'Back End Developer',
      dates: 'May 2025 - June 2025 & August 2025 - September 2025 · Remote',
      description: '• Designed and developed RESTful APIs using Node.js and Express.js\n• Implemented authentication and user management using Firebase Authentication\n• Integrated MongoDB and Firestore for efficient data storage\n• Collaborated with frontend teams to ensure seamless API integration and smooth data flow\n• Managed databases, authentication, and server deployments\n• Optimized application performance, ensured data security, and improved backend reliability'
    },
    {
      id: 2,
      name: 'Calanjiyam Consultancies and Technologies (Junior Dev)',
      logoOriginal: '/images/calanjiyam_logo.jpeg',
      position: 'Junior Assistant Developer',
      dates: 'Apr 2025 - Jul 2025 · 4 mos · Remote',
      description: '• Took increased responsibility in real client projects\n• Supported backend logic and API integration\n• Worked closely with senior developers to improve code quality and application performance'
    },
    {
      id: 3,
      name: 'Calanjiyam Consultancies and Technologies (Intern)',
      logoOriginal: '/images/calanjiyam_logo.jpeg',
      position: 'Web Development Intern',
      dates: 'Feb 2025 - Apr 2025 · 3 mos · Remote',
      description: '• Worked on full-stack web development using HTML, CSS, JavaScript, and backend technologies\n• Assisted in building and optimizing dynamic web applications\n• Debugged, tested, and enhanced existing features\n• Collaborated with team members to deliver client-focused solutions'
    }
  ];
  for (let exp of experiences) {
    if (exp.logoOriginal) {
      exp.logo = await uploadToCloudinary(exp.logoOriginal);
      delete exp.logoOriginal;
    }
  }
  await setDoc(doc(db, 'portfolio', 'experiences'), { data: experiences });

  // 6. Projects
  console.log('Migrating Projects...');
  const projects = [
    {
      id: 1,
      title: 'ChatSphere',
      imageOriginal: '/images/chatsphere 1.jpeg',
      description: 'A secure real-time chat app built with React Native, Expo, Firebase, and Cloudinary. Features instant messaging with read receipts, voice notes, media sharing, secure authentication, and a sleek, responsive UI with dark/light mode. Production-ready with strong security and data protection.',
      link: 'https://github.com/arya-5990/ChatSphere'
    },
    {
      id: 2,
      title: 'Cloud Data Hub',
      imageOriginal: '/images/clouddatahub.png',
      description: 'A comprehensive employee management system for chartered accountant firms. Developed during internship at Mittal Alliance Industries. Solely responsible for building the entire backend from scratch to production level. Currently working perfectly in production.',
      link: 'https://www.cloudatahub.com/'
    },
    {
      id: 3,
      title: 'Lotus Education Platform',
      imageOriginal: '/images/lotus.png',
      description: 'An online education platform with course management, video content, and community support. Developed during internship at Calanjiyam Consultancies and Technologies.',
      link: 'https://lotuseducation.tech/'
    },
    {
      id: 4,
      title: 'Shree Sainath Packaging',
      imageOriginal: '/images/portfolio2.png',
      description: 'Took an offline packaging company digital with this project.',
      link: 'https://shreesainathpackeging.netlify.app/'
    },
    {
      id: 5,
      title: 'Ai Powered ChatBot',
      imageOriginal: '/images/portfolio3.png',
      description: 'An Ai powered chatbot project using python and chatterbot library.',
      link: 'https://github.com/arya-5990/Chatbot.git'
    },
    {
      id: 6,
      title: 'Bruno Speaks',
      imageOriginal: '/images/bruno.png',
      description: 'A blogging website with admin panel for blog management. Developed during internship at Mittal Alliance Industries. My main contribution was implementing backend logic and database schema design.',
      link: 'https://brunospeaks.com/'
    }
  ];
  for (let proj of projects) {
    if (proj.imageOriginal) {
      proj.image = await uploadToCloudinary(proj.imageOriginal);
      delete proj.imageOriginal;
    }
  }
  await setDoc(doc(db, 'portfolio', 'projects'), { data: projects });

  // 7. Certifications
  console.log('Migrating Certifications...');
  const certifications = [
    {
      id: 1,
      title: 'Junior Assistant Developer',
      issuer: 'Calanjiyam Consultancies',
      logoOriginal: '/images/calanjiyam_logo.jpeg',
      fileOriginal: '/certificates/Arya Sharma JAD Certificate - Calanjiyam.pdf'
    },
    {
      id: 2,
      title: 'Letter of Recommendation',
      issuer: 'Calanjiyam Consultancies',
      logoOriginal: '/images/calanjiyam_logo.jpeg',
      fileOriginal: '/certificates/Arya Sharma -  Letter of RecommendationCalanjiyam.pdf'
    },
    {
      id: 3,
      title: 'Completion Letter',
      issuer: 'Mittal Alliance Industries',
      logoOriginal: '/images/mittal.png',
      fileOriginal: '/certificates/Arya Sharma Completion letter(mittal).pdf'
    },
    {
      id: 4,
      title: 'Letter of Recommendation',
      issuer: 'Mittal Alliance Industries',
      logoOriginal: '/images/mittal.png',
      fileOriginal: '/certificates/Arya Sharma Letter Of Recommentation(mittal).pdf'
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms',
      issuer: 'Coursera',
      logoOriginal: '/images/Coursera-Logo_600x600.svg.png',
      fileOriginal: '/certificates/Coursera DSA.pdf'
    },
    {
      id: 6,
      title: 'Fluxus Hackathon',
      issuer: 'Participation Certificate',
      logoOriginal: '/images/IITINDORE.png',
      fileOriginal: '/certificates/FLUXUS HACKATHON.pdf'
    }
  ];

  for (let cert of certifications) {
    if (cert.logoOriginal) {
      cert.logo = await uploadToCloudinary(cert.logoOriginal);
      delete cert.logoOriginal;
    }
    if (cert.fileOriginal) {
      cert.file = await uploadToCloudinary(cert.fileOriginal);
      delete cert.fileOriginal;
    }
  }
  await setDoc(doc(db, 'portfolio', 'certifications'), { data: certifications });
  
  console.log('Migration Completed Successfully!');
  process.exit(0);
}

migrate().catch(console.error);
