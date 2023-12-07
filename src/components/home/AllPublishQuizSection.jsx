import React from "react";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllPublishQuizSection = () => {
  const navigate = useNavigate();
  const allPublishedQuiz = useSelector(
    (state) => state.allPublishedQuiz.publishedQuiz
  );
  
  return (
    <div className="all-quiz-container">
      <div>
        <h1 className="text-center text-5xl font-medium text-[#8d2214] font-[sans-serif]">Quizzes</h1>
        <p className="text-center text-2xl py-2 text-[#b64c3e] font-[sans] tracking-wider">
          Take the <span className="text-[#e7a599]">Quiz</span> of your{" "}
          <span className="text-[#e7a599]">choice</span>
        </p>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={5000}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="item-class"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        // responsive={responsive}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={true}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {allPublishedQuiz.map((publishQuiz) => {
          return (
            <div className="card" key={publishQuiz._id}>
              <h1 className=" text-lg sm:text-xl text-[#701A75]">
                {publishQuiz.name}
              </h1>
              <h1 className="text-[#0F172A]">{publishQuiz.category}</h1>
            </div>
          );
        })}
      </Carousel>
      <h1 className="text-center p-3 mt-2">
        <span
          className="show-more-btn"
          onClick={() => navigate("/all-published-quiz")}
        >
          Show more
        </span>
      </h1>
    </div>
  );
};

export default AllPublishQuizSection;
