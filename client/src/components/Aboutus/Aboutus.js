import React from "react";

// import image
import Logo from "../../assets/img/logo.png";

// import vector
import Instagram from "../../assets/vector/instagram.png";
import Youtube from "../../assets/vector/youtube.png";
import Github from "../../assets/vector/github.png";

// import css
import "./About.css";

export default function Aboutus() {
  return (
    <div className="aboutus ">
      <h1>About Us</h1>
      <img src={Logo} className="logo" />

      <h6>This Project Is Develop By Code Diggers</h6>

      <div className="social-icons-container d-flex justify-content-around align-items-center my-5">
        <a target="_blank" href="https://www.instagram.com/code.diggers/">
          <img src={Instagram} className="vector-icon" />
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCcbZ7AmY35Kps985i5UIIKA"
        >
          <img src={Youtube} className="vector-icon" />
        </a>
        <a target="_blank" href="https://github.com/code-diggers-369">
          <img src={Github} className="vector-icon" />
        </a>
      </div>
    </div>
  );
}
