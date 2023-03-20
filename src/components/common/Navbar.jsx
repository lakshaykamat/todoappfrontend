import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-gray-800 p-2 px-6 flex flex-wrap items-center justify-between">
      <div className="flex items-center">
        <a href="#" className="text-white font-bold text-xl">Todo</a>
      </div>
      <button className="flex items-center px-3 py-2 text-gray-300 hover:text-white rounded focus:outline-none md:hidden" onClick={toggleMenu}>
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
        </svg>
      </button>
      <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className="text-sm md:flex-grow">
          <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white mr-4">Home</a>
          <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white mr-4">About</a>
          <a href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
