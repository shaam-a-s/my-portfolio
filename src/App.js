import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Linkedin, Github, BookOpen, Award, Code, Briefcase, User, GraduationCap } from 'lucide-react';

// Main App component
const App = () => {
  // Data extracted from the provided LaTeX resume
  const portfolioData = {
    name: "Shaam A S",
    tagline: "Aspiring Software Developer & Tech Enthusiast",
    about: "A passionate Information Technology student with a strong foundation in programming and a keen interest in developing innovative solutions. Eager to contribute to dynamic projects and continuously learn new technologies.",
    contact: {
      phone: "(+91) 9342708253",
      email: "shaam2310914@ssn.edu.in",
      linkedin: "https://www.linkedin.com/in/shaam-a-s/?profileId=ACoAAFvTJBUBOEZ4HVN1r7OWZgImEAE87SQIU-Q",
      github: "https://github.com/shaam-a-s",
    },
    education: [
      {
        institution: "Sri Sivasubramaniya Nadar College of Engineering, Chennai",
        period: "2023-2027",
        degree: "B.Tech Information Technology",
        details: "", // CGPA removed
      },
      {
        // Updated institution name and removed percentage
        institution: "Kingston Matric Hr Sec School, Vandavasi (Higher Secondary)",
        period: "2021-2023",
        details: "", // Percentage removed
      },
    ],
    skills: {
      programming: {
        advanced: ["Python", "SQL", "HTML", "CSS"],
        intermediate: ["Assembly", "Tkinter", "React"], // C and Java moved
        basics: ["C", "Java"], // New basics category
      },
      tools: ["Figma", "Git", "VS Code", "Arduino IDE"],
      softSkills: ["Problem Solving", "Team Collaboration", "Adaptability", "Communication", "Time Management"],
    },
    projects: [
      {
        title: "AI Health Consultor",
        date: "May 2025",
        technologies: "Python, Django, Pandas, React",
        codeLink: "https://github.com/shaam-a-s/symptom-checker-full-stack",
        description: [
          "Developed a smart web app that predicts potential diseases from symptom inputs, enabling 80% faster preliminary assessments compared to manual checks.",
          "Implemented and integrated ML-based logic to track 100% of patient histories and deliver real-time feedback with improved accuracy.",
        ],
        imageUrl: "https://placehold.co/600x350/E0E7FF/3F51B5?text=AI+Health+Consultor", // Placeholder image
      },
      {
        title: "Laundry Management System",
        date: "Feb 2024",
        technologies: "Python, Tkinter, CSV, JSON, PIL (Python Imaging Library)",
        codeLink: "https://github.com/shaam-a-s/laundrymanagement",
        description: [
          "Designed and deployed a desktop application for laundry services, handling 100+ customer records with secure login, order tracking, and email alerts.",
          "Optimized the UI using image handling and real-time status updates, increasing customer satisfaction by 30%.",
        ],
        imageUrl: "https://placehold.co/600x350/D1C4E9/673AB7?text=Laundry+Management", // Placeholder image
      },
      {
        title: "File Compression Web App",
        date: "Jan 2025",
        technologies: "Python, Flask, HTML/CSS, Huffman Encoding",
        codeLink: "https://github.com/shaam-a-s/filezipper",
        description: [
          "Engineered a web application to compress/decompress files using Huffman encoding, reducing file sizes by up to 60%.",
          "Integrated live file size comparison and download options, enhancing user interaction and transparency.",
        ],
        imageUrl: "https://placehold.co/600x350/C8E6C9/4CAF50?text=File+Compression", // Placeholder image
      },
      {
        title: "RFID Based Attendance System", // Moved to last
        date: "July 2025",
        technologies: "Arduino, RFID Reader, Embedded C/C++, LCD Module, Buzzer, ESP32, Arduino IDE, Radio-Frequency Identification (RFID)",
        codeLink: "https://github.com/shaam-a-s/RFID-Attendance-Tracker.git",
        description: [
          "Automated student/staff attendance using RFID tags and microcontroller integration.",
          "Uses RFID tags/cards for unique user identification.",
          "Auto-records attendance with date & time (EEPROM-based storage).",
          "LCD display and buzzer alert for real-time status feedback.",
          "Helps reduce manual errors and saves time.",
          "Built using Arduino Uno and MFRC522 RFID reader module."
        ],
        imageUrl: "https://placehold.co/600x350/FFCDD2/F44336?text=RFID+System", // Placeholder image
      },
    ],
    coursework: [
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Operating Systems",
      "Database Management Systems",
      "Design Patterns",
      "Data Communication and Networks",
      "Data Analytics and Visualisation",
    ],
    certifications: [
      {
        name: "NPTEL Course - Fuzzy Sets, Logic and Systems & Applications",
        link: "https://drive.google.com/file/d/16nBNCxsX0dDR-nuteOb8miE0v5yyX5gQ/view?usp=drive_link",
      },
      {
        name: "NPTEL Course - Programming in Java",
        link: "https://drive.google.com/file/d/194JlzL4zncckBJaR2dE2uxZBntjBRNTw/view?usp=drive_link",
      },
    ],
  };

  // Custom hook for fade-in animation on scroll
  const useIntersectionObserver = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]);

    return [ref, isVisible];
  };

  // Generic Section component with fade-in animation
  const Section = ({ title, icon: Icon, children, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
      <section
        ref={ref}
        className={`mb-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <h2 className="flex items-center text-3xl font-bold text-gray-800 border-b-2 border-purple-400 pb-3 mb-6">
          {Icon && <Icon className="mr-3 text-purple-600" size={28} />}
          {title}
        </h2>
        {children}
      </section>
    );
  };

  // Component for displaying project details with fade-in and enhanced hover
  const ProjectCard = ({ project, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
      <div
        ref={ref}
        className={`mb-6 p-6 bg-white rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out cursor-pointer
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={`${project.title} project image`}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
            // Fallback for image loading errors
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x350/CCCCCC/666666?text=Image+Not+Found"; }}
          />
        )}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-indigo-700">{project.title}</h3>
          <span className="text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full animate-pulse-slow">
            {project.date}
          </span>
        </div>
        <p className="text-gray-700 mb-3 text-sm">
          <span className="font-medium text-gray-800">Technologies:</span>{" "}
          {project.technologies}
        </p>
        {project.codeLink && (
          <p className="text-gray-700 mb-3 text-sm">
            <span className="font-medium text-gray-800">Code:</span>{" "}
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline flex items-center group"
            >
              GitHub
              <Github className="ml-1 text-indigo-500 group-hover:text-indigo-700 transition-colors duration-200" size={16} />
            </a>
          </p>
        )}
        <ul className="list-disc list-inside text-gray-800 space-y-2 text-base">
          {project.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-inter p-4 sm:p-8 relative overflow-hidden">
      {/* Background circles for visual flair */}
      <div className="absolute top-10 left-1/4 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        `}
      </style>

      <div className="relative z-10 max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-12 border border-purple-300">
        {/* Header Section */}
        <header className="text-center mb-12 pb-6 border-b-2 border-indigo-400 animate-fade-in-down">
          <div className="mb-4">
            {/* Profile Picture */}
            <img
              src="https://placehold.co/128x128/8B5CF6/FFFFFF?text=Your+Photo" // Placeholder for profile pic
              alt="Shaam A S Profile"
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
              // Fallback for image loading errors
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/CCCCCC/666666?text=Photo+Error"; }}
            />
            {/* Instructions for user to replace photo */}
            <p className="text-xs text-gray-500 mt-2">
              Replace "https://placehold.co/128x128/8B5CF6/FFFFFF?text=Your+Photo" with your actual photo URL.
            </p>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 leading-tight animate-fade-in-up">
            {portfolioData.name}
          </h1>
          <p className="text-xl text-indigo-600 font-medium mb-6 animate-fade-in-up delay-200">
            {portfolioData.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-700 text-base sm:text-lg">
            <a
              href={`tel:${portfolioData.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center hover:text-indigo-700 transition-colors duration-200 group transform hover:scale-105"
            >
              <Phone className="mr-2 text-purple-500 group-hover:text-indigo-700 transition-colors duration-200" size={20} />
              {portfolioData.contact.phone}
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="flex items-center hover:text-indigo-700 transition-colors duration-200 group transform hover:scale-105"
            >
              <Mail className="mr-2 text-purple-500 group-hover:text-indigo-700 transition-colors duration-200" size={20} />
              {portfolioData.contact.email}
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-indigo-700 transition-colors duration-200 group transform hover:scale-105"
            >
              <Linkedin className="mr-2 text-purple-500 group-hover:text-indigo-700 transition-colors duration-200" size={20} />
              LinkedIn
            </a>
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-indigo-700 transition-colors duration-200 group transform hover:scale-105"
            >
              <Github className="mr-2 text-purple-500 group-hover:text-indigo-700 transition-colors duration-200" size={20} />
              GitHub
            </a>
          </div>
        </header>

        {/* About Me Section */}
        <Section title="About Me" icon={User} delay={100}>
          <p className="text-lg text-gray-800 leading-relaxed">
            {portfolioData.about}
          </p>
        </Section>

        {/* Education Section */}
        <Section title="Education" icon={GraduationCap} delay={200}>
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="mb-5 p-4 bg-indigo-50 rounded-lg border border-indigo-200 shadow-md transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {edu.institution}
                </h3>
                <span className="text-sm text-gray-600 font-medium">{edu.period}</span>
              </div>
              <p className="text-lg text-indigo-700 font-medium">{edu.degree}</p>
              <p className="text-base text-gray-700">{edu.details}</p>
            </div>
          ))}
        </Section>

        {/* Skills Section */}
        <Section title="Skills" icon={Code} delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
            <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
              <h4 className="font-bold text-lg text-green-700 mb-2">Programming</h4>
              <p className="mb-1">
                <span className="font-semibold text-green-800">Advanced:</span>{" "}
                {portfolioData.skills.programming.advanced.join(", ")}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-green-800">Intermediate:</span>{" "}
                {portfolioData.skills.programming.intermediate.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-green-800">Basics:</span>{" "}
                {portfolioData.skills.programming.basics.join(", ")}
              </p>
            </div>
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
              <h4 className="font-bold text-lg text-yellow-700 mb-2">
                Tools/Technologies
              </h4>
              <p>{portfolioData.skills.tools.join(", ")}</p>
            </div>
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
              <h4 className="font-bold text-lg text-purple-700 mb-2">Soft Skills</h4>
              <p>{portfolioData.skills.softSkills.join(", ")}</p>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section title="Projects" icon={Briefcase} delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} delay={index * 100} />
            ))}
          </div>
        </Section>

        {/* Coursework Section */}
        <Section title="Coursework" icon={BookOpen} delay={500}>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
            {portfolioData.coursework.map((course, index) => (
              <li key={index} className="hover:text-indigo-700 transition-colors duration-200 transform hover:translate-x-1">{course}</li>
            ))}
          </ul>
        </Section>

        {/* Certifications Section */}
        <Section title="Certifications" icon={Award} delay={600}>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
            {portfolioData.certifications.map((cert, index) => (
              <li key={index}>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium flex items-center group transform hover:translate-x-1"
                >
                  {cert.name}
                  <svg className="ml-2 w-4 h-4 text-indigo-500 group-hover:text-indigo-700 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* Footer */}
        <footer className="text-center mt-12 pt-6 border-t-2 border-gray-200 text-gray-600 text-sm animate-fade-in-up delay-700">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
