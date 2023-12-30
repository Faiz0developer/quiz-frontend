import React from "react";

const Hero = () => {
  return (
    <div className="hero h-[55vh] font-[sans-serif]">
      {/* <div className="hero-left-content w-full  font-semibold"> */}
        <h1 className="text-5xl lg:text-6xl uppercase pt-2 pb-3 tracking-wider font-semibold text-[#fff] text-center">
          Quiz!
        </h1>
        <h2 className="text-5xl lg:text-6xl py-2 uppercase tracking-wider font-semibold text-[#fff] text-center">
          Take it or Create it
        </h2>
        <p className="py-2 text-xl text-[#D97706] tracking-[4px] font-bold text-center">
          Find your path to wellness
        </p>
      {/* </div> */}
      {/* <div className="hero-right-content w-1/2 lg:w-[40%]">
        <img
          src="https://cdn.pixabay.com/photo/2018/09/18/17/27/questions-3686724_640.png"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Hero;
