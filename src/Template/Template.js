import React from "react";
import Navbar from "../Navbar/Navbar";

const Template = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Template;
