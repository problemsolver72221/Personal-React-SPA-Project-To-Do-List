import React from "react";
import dateStrFormatter from "./../../../utility/dateStrFormatter";
import dateSorter from "./../../../utility/dateSorter";
import "./DateViewer.css";

const DateViewer = ({ date, current, completion }) => {
  return (
    <React.Fragment>
      <p
        className={
          current === dateSorter([current, date], "asc")[0] && !completion
            ? "selected-day"
            : dateSorter([current, date], "asc")[0] && !completion
            ? "selected-day expired"
            : "selected-day completed"
        }
      >
        {date === current ? "Today" : dateStrFormatter(date)}
      </p>
    </React.Fragment>
  );
};

export default DateViewer;
