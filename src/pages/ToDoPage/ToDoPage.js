import React, { Component } from "react";
import ToDoInput from "./../../components/ToDoInput/ToDoInput";
import TabView from "./../../components/common/TabView/TabView";
import ToDosTable from "./../../components/ToDosTable/ToDosTable";
import DatePicker from "./../../components/DatePicker/DatePicker";
import SortBar from "./../../components/common/SortBar/SortBar";
import randomIdGenerator from "./../../utility/randomIdGenerator";
import dateGetter from "./../../utility/dateGetter";
import dateFormatter from "./../../utility/dateFormatter";
import dateSorter from "./../../utility/dateSorter";
import listSorter from "./../../utility/listSorter";
import "./ToDoPage.css";

class ToDoPage extends Component {
  state = {
    toDoInput: "",
    dateLabel: "Today",
    selectedDate: "",
    currentDate: "",
    toDoList: [],
    sortedList: [],
    completedItems: 0,
    nonCompletedItems: 0,
    currentSort: {
      name: {
        status: "default"
      },
      latestAdded: {
        status: "default"
      },
      dueDate: {
        status: "default"
      }
    },
    sortTypes: {
      asc: {
        class: "sort-down"
      },
      desc: {
        class: "sort-up"
      },
      default: {
        class: "sort"
      }
    },
    errors: {}
  };

  componentDidMount = () => {
    const date = dateGetter();
    let starterData = {};

    const userData = JSON.parse(localStorage.getItem("userToDoData"));

    // if data is null set default values
    userData === null
      ? (starterData = {
          toDoList: [],
          completedItems: 0,
          nonCompletedItems: 0
        })
      : // if not set the values from localStorage
        (starterData = {
          toDoList: userData[0].toDoList,
          completedItems: userData[0].completedItems,
          nonCompletedItems: userData[0].nonCompletedItems
        });

    this.setState({
      currentDate: date,
      selectedDate: {
        date,
        expired: false
      },
      toDoList: starterData.toDoList,
      sortedList: starterData.toDoList,
      completedItems: starterData.completedItems,
      nonCompletedItems: starterData.nonCompletedItems
    });
  };

  handleInput = e => {
    let toDoInput = e.target.value;
    this.setState({ toDoInput });
  };

