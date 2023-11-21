import React, { useState } from "react";

import '../styles/EyeButton.css'

const EyeButton = ({placeholder,value,onChange,name,onFocus,onBlur}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  return (
    <div className="relative">
      <input
        type={isPasswordHidden ? "password" : "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`${isPasswordHidden ? "passwordHidden" : "passwordShow"}`}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        className="eyeball"
        type="button"
        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
      >
        <i
          className={
            isPasswordHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye "
          }
          style={{ color: isPasswordHidden ? "#94A3B8" : "#fff" }}
        ></i>
      </button>
      <div className={isPasswordHidden ? "" : "beam"}></div>
    </div>
  );
};

export default EyeButton;
