import React, { Component } from "react";
import ToDoInput from "./components/ToDoInput/ToDoInput";
import ToDosTable from "./components/ToDosTable/ToDosTable";
import randomIdGenerator from "./utility/randomIdGenerator";
import "./App.css";

class App extends Component {
  state = {
    toDoInput: "",
    toDoList: [],
    errors: {}
  };

  handleInput = e => {
    let toDoInput = e.target.value;
    this.setState({ toDoInput });
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
    let { toDoInput, toDoList } = this.state;

    const toDoId = randomIdGenerator();

    // check if it is an empty string or not, by using validation function.
    const errors = this.handleValidation();
    this.setState({ errors: errors || {} });
    if (errors) return;

    toDoList.push({ toDoId, name: toDoInput, completed: false });
    this.setState({ toDoList, toDoInput: "" });
  };

  handleKeyPress = event => {
    const key = event.key;

    if (key === "Enter") {
      // get the input from state
      let { toDoInput, toDoList } = this.state;

      const toDoId = randomIdGenerator();

      // check if it is an empty string or not, by using validation function.
      const errors = this.handleValidation();
      this.setState({ errors: errors || {} });
      if (errors) return;

      toDoList.push({ toDoId, name: toDoInput, completed: false });
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
    const { toDoInput, toDoList, errors } = this.state;
    return (
      <div className="App">
        <div className="main-container">
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
            To Doing
          </h1>
          <div className="input-container">
            <div className="input-wrapper">
              <ToDoInput
                label="Write a to-do here"
                value={toDoInput}
                onChange={this.handleInput}
                onKeyPress={this.handleKeyPress}
                onClick={() => this.setState({ errors: {} })}
              />
              <span style={{ margin: "auto" }}>
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
            <ToDosTable
              data={toDoList}
              heading="To Do List"
              itemCheck={this.handleItemCheck}
              completion={false}
            />
            <ToDosTable
              data={toDoList}
              heading="Completed"
              itemCheck={this.handleItemCheck}
              completion={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
