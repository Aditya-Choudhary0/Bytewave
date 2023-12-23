import { Link } from "react-router-dom";
import React from "react";

// Import CSS or use a CSS-in-JS solution for styling

const Navbar: React.FC = () => {
  // Retrieve user's name from localStorage
  const name = localStorage.getItem('name');

  return (
    <div className="bg-[#1A2027] p-3 flex justify-between items-center text-white h-[10vh]">
      {/* Logo and Navigation */}
      <div className="w-[30%] flex justify-start items-center">
        <Link to="/">
          <img className="w-[20%] rounded-full" src="https://www.shutterstock.com/image-vector/job-search-logo-design-element-260nw-602927786.jpg" alt="logo" />
        </Link>
        <div className="ml-4">
          <Link to="/dashboard" className="nav-link hover:text-gray-400 p-1 text-md">
            Dashboard
          </Link>
          {/* <Link to="/interview" className="nav-link hover:text-gray-400 p-1 text-md">
            Practice
          </Link> */}
        </div>
      </div>


      <div className="flex items-center">
        {name && <h2 className="text-md font-bold text-white mr-2">{name}</h2>}
        <img className="w-[20%] rounded-full" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w43yim49sbekdqbhkvz6.png" alt="user" />
      </div>
    </div>
  );
};

export default Navbar;





// "https://www.shutterstock.com/image-vector/job-search-logo-design-element-260nw-602927786.jpg"
//"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w43yim49sbekdqbhkvz6.png"