import React from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
// import Header from "../components/layout/header/Header";
// import Footer from "../components/layout/footer/footer";
// import myImg from "../assets/quiz4.mp4";

import "../../styles/home.css";
// import { useNavigate } from "react-router-dom";
import Hero from "../../components/home/Hero";
import AllPublishQuizSection from "../../components/home/AllPublishQuizSection";

const HomePage = () => {
  // const token = useSelector(state => state.token.token)
  return (
    <div className="pb-10 relative">
      <Hero />
      <AllPublishQuizSection/>
      {/* <div className="create-quiz">
        <div>
          <h1>Create your very own Quiz</h1>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
