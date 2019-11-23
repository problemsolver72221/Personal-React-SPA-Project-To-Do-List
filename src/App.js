import React, { Component } from "react";
import ToDoInput from "./components/ToDoInput/ToDoInput";
import ToDosTable from "./components/ToDosTable/ToDosTable";
import DatePicker from "./components/DatePicker/DatePicker";
import randomIdGenerator from "./utility/randomIdGenerator";
import dateGetter from "./utility/dateGetter";
import dateFormatter from "./utility/dateFormatter";
import dateSorter from "./utility/dateSorter";
import "./App.css";

class App extends Component {
  state = {
    toDoInput: "",
    dateLabel: "Today",
    selectedDate: "",
    currentDate: "",
    toDoList: [],
    errors: {}
  };

  componentDidMount = () => {
    const date = dateGetter();
    this.setState({
      currentDate: date,
      selectedDate: {
        date,
        expired: false
      }
    });
  };

  handleInput = e => {
    let toDoInput = e.target.value;
    this.setState({ toDoInput });
  };

  handleDatePick = val => {
    const currentDate = dateGetter();
    const pickedDate = dateGetter(val);

    let dateLabel;

    currentDate === pickedDate
      ? (dateLabel = "Today")
      : (dateLabel = dateFormatter(val));

    // -----------------------------------

    let expired;

    const comparing = dateSorter([currentDate, pickedDate], "asc");

    comparing[0] === currentDate ? (expired = false) : (expired = true);

    this.setState({
      dateLabel,
      selectedDate: {
        date: pickedDate,
        expired
      }
    });
  };

  handleValidation = () => {
    const errors = {};
    const { toDoInput } = this.state;

    if (toDoInput.trim() === "")
      errors.toDoInput =
        "You need to enter at least one character for a to-do item!";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleAddToDo = () => {
    // get the input from state
    let { toDoInput, toDoList, dateLabel, selectedDate } = this.state;

    const toDoId = randomIdGenerator();

    // check if it is an empty string or not, by using validation function.
    const errors = this.handleValidation();
    this.setState({ errors: errors || {} });
    if (errors) return;

    toDoList.push({
      toDoId,
      name: toDoInput,
      completed: false,
      dateLabel,
      dueDate: selectedDate.date
    });

    this.setState({ toDoList, toDoInput: "" });
  };

  handleKeyPress = event => {
    const key = event.key;

    if (key === "Enter") {
      // get the input from state
      let { toDoInput, toDoList, dateLabel, selectedDate } = this.state;

      const toDoId = randomIdGenerator();

      // check if it is an empty string or not, by using validation function.
      const errors = this.handleValidation();
      this.setState({ errors: errors || {} });
      if (errors) return;

      toDoList.push({
        toDoId,
        name: toDoInput,
        completed: false,
        dateLabel,
        dueDate: selectedDate.date
      });

      this.setState({ toDoList, toDoInput: "" });
    } else {
      return;
    }
  };

  handleItemCheck = event => {
    // Get the id of the to-do item and store it.
    let toDoId = event;

    // Get the current toDoList:
    const toDoList = [...this.state.toDoList];

    // Find the index of the item:
    const index = toDoList.findIndex(toDo => toDo.toDoId === toDoId);

    // Extract the item:
    const matched = toDoList[index];

    // Toggle the completed state:
    matched.completed = !matched.completed;

    // Replace with modified version in the same index:
    toDoList[index] = { ...matched };

    // Set the new state
    this.setState({ toDoList });
  };

  render() {
    const {
      toDoInput,
      currentDate,
      selectedDate,
      dateLabel,
      toDoList,
      errors
    } = this.state;
    return (
      <div className="App">
        <div className="main-container">
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
            To Doing
          </h1>
          <div className="input-container">
            <div className="input-wrapper">
              <span style={{ margin: "auto 10px -4px auto" }}>
                <DatePicker onDatePick={this.handleDatePick} />
              </span>
              <ToDoInput
                label={dateLabel}
                expiry={selectedDate.expired}
                value={toDoInput}
                onChange={this.handleInput}
                onKeyPress={this.handleKeyPress}
                onClick={() => this.setState({ errors: {} })}
              />

              <span style={{ margin: "auto auto 0 15px" }}>
                <button className="add-button" onClick={this.handleAddToDo}>
                  Add
                </button>
              </span>
            </div>
            {errors.toDoInput && (
              <div className="validationError">
                {errors.toDoInput}
                <span
                  style={{
                    float: "right",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}
                  onClick={() => this.setState({ errors: {} })}
                >
                  X
                </span>
              </div>
            )}
          </div>
          <div className="table-container">
            <div>
              <h2 className="to-do-header">To Do List</h2>
              <ToDosTable
                data={toDoList}
                currentDate={currentDate}
                itemCheck={this.handleItemCheck}
                completion={false}
              />
            </div>
            <div>
              <h2 className="to-do-header">Completed</h2>
              <ToDosTable
                data={toDoList}
                itemCheck={this.handleItemCheck}
                completion={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
