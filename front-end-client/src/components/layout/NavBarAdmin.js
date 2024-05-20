import React from "react";
import { Link, Outlet } from "react-router-dom";
import TabLink from "./TabLink";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/auth/authSlice";

const NavBarAdmin = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-white items-center justify-around text-base ">
        <Link to="/">
          <img
            className="w-52 h-1/3 mt-3 -ml-14 hover:"
            src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715097915/new/logo_qbr1hv.png"
            alt=""
          />
        </Link>
        <div className="flex -ml-14">
        <TabLink to="/reception" labelContent="Order Reception"></TabLink>
          <TabLink to="/receiptment" labelContent="Received Items"></TabLink>
          <TabLink to="/assessment" labelContent="Assessment"></TabLink>
          <TabLink to="/accounting" labelContent="Accounting"></TabLink>
          <TabLink to="/report" labelContent="Report"></TabLink>   
        </div>

        <div className="flex">
          <Link
            to="/login"
            class="flex items-center p-2 px-6  hover:bg-green-500 rounded-md transition duration-300 mt-3"
            onClick={handleLogout}
          >
            <span>Admin</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-6 h-6 ml-2"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBarAdmin;
