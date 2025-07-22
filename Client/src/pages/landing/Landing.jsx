import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/features/Features";


const Landing = () => {
  return (
    <>

      <Navbar />
      <Hero />
      <Features welcomeMessage="Welcome to DataProfiler" />

    <Navbar/>
      <Hero/>
   

    </>
  );
};

export default Landing;
