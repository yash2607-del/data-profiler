import React from "react";
import { FaUserMd, FaMicroscope, FaStethoscope } from "react-icons/fa";
import "./features.css";
import Card from "../cards/Card";

const FeaturesData = [
  {
    title: "Create Workspace",
    description: "Start a new interactive space to build your projects or models.",
    icon: <FaUserMd size={30} className="text-primary" />,
    buttonText: "Create Workspace",
    link: "/workspace", 
  },
  {
    title: "View Workspace",
    description: "Access and examine existing workspaces or models with ease.",
    icon: <FaMicroscope size={30} className="text-primary" />,
    buttonText: "View Workspace",
    link: "workspace", // Add your link here
  },
  {
    title: "Create Connection",
    description: "Collaborate with peers or integrate insights across disciplines.",
    icon: <FaStethoscope size={30} className="text-primary" />,
    buttonText: "Create Connection",
    link: "/connection", // Add your link here
  },
];

const Features = ({ welcomeMessage }) => {
  return (
    <section id="feature">
      <div className="feature-section text-center">
        {welcomeMessage && <h1>{welcomeMessage}</h1>}

        <h1 className="feature-heading">Quick Actions</h1>
        <div className="custom-line mx-auto mt-2"></div>
      </div>

      <div className="wrapper">
        {FeaturesData.map((feature, index) => (
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            buttonText={feature.buttonText}
            link={feature.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
