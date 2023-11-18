import React, { useState } from "react";

const ChangePasswordInput = ({ placeholder,name,value,onChange }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  return (
    <div className="relative">
      <input
        type={isPasswordHidden ? "password" : "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`option-input inputFocus w-full`}
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
          style={{ color: "#64748B" }}
        ></i>
      </button>
    </div>
  );
};

export default ChangePasswordInput;
