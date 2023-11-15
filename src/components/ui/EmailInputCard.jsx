import axios from "axios";
import React, { useState } from "react";
import { GiThink } from "react-icons/gi";

const EmailInputCard = () => {
  const [email, setEmail] = useState("");

  const userEmail = {
    email,
  };

  const forgotPasswrodHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3002/auth/forgotpassword",
        userEmail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#155E75] flex justify-center items-center ">
      <div className="px-4 text-[#fff] py-28 w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[35%]">
        <div className="flex justify-center mb-10">
          <GiThink className="text-[100px]" />
        </div>
        <div className="p-2 mt-4">
          <h1 className="text-center text-2xl min-[500px]:text-3xl mb-3">
            Forgot your password
          </h1>
          <p className="text-center ">
            Please enter email address you'd like your password reset
            information sent to
          </p>
        </div>

        <div className="inputs flex flex-col gap-6 py-6 ">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="relative flex justify-center mt-8">
          <button className={`btn w-full`} onClick={forgotPasswrodHandler}>
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailInputCard;
