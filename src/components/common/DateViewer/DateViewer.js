import React from "react";
import "./DateViewer.css";

const DateViewer = ({ date, className }) => {
  return (
    <React.Fragment>
      <p className={className}>{date}</p>
    </React.Fragment>
  );
};

export default DateViewer;
