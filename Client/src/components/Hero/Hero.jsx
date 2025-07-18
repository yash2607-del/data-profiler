import React from "react";
import "./hero.css";
import hireImg from "/src/assets/hire.png";

const Hero = () => {
  return (
    <>
      <div className="container-fluid">
        <img
          src={hireImg}
          className="rounded float-end w-50 h-100 hero-img"
          alt="landing"
        />
      </div>

      <div className="left">
        <h1 className="heading"> Welcome to DataProfiler App</h1>
        <h2 className="subheading">Build.Deploy.Show</h2>

        <p > Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </>
  );
};

export default Hero;
