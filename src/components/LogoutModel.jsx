import React from "react";
import ReactDOM from "react-dom";
import { RotatingLines } from "react-loader-spinner";

const BackDrop = (props) => {
  return <div className="backdrop" />;
};

const ModelOverlay = () => {
  return (
    <div className="logout-modal">
      <h1 className="text-3xl text-[#fff]">Logging out</h1>
      <RotatingLines />
    </div>
  );
};

const LogoutModel = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay />,
        document.getElementById("overlay_root")
      )}
    </React.Fragment>
  );
};

export default LogoutModel;
