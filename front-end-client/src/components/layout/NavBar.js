import React from "react";
import { Link, Outlet } from "react-router-dom";
import TabLink from "./TabLink";

const NavBar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex bg-white items-center justify-around text-base ">
        <Link to="/"><img className="w-52 h-1/3 mt-3 -ml-14 hover:" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715097915/new/logo_qbr1hv.png" alt="" /></Link>
        <div className="flex -ml-14">
          <TabLink to="/" labelContent="Home"></TabLink>
          <TabLink to="/sell" labelContent="Sell"></TabLink>
          <TabLink to="/about" labelContent="About"></TabLink>
          <TabLink to="/faqs" labelContent="FAQs"></TabLink>
        </div>
        <Link to="/login" class="flex items-center p-2 px-6 bg-green-600 bg-opacity-40 hover:bg-green-500 rounded-md transition duration-300 mt-3">
          <span>Login</span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};


export default NavBar;
