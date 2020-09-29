import React from "react";
import { Link } from "react-router-dom";

class Faq extends React.Component {
  constructor(props) {
    super(props);
    // edit unused items in state
    this.state = {};

    // bind handler functions so `this` works when passed to other components
  }

  // Send Everything to the DOM and pass relevant elements to other components
  render() {
    return (
      <div className="news-container">
        <div className="row mx-auto">
          <div className="col-md-8 m-auto center-block">
            <div className="card card-body text-center">
              <div className="text-center mx-auto"></div>
              <h1 className="text-center mb-3 text-success"> Welcome! </h1>
              <div className="faq-content">
                <h2>Things to Know</h2>
                <div className="links">
                  <a href="#etiquette" class="card-link">
                    Etiquette
                  </a>
                  <a href="#privacy" class="card-link">
                    Privacy
                  </a>
                  <a href="#contact" class="card-link">
                    Contact
                  </a>
                </div>
                <hr></hr>
                <div id="etiquette">
                  {" "}
                  <h3> Etiquette </h3>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.{" "}
                  </p>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.{" "}
                  </p>{" "}
                </div>
                <hr></hr>
                <div id="privacy">
                  <h3> Privacy </h3>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.{" "}
                  </p>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.{" "}
                  </p>
                </div>
                <div id="contact">
                  <h3> Contact </h3>
                  <p> Direct any further questions to SomeEmail@Neuron.com </p>
                </div>
              </div>
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

export default Faq;
