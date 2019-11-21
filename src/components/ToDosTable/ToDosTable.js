import React, { Component } from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDosTable.css";

class ToDosTable extends Component {
  render() {
    const { data, heading, completion } = this.props;
    return (
      <div className="to-do-table-container">
        <h2 className="to-do-header">{heading}</h2>
        <div>
          {!data.length && !completion ? (
            <p>Your list seems empty, add some to-dos!</p>
          ) : (
            data
              .slice(0)
              .reverse()
              .filter(d => d.completed === completion)
              .map(d => {
                return (
                  <ToDoItem
                    itemlabel={d.name}
                    key={d.toDoId}
                    todoid={d.toDoId}
                    onItemCheck={() => this.props.itemCheck(d.toDoId)}
                    completion={completion}
                  />
                );
              })
          )}
        </div>
      </div>
    );
  }
}

export default ToDosTable;
