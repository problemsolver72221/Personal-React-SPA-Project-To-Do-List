import React, { Component } from "react";
import flatpickr from "flatpickr/dist/flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import DateIcon from "../common/dateIcon";
import "./DatePicker.css";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.datePicker = React.createRef();
  }

  onChange = (selectedDates, dateStr, instance) => {
    this.props.onDatePick(selectedDates);
  };

  componentDidMount() {
    flatpickr(this.datePicker.current, {
      onChange: this.onChange,
      options: {
        defaultDate: "today"
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.datePicker} className="date-picker">
          <DateIcon />
        </div>
      </React.Fragment>
    );
  }
}

export default DatePicker;
