import React, { Component } from "react";

class Tab extends Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const { activeTab, label, count } = this.props;
    let className = "tab-list-item";
    let badgeClass = "tab-counting-badge";

    if (activeTab === label) {
      className += " tab-list-active";
      badgeClass += " active";
    }

    return (
      <li className={className} onClick={this.onClick}>
        <h3 className="tab-header">
          <span>{label}</span>
          <span className={badgeClass}> {count}</span>
        </h3>
      </li>
    );
  }
}

export default Tab;
