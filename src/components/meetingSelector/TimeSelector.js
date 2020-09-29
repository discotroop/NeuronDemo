import React from "react";
import TimeColumn from "./TimeColumn";

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this is redundant ? just use this.props.dates.first ?
  getData() {
    this.setState({
      dates: this.props.dates
    });
  }

  componentWillMount() {
    this.getData();
  }
  render() {
    return (
      <div className="time-selection">
        <h5 className="text-center"> Available Times </h5>
        <p className="text-secondary">
          {" "}
          Select time(s), Please select at least 2. Times are local to *you*{" "}
        </p>
        <div className="container">
          <div className="row">
            <TimeColumn
              date={this.state.dates.first}
              timeHandler={this.props.timeHandler}
            />
            <TimeColumn
              date={this.state.dates.second}
              timeHandler={this.props.timeHandler}
            />
            <TimeColumn
              date={this.state.dates.third}
              timeHandler={this.props.timeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSelector;
