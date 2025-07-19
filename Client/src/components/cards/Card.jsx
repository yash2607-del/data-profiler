import React from "react";
import "./card.css";

const Card = ({ icon, title, description, buttonText, link }) => {
  return (
    <div className="features-card">
      <div className="features-card-icon">{icon}</div>
      <div className="features-card-body">
        <h2 className="features-card-title">{title}</h2>
        <p className="features-card-text">{description}</p>
        <div className="features-card-button-wrapper">
          <a href={link || "#"}>
            <button className="features-card-button">{buttonText}</button>
          </a>
        </div>
      </div>
    
export default Card;


