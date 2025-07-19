import React from "react";
import "./hero.css";
import hireImg from "/src/assets/hire.png";

const Hero = () => {
  return (
    <>
    <div className="container-fluid hero-section d-flex align-items-center">
      <div className="text-section w-50 p-4">
        <h1 className="heading" style={{ color: "green", fontSize: "64px" }}>
          Welcome Back User
        </h1>
        <button className="btn btn-primary mt-3">Create Workspace</button>
      </div>
      <div className="image-section w-50">
        <img
          src={hireImg}
          className="img-fluid rounded hero-img"
          alt="landing"
        />
      </div>
    </div>
    </>
  );
};

export default Hero;
