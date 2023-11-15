import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillRightCircle,
  //   AiOutlineCheck,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className="backdrop" />;
};

const ModelOverlay = ({successMessage, subTitle, optionalMessage}) => {
  const navigate = useNavigate();
  return (
    <div className="modal w-[80%] md:w-1/2 h-[400px] left-[10%] md:left-[25%] top-[20vh] font-[karla]">
      <div className="flex flex-col items-center mt-8">
        {/* <AiOutlineCheck className="bg-[#16A34A] w-12 h-12 p-1.5 rounded-full" /> */}
        <AiOutlineCheckCircle className="bg-[#16A34A] w-12 h-12 p-1.5 rounded-full" />
        <div className="py-4">
          <h1 className="text-center text-2xl min-[550px]:text-4xl my-2">
            Successfully
          </h1>
          <p className="text-lg min-[550px]:text-xl text-center">
            {successMessage}
          </p>
          <p className="text-center">{optionalMessage}</p>
        </div>
        <div className="p-4 flex flex-col items-center gap-2">
          <h1 className="text-lg min-[550px]:text-xl text-center">
            {subTitle}
          </h1>
          <AiFillRightCircle
            className="text-3xl hover:bg-[#4ADE80] rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

const OTPModel = ({successMessage, subTitle,optionalMessage}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay successMessage={successMessage} subTitle={subTitle} optionalMessage={optionalMessage} />,
        document.getElementById("overlay_root")
      )}
    </React.Fragment>
  );
};

export default OTPModel;
