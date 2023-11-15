import React from 'react'
import myImg from "../../../assets/quiz4.mp4";

const Footer = () => {
  return (
    <footer className="bg-[#CBD5E1] px-6 py-3">
        <video
        src={myImg}
        width="80"
        // height="150"
        autoPlay
        muted
      />
    </footer>
  )
}

export default Footer