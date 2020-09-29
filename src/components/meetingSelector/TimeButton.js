import React from "react";

class TimeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { outline: "btn-outline-success" };
  }

  // Handles buttons styling based on selected or not.
  toggleStyle(e) {
    if (this.state.outline === "btn-outline-success") {
      this.setState({ outline: "btn-success" });
    } else {
      this.setState({ outline: "btn-outline-success" });
    }
  }

  // See MeetingSelector.js for timeHandler function.
  handleClick(e) {
    this.toggleStyle(e);
    this.props.timeHandler(
      this.props.data,
      this.props.timeSlot,
      this.props.dayNumber
    );
  }
  render() {
    return (
      <button
        className={`btn btn-block ${this.state.outline}`}
        onClick={e => this.handleClick(e)}
        data={this.props.data}
        timeSlot={this.props.timeSlot}
      >
        {" "}
        {this.props.time}{" "}
      </button>
    );
  }
}

export default TimeButton;
