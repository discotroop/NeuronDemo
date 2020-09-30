import React from "react";
import { Link } from "react-router-dom";
import MeetingDescription from "./MeetingDescription";
import TimeSelector from "./TimeSelector";
import GenerateTimes from "./GenerateTimes";
import SubmitButton from "./SubmitButton";
import Email from "./Email";
import Errors from "./Errors";
import Graphic from "./Graphic";
import { DateTime } from "luxon";
import ReactModal from "react-modal";

// see ../../api/apiCalls for options
import apiCalls from "../../api/apiCalls";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    // edit unused items in state
    this.state = {
      apiResponse: "",
      dates: GenerateTimes(),
      email: "",
      selectedTimes: [],
      errors: "",
      displayErrors: "d-none",
      editionID: "",
      newsletterID: "",
      articleTitle: "",
      newsletterTitle: "",
      showModal: false
    };

    // bind handler functions so `this` works when passed to other components
    this.submitHandler = this.submitHandler.bind(this);
    this.timeSelectorHandler = this.timeSelectorHandler.bind(this);
    this.emailInputHandler = this.emailInputHandler.bind(this);
    this.dismissErrors = this.dismissErrors.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  // handle calling api
  fetchDataFromAPI() {
    let location = this.props.location.pathname;
    console.log(location);

    // fetch data from api based on custom URL
    fetch(`https://secure-cliffs-97248.herokuapp.com/api${location}`).then(
      res => {
        console.log(res);
        this.setState({
          apiResponse: res.data[0]
        });
        console.log(this.state.apiResponse);
      }
    );
  }

  // Live data from API
  getData() {
    this.fetchDataFromAPI();
    this.setState({
      email: "",
      selectedTimes: [],
      errors: "",
      displayErrors: "d-none"
    });
  }
  // will grab data to populate fields.
  componentWillMount() {
    this.getData();
  }

  // Rename this function or break out smaller parts
  postTimesToAPI(results, articleID) {
    let unMatched = [];
    results.selectedTimes.forEach(time => {
      console.log(time.data);
      let dtEnd = time.data.plus({ minutes: 30 });
      console.log(
        "first time",
        time.data.toISO(),
        "second time",
        dtEnd.toISO()
      );

      unMatched.push({
        start: time.data,
        end: dtEnd,
        day: time.day,
        timeSlot: time.timeSlot,
        email: results.email,
        isMatched: false,
        matchedEmail: ""
      });
    });
    // this pushes the new times too the articles matches array
    apiCalls.updateArticleById(articleID, { unMatched });
    this.setState({ selectedTimes: [] });
    this.handleOpenModal();
    // article needs unmatched Array
    // article needs matched array
    // need to write articleMatch()
    // need to call articleMatch()
  }

  // Check to avoid email redundancy
  checkForUserEmail(results) {
    // check if user email is in dbs
    // TO DO function calls based on what emerges
    apiCalls.checkUserByEmail(results.email).then(results => {
      if (results.data.data === "new user") {
        console.log("build new user");
      } else {
        console.log("update old user");
      }
    });
  }

  // Handle validation and submit on submit click
  // Need to add redirect on completion!
  submitHandler() {
    // grab newsletter, email and selected times
    let results = {
      Article_title: this.state.apiResponse.title,
      Article_id: this.state.apiResponse._id,
      email: this.state.email,
      selectedTimes: this.state.selectedTimes
    };
    // check for >= 2 times selected
    if (this.state.selectedTimes.length < 2) {
      let errorMessage = "Please select two or more time slots";
      this.setState({ errors: errorMessage, displayErrors: "d-inline-block" });

      // check for valid email format
    } else if (this.validateEmail(this.state.email) === false) {
      let errorMessage = "Please enter a Valid Email Address";
      this.setState({ errors: errorMessage, displayErrors: "d-inline-block" });

      // If time selection and email valid than send results
    } else {
      console.log("results", results);
      this.checkForUserEmail(results);
      this.postTimesToAPI(results, this.state.apiResponse._id);
    }
  }

  // Handle clearing and dismissing Errors from submitHandler
  dismissErrors() {
    let newErrors = [];
    this.setState({
      errors: newErrors,
      displayErrors: "d-none"
    });
  }

  // Handle tracking what times are selected
  timeSelectorHandler(data, timeSlot, dayNumber) {
    // Newly selected time
    let clickedTime = { data: data, timeSlot: timeSlot, day: dayNumber };
    // Previously selected times
    console.log("old", this.state.selectedTimes);
    console.log("new", clickedTime);
    let previous = this.state.selectedTimes;
    // Check if clickedTime has been previously selected
    // If clickedTime is previously selected remove clickedTime.
    let checkForRedundancy = previous.filter(function(item) {
      return item !== clickedTime;
    });
    // Remove previously selected clickedTime
    if (checkForRedundancy.length !== previous.length) {
      this.setState({ selectedTimes: checkForRedundancy });

      // Otherwise add clickedTime to selected times.
    } else {
      previous.push(clickedTime);
      this.setState({ selectedTimes: previous });
    }
  }

  // Email input handling and validation
  validateEmail(email) {
    // Regex Ripped from stack overflow
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Returns true for match false for none match.
    return pattern.test(email);
  }
  // Takes string passed from Email.js and sets it to this.state.email
  emailInputHandler(string) {
    this.setState({ email: string });
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  // Send Everything to the DOM and pass relevant elements to other components
  render() {
    return (
      <div className="news-container">
        <div className="row mx-auto">
          <div className="col-md-8 m-auto center-block">
            <div className="card card-body text-center">
              <div className="text-center mx-auto">
                {/* <FontAwesomeIcon icon={faBroadcastTower} size="5x" /> */}
              </div>
              <h3 className="text-center mb-3 text-success"> Welcome! </h3>
              <Graphic />
              <MeetingDescription
                articleName={this.state.apiResponse.title}
                newsletter={this.state.apiResponse.newsletter_title}
                edition={this.state.apiResponse.edition_title}
                firstDate={this.state.dates.first.name}
                thirdDate={this.state.dates.third.name}
              />
              <div>
                <ReactModal
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  style={customModalStyles}
                >
                  <div className="text-center">
                    <h4> Success! </h4>
                    <p> Keep an eye on your inbox! </p>
                    <Link to="/faq" className="btn btn-primary">
                      {" "}
                      Ok, great!{" "}
                    </Link>
                  </div>
                </ReactModal>
              </div>
              <TimeSelector
                dates={this.state.dates}
                timeHandler={this.timeSelectorHandler}
                dismiss={this.dismissErrors}
              />
              <Errors
                errors={this.state.errors}
                display={this.state.displayErrors}
                dismiss={this.dismissErrors}
              />
              <Email
                input={this.emailInputHandler}
                dismiss={this.dismissErrors}
              />
              <SubmitButton
                submit={this.submitHandler}
                dismiss={this.dismissErrors}
              />
              <div>
                <Link to="/directory">Directory</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;
