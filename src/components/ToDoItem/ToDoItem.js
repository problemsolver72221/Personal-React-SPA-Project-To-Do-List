import React from "react";
import "./ToDoItem.css";

const ToDoItem = ({ itemlabel, todoid, onItemCheck, completion }) => {
  return (
    <div>
      <svg className="tick-icon">
        <symbol id="check-tick" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
      <input
        className="main"
        id={todoid}
        type="checkbox"
        style={{ display: "none" }}
        onClick={onItemCheck}
        defaultChecked={completion}
      />
      <label className="inside-label" htmlFor={todoid}>
        <div className="todo-item">
          <span className="checkbox">
            <svg width="12px" height="10px">
              <use href="#check-tick"></use>
            </svg>
          </span>
          <p className="item-text">{itemlabel}</p>
        </div>
      </label>
    </div>
  );
};

export default ToDoItem;
