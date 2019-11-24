import React, { Component } from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import DateViewer from "./../common/DateViewer/DateViewer";
import dateSorter from "./../../utility/dateSorter";
import "./ToDosTable.css";

class ToDosTable extends Component {
  render() {
    const { data, currentDate, completion } = this.props;
    return (
      <div className="to-do-table-container">
        <ul className="to-do-list-container">
          {!data.length && !completion ? (
            <p>Your list seems empty, add some to-dos!</p>
          ) : (
            data
              .slice(0)
              .reverse()
              .filter(d => d.completed === completion)
              .map(d => {
                return (
                  <li
                    key={d.toDoId}
                    className={
                      !completion
                        ? "to-do-list-item"
                        : "to-do-list-item completed"
                    }
                  >
                    <ToDoItem
                      itemlabel={d.name}
                      todoid={d.toDoId}
                      onItemCheck={() => this.props.itemCheck(d.toDoId)}
                      completion={completion}
                    />
                    <React.Fragment>
                      <div style={{ margin: 0 }}>
                        <DateViewer
                          date={d.dateLabel}
                          className={
                            currentDate ===
                              dateSorter([currentDate, d.dueDate], "asc")[0] &&
                            !completion
                              ? "selected-day"
                              : dateSorter(
                                  [currentDate, d.dueDate],
                                  "asc"
                                )[0] && !completion
                              ? "selected-day expired"
                              : "selected-day completed"
                          }
                        />
                      </div>
                    </React.Fragment>
                  </li>
                );
              })
          )}
        </ul>
      </div>
    );
  }
}

export default ToDosTable;