  handleDatePick = val => {
    // function for handling Date picker events

    const currentDate = dateGetter();
    const pickedDate = dateGetter(val);

    let dateLabel;

    // Set the input label to "Today" if currentDate(dynamic value) is equal to today
    currentDate === pickedDate
      ? (dateLabel = "Today")
      : (dateLabel = dateFormatter(val));

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
    // checks the input, to prevent having empty to-do items.
    const errors = {};
    const { toDoInput } = this.state;

    if (toDoInput.trim() === "")
      errors.toDoInput =
        "You need to enter at least one character for a to-do item!";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleAddToDo = () => {
    // Adding to-do handler via Add button

    // get the input from state
    const { toDoInput, toDoList, selectedDate } = this.state;

    const toDoId = randomIdGenerator();

    // check if it is an empty string or not, by using validation function.
    const errors = this.handleValidation();
    this.setState({ errors: errors || {} });
    if (errors) return;

    toDoList.push({
      toDoId,
      name: toDoInput,
      completed: false,
      dueDate: selectedDate.date
    });

    const listLength = toDoList.filter(t => t.completed === false).length;

    const userToDoData = [
      {
        toDoList,
        sortedList: toDoList
      }
    ];

    localStorage.setItem("userToDoData", JSON.stringify(userToDoData));

    this.setState({
      toDoList,
      sortedList: toDoList,
      toDoInput: "",
      nonCompletedItems: listLength
    });
  };

  handleKeyPress = event => {
    // Adding to-do handler, with Enter key
    const key = event.key;

    if (key === "Enter") {
      // get the input from state
      let { toDoInput, toDoList, selectedDate } = this.state;

      const toDoId = randomIdGenerator();

      // check if it is an empty string or not, by using validation function.
      const errors = this.handleValidation();
      this.setState({ errors: errors || {} });
      if (errors) return;

      toDoList.push({
        toDoId,
        name: toDoInput,
        completed: false,
        dueDate: selectedDate.date
      });

      const listLength = toDoList.filter(t => t.completed === false).length;

      const userToDoData = [
        {
          toDoList,
          sortedList: toDoList
        }
      ];

      localStorage.setItem("userToDoData", JSON.stringify(userToDoData));

      this.setState({
        toDoList,
        sortedList: toDoList,
        toDoInput: "",
        nonCompletedItems: listLength
      });
    } else {
      return;
    }
  };

  handleItemCheck = event => {
    //Item check handler for completed or nonCompleted state of to-dos

    // Get the id of the to-do item and store it.
    let toDoId = event;

    // Get the current toDoList from storage:

    const userData = JSON.parse(localStorage.getItem("userToDoData"))[0]
      .toDoList;
    const toDoList = [...userData];

    // Find the index of the item:
    const index = toDoList.findIndex(toDo => toDo.toDoId === toDoId);

    // Extract the item:
    const matched = toDoList[index];

    // Toggle the completed state:
    matched.completed = !matched.completed;

    // Replace with modified version in the same index:
    toDoList[index] = { ...matched };

    // calculate completed & non-complated items:

    const completedItems = toDoList.filter(t => t.completed === true).length;
    const nonCompletedItems = toDoList.filter(t => t.completed === false)
      .length;

    const userToDoData = [
      {
        toDoList,
        sortedList: toDoList,
        completedItems,
        nonCompletedItems
      }
    ];

    localStorage.setItem("userToDoData", JSON.stringify(userToDoData));

    // Set the new state
    this.setState({
      toDoList,
      sortedList: toDoList,
      completedItems,
      nonCompletedItems
    });
  };

  handleSorting = nameOfIt => {
    // Sorting handler
    const { currentSort, toDoList } = this.state;

    let nextSort;

    if (currentSort[nameOfIt].status === "asc") nextSort = "desc";
    else if (currentSort[nameOfIt].status === "desc") nextSort = "default";
    else if (currentSort[nameOfIt].status === "default") nextSort = "asc";

    currentSort[nameOfIt].status = nextSort;
    const sortedList = listSorter([...toDoList], nameOfIt, nextSort);

    this.setState({ currentSort, sortedList });
  };

  handleDeleteAll = () => {
    // This deletes everything related to To-dos from localStorage
    // As well as puts back the state into default mode.

    this.setState({
      toDoList: [],
      sortedList: [],
      completedItems: 0,
      nonCompletedItems: 0
    });

    localStorage.removeItem("userToDoData");
  };

  render() {
    const {
      toDoInput,
      currentDate,
      selectedDate,
      dateLabel,
      toDoList,
      sortedList,
      completedItems,
      nonCompletedItems,
      currentSort,
      sortTypes,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <h1 style={{ margin: "15px 0 0 0", textAlign: "center" }}>
          To Do List
        </h1>
        <div className="input-container">
          <div className="input-wrapper">
            <span className="date-pick-wrapper">
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
            <span className="button-wrapper">
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
          <TabView>
            <div label="To Do List" count={nonCompletedItems}>
              {toDoList.length > 0 ? (
                <SortBar
                  onSorting={this.handleSorting}
                  currentSort={currentSort}
                  sortTypes={sortTypes}
                />
              ) : null}
              <ToDosTable
                data={sortedList}
                currentDate={currentDate}
                itemCheck={this.handleItemCheck}
                completion={false}
              />
            </div>
            <div label="Completed" count={completedItems}>
              {toDoList.length > 0 ? (
                <SortBar
                  onSorting={this.handleSorting}
                  currentSort={currentSort}
                  sortTypes={sortTypes}
                />
              ) : null}
              <ToDosTable
                data={sortedList}
                currentDate={currentDate}
                itemCheck={this.handleItemCheck}
                completion={true}
              />
            </div>
          </TabView>
          <div>
            <button className="add-button clear" onClick={this.handleDeleteAll}>
              Delete All
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ToDoPage;
