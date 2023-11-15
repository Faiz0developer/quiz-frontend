import React from "react";
import { useSelector } from "react-redux";
// import Header from "../components/layout/header/Header";
// import Footer from "../components/layout/footer/footer";
// import myImg from "../assets/quiz4.mp4";

const HomePage = () => {
  const userName = useSelector(state => state.token.name)
  return (
    <div className="">
      <h1>{userName}</h1>
      {/* <Header/> */}
      {/* <video
        src={myImg}
        width="100"
        // height="150"
        autoPlay
        muted
      /> */}
      {/* <Footer/> */}
    </div>
  );
};

export default HomePage;
