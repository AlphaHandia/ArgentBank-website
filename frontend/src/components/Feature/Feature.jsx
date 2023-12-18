import React from "react";

const Feature = ({ title, content, imageSrc, altText }) => {
  return (
    <div className="feature-item">
      <img src={imageSrc} alt={altText} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Feature;
