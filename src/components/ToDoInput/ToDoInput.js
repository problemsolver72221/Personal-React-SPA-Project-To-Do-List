import React from "react";
import "./ToDoInput.css";

const ToDoInput = ({ label, value, onChange, onKeyPress, onClick }) => {
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
      <span className="label">{label}</span>
      <span className="border" />
    </div>
  );
};

export default ToDoInput;
