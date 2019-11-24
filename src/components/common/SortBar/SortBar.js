import React, { Component } from "react";
import SortIcons from "./../sortIcons";
import "./SortBar.css";

class SortBar extends Component {
  render() {
    const { currentSort, sortTypes } = this.props;
    return (
      <div className="sortbar-container">
        <div className="sortbar-column">
          <SortIcons sortStatus={sortTypes[currentSort.name.status].class} />
          <span
            className="sort-text"
            onClick={() => this.props.onSorting("name")}
          >
            Name
          </span>
        </div>
        <div className="sortbar-column">
          <SortIcons
            sortStatus={sortTypes[currentSort.latestAdded.status].class}
          />
          <span
            className="sort-text"
            onClick={() => this.props.onSorting("latestAdded")}
          >
            Latest Added
          </span>
        </div>
        <div className="sortbar-column">
          <SortIcons sortStatus={sortTypes[currentSort.dueDate.status].class} />
          <span
            className="sort-text"
            onClick={() => this.props.onSorting("dueDate")}
          >
            Due Date
          </span>
        </div>
      </div>
    );
  }
}

export default SortBar;
