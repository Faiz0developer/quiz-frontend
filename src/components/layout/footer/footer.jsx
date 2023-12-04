import React from "react";

import myImg from "../../../assets/Q-removebg-preview.png";
import "../../../styles/footer.css";
import {
  FaCopyright,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-[#3f6c78] pt-3">
      <div className="top-container">
        <img src={myImg} alt="" width={100} />
        {/* <ul className="flex items-center mt-2.5 gap-4">
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
        </ul> */}
      </div>
      <div className="flex justify-center gap-10 pb-4 px-4 text-3xl">
        <FaTwitterSquare/>
        <FaLinkedin />
        <FaFacebook />
        <FaInstagramSquare />
      </div>
      <h1 className="text-center pt-4 bg-[#3f6c78] pb-2">
        Copyright &copy; 2023 Quizzle. All rights reserved.
      </h1>
      {/* <video
        src={myImg}
        width="80"
        // height="150"
        autoPlay
        muted
      /> */}
    </footer>
  );
};

export default Footer;
