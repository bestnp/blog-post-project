import React from "react";


const NavBar = () => {
  return (
    <nav className="bg-white flex justify-between items-center px-8 py-4 border-b">
      <div className="text-xl font-semibold text-gray-500">
        <img
        src = "src/logo/logo.svg"
        alt="logo"
        />
      </div>
      <div className="space-x-2 flex">
        <button className="h-10 px-6 rounded-full border border-gray-400 bg-white text-black shadow-sm">
          Log in
        </button>
        <button className="h-10 px-6 rounded-full bg-black text-white shadow-sm">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
