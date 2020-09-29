import React from "react";

class MeetingDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render meetin Description section with name, newsletter, edition, and date range
  // all passed in from MeetingSelector.js
  render() {
    return (
      <div className="meeting selection">
        <h5>
          {" "}
          <span className="text-secondary">Discussing: </span>{" "}
          {this.props.articleName} <span className="text-secondary">from</span>{" "}
          {this.props.newsletter}, {this.props.edition}{" "}
        </h5>
        <p className="text-secondary">
          {" "}
          Meetings from {this.props.firstDate} to {this.props.thirdDate}{" "}
        </p>
        <h5> Meetings </h5>
        <p className="text-secondary">
          {" "}
          Meetings are held via google hangouts. Meetings are scheduled in half
          hour slots. You can sign up for as many time slots as you like but you
          must pick at least two.{" "}
        </p>
      </div>
    );
  }
}

export default MeetingDescription;
