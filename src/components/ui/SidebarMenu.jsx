import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const SidebarMenu = ({icon ,heading, subHeading, onClickHandler }) => {
  return (
    <div
      className="flex justify-between items-center bg-[#1E293B] py-2 px-3.5 cursor-pointer hover:bg-[#0F172A]"
      onClick={onClickHandler}
    >
      {icon}
      <div className="flex flex-col w-[75%]">
        <h1 className="text-[#fff]">{heading}</h1>
        <span className="text-[#94A3B8] text-sm">{subHeading}</span>
      </div>
      <IoIosArrowForward className="text-[#94A3B8]" />
    </div>
  );
};

export default SidebarMenu;
