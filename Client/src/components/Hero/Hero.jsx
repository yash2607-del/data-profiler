import React from "react";
import "./hero.css";
import hireImg from "/src/assets/hire.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
    <div className="container-fluid hero-section d-flex align-items-center">
      <div className="text-section w-50 p-4">
        <h1 className="heading" style={{ color: "green", fontSize: "64px" }}>
          Welcome Back User
        </h1>
        <Link to={"/dashboard"} 
        >        <button className="btn btn-primary mt-3">Go To Dashboard</button></Link>
        
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