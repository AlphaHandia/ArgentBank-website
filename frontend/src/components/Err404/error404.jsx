import React from "react";
import { NavLink } from "react-router-dom";
import "./error.css";

const Error404 = () => {
  return (
    <div className="error-404-container">
      <h2 className="error-404-title">
        404 <br />
        Oups... 🙊 Page not found !
      </h2>
      <p className="error-404-text">
        The page you are looking for does not exist.
      </p>
      <NavLink to="/ArgentBank" className="error-404-link">
        Go to Home Page
      </NavLink>
    </div>
  );
};

export default Error404;
