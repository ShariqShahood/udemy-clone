"use client"; // This directive must be at the top

import React, { useEffect } from 'react';
import 'animate.css';
import Navbar from '../components/Navbar';


// Helper function to add scroll animations
const addScrollAnimations = () => {
  const sections = document.querySelectorAll('.fade-in-section');
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
};

const About = () => {
  // Effect to handle animations on scroll
  useEffect(() => {
    addScrollAnimations();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="text-center p-8">
          <h1 className="text-5xl md:text-6xl font-bold animate__animated animate__fadeInDown">
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp">
            Learn. Grow. Succeed.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 fade-in-section">
        <h2 className="text-4xl font-bold text-center">Our Mission</h2>
        <p className="mt-6 text-lg text-center text-gray-700">
          At our learning platform, we aim to provide high-quality courses for everyone, from beginners to advanced learners.
          Our goal is to empower you with knowledge and skills to achieve your dreams.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
            <img src="/images/mission1.jpg" alt="Mission" className="w-100 " />
          </div>
          <div className="flex items-center justify-center p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
            <img src="/images/mission2.jpg" alt="Mission" className="w-100" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg mt-16 fade-in-section">
        <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
        <p className="mt-6 text-lg text-center text-gray-700">
          Our dedicated team of educators and developers is committed to providing the best learning experience.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {['Sameer Khan', 'Shariq Shahood', 'Adnan'].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              {/* <img src={`/images/team${index + 1}.jpg`} alt={member} className="w-full h-48 object-cover rounded-md" /> */}
              <img src={`/images/team${index + 1}.jpeg`} alt={member} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-4 text-2xl font-semibold text-center">{member}</h3>
              <p className="mt-2 text-center text-gray-600">FrontEnd Developer Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="flex items-center justify-center py-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-white mt-16 fade-in-section">
        <div className="text-center p-8">
          <h2 className="text-4xl font-bold animate__animated animate__pulse">
            Join Us Today!
          </h2>
          <p className="mt-4 text-lg">
            Start your learning journey with us and unlock your potential.
          </p>
          <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
