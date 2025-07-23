import React from "react";
import { FaProjectDiagram, FaDatabase, FaNetworkWired } from "react-icons/fa";
import "./features.css";
import { Link } from "react-router-dom";
const FeaturesData = [
  {
    title: "Create Workspace",
    description:
      "Start a new interactive space to build your projects or models.",
    icon: <FaProjectDiagram size={40} className="text-primary feature-icon" />,
    buttonText: "Create Workspace",
    link: "/add",
  },
  {
    title: "View Workspace",
    description: "Access and examine existing workspaces or models with ease.",
    icon: <FaDatabase size={40} className="text-primary feature-icon" />,
    buttonText: "View Workspace",
    link: "/workspace",
  },
  {
    title: "Create Connection",
    description:
      "Collaborate with peers or integrate insights across disciplines.",
    icon: <FaNetworkWired size={40} className="text-primary feature-icon" />,
    buttonText: "Create Connection",
    link: "/create-connection",
  },
];

const Features = ({ welcomeMessage }) => {
  return (
    <section id="feature">
      <div className="feature-section text-center">
        {welcomeMessage && (
          <h1 className="feature-heading">{welcomeMessage}</h1>
        )}
        <div className="custom-line mx-auto mt-2"></div>
      </div>

      <div className="wrapper">
        {FeaturesData.map((feature, index) => (
          <div className="features-card" key={index}>
            <div className="icon-container">{feature.icon}</div>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
            <Link to={feature.link}>
              <button className="feature-button">{feature.buttonText}</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
