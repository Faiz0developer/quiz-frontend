import React from "react";

import img from "../assets/quizLogo.png";
import "../styles/ChangePassword.css";
import ChangePassword from "../components/change-password/ChangePassword";

const ChangePasswordPage = () => {
  
  return (
    <div className="password-container">
      <div className="bg-[#155E75] px-5">
        <img src={img} alt="" width={80} />
      </div>
      <ChangePassword/>
    </div>
  );
};

export default ChangePasswordPage;
