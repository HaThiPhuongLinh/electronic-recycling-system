import React from "react";
import { NavLink } from "react-router-dom";

const TabLink = (props) => {
  return (
    <NavLink
      to={props.to}
      end
      className={({ isActive }) =>
        (isActive ? "font-bold text-gray-950" : "text-gray-500") +
        " flex justify-center items-center px-7 py-2 mt-3 hover:text-gray-950"
      }
    >
      <span>{props.labelContent}</span>
    </NavLink>
  );
};

export default TabLink;