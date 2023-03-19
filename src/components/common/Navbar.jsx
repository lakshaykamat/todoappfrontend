import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdNightlightRound } from "react-icons/md";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-300 text-gray-800"
      }`}
    >
      <div className="flex items-center flex-shrink-0 mr-6">
        <a
          href="/"
          className={`font-bold text-xl ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Todo List
        </a>
      </div>
      <div className="block lg:hidden">
        {/* <button
          className={`flex items-center px-3 py-2 border rounded ${
            isDarkMode
              ? "border-white text-white"
              : "border-gray-800 text-gray-800"
          } hover:text-gray-900 hover:border-gray-900 focus:outline-none`}
          onClick={toggleDarkMode}
        >
          <svg
            className={`fill-current h-3 w-3 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Dark Mode</title>
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </button> */}
        <button
          className={`ml-2 inline-flex items-center justify-center p-2 rounded-md ${
            isDarkMode ? "text-white bg-gray-900" : "text-gray-800 bg-white"
          } hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
          onClick={toggleMenu}
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`lg:flex    ${
          isOpen ? "" : "hidden"
        } `}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            } hover:text-gray-100`}
          >
            Home
          </a>
          <a
            href="/about"
            className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            } hover:text-gray-900`}
          >
            About
          </a>
          <a
            href="/contact"
            className={`block mt-4 lg:inline-block lg:mt-0 ${
              isDarkMode ? "text-white" : "text-gray-800"
            } hover:text-gray-900`}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
