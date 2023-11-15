import React from "react";
import "../../../styles/sidebar.css";

const SideBAr = ({ userName, setIsSideBarVisibe }) => {
  return (
    <div className="sidebar">
      <div className="flex justify-between py-4 items-center border-b-2 border-[#fff]">
        <div className="flex items-center">
          <div
            className={`flex justify-center items-center h-12 w-12 rounded-full bg-[#94A3B8]`}
          >
            <i
              className="fa-solid fa-user-tie text-3xl"
              // style={{ color: "#ffffff" }}
            ></i>
          </div>
          <h1 className="ml-2 text-lg text-[#475569]">{userName}</h1>
        </div>
        <div
          className="h-8 w-8 text-center bg-[#F1F5F9] rounded cursor-pointer hover:bg-[#CBD5E1]"
          onClick={() => setIsSideBarVisibe(false)}
        >
          {/* <i class="fa-solid fa-xmark mt-2" style={{color:'#94A3B8'}}></i> */}
          <h1 className="mt-0.5 text-lg text-[#94A3B8] hover:text-[#0F172A]">
            X
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SideBAr;