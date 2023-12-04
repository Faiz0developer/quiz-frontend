import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const SidebarMenu = ({icon ,heading, subHeading, onClickHandler }) => {
  return (
    <div
      className="sidebar-menu hover:bg-[#0F172A]"
      onClick={onClickHandler}
    >
      {icon}
      <div className="flex flex-col w-[75%]">
        <h1 className="text-[#0F172A]">{heading}</h1>
        <span className="text-[#334155] text-sm">{subHeading}</span>
      </div>
      <IoIosArrowForward className="text-[#334155]" />
    </div>
  );
};

export default SidebarMenu;
