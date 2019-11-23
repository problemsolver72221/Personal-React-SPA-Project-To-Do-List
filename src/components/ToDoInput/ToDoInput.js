import React from "react";
import "./ToDoInput.css";

const ToDoInput = ({ label, expiry, value, onChange, onKeyPress, onClick }) => {
  return (
    <div className="to-do-input">
      <input
        type="text"
        placeholder="&nbsp;"
        autoComplete="off"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onClick={onClick}
      />
      <span className="label">
        Write a to-do here for{" "}
        <span className={expiry ? "date-expired" : "date-not-expired"}>
          {label}
        </span>
      </span>
      <span className="border" />
    </div>
  );
};

export default ToDoInput;
