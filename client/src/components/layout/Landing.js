import React, { Component, unstable_Profiler as Profiler } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ErrorBoundary from "../common/ErrorBoundary";
import { unstable_trace as trace } from "scheduler/tracing";
// import "../../../public/assets/img/Preloader.gif";
// import "../../parallax.js";
// import { ReactComponent as Path } from "../../img/3-path.svg";

class Landing extends Component {
  constructor() {
    super();
    this.state = { showImage: false, showLogin: false };
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.onRenderCallback = this.onRenderCallback.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //redirect the user
      this.props.history.push("/dashboard");
    }
  }
  showLogin() {
    let modal = document.getElementById("loginPage");
    modal.style.display = "block";
  }
  showRegister() {
    let modal = document.getElementById("registerPage");
    modal.style.display = "block";
  }
  onRenderCallback({
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  }) {
    console.log(
      "Id",
      id,
      "phase",
      phase,
      "startTime",
      startTime,
      "actualDuration",
      actualDuration,
      "baseDuration",
      baseDuration
    );
  }

  componentDidCatch(error, errorInfo) {
    console.log("error==>", error, errorInfo, errorInfo.componentStack);
    throw new Error(error);
  }

  render() {
    console.log(require("../../img/homepage/arrow-down.svg"));
    return (
      //
      <div>
        <header className="bg-image">
          <img
            className="logo-img over"
            alt="cloud1"
            src={
              require("../../img/sticky_logo_crop.png").default // data-offset="0.7"
            }
          />

          <div>
            {/* <img
              className="banner"
              alt="banner"
              // data-offset="0.7"
              src={require("../../img/banner.svg")}
            /> */}
            <button
              className="btn btn-success"
              style={{ float: "right", zIndex: 1 }}
              onClick={this.showRegister}
            >
              Register
            </button>
            <button
              className="btn btn-success"
              style={{ float: "right", zIndex: 1 }}
              onClick={this.showLogin}
            >
              Login
            </button>
          </div>
          <div id="background_image">
            <img
              alt="compass"
              className="compass"
              src={require("../../img/homepage/compass.png").default}
            />
            <img
              alt="arrow-left"
              className="arrow-left-compass"
              src={require("../../img/homepage/arrow-right.svg").default}
            />
            <img
              alt="stamp"
              className="stamp"
              src={require("../../img/homepage/stamp.png").default}
            />
            <img
              alt="arrow-left-up"
              className="arrow-left-up"
              src={require("../../img/homepage/arrow-up-left.svg").default}
            />
            <img
              alt="pics"
              className="pics"
              src={require("../../img/homepage/pics.png").default}
            />
            <img
              alt="arrow-rotate"
              className="arrow-down-rotate"
              src={require("../../img/homepage/arrow-down.svg").default}
            />
            <img
              alt="title"
              className="title-product"
              src={require("../../img/homepage/title.png").default}
            />
            <img
              alt="map"
              className="map"
              src={require("../../img/homepage/map.png").default}
            />
            <img
              alt="arrow-right-down"
              className="arrow-right-down"
              src={require("../../img/homepage/arrow-right.svg").default}
            />
            <img
              alt="shell"
              className="shell"
              src={require("../../img/homepage/shell.png").default}
            />
          </div>

          {/* <img
            className="under"
            alt="background"
            style={{ width: "100%" }}
            // data-offset="0.7"
            src={require("../../img/world-tour-grey.svg")}
          /> */}
          {/* <Profiler id="LandingPage" onRender={this.onRenderCallback}> */}
          <Login />
          {/* </Profiler> */}
          <br />
          <Register />

          {/* <img
            id="cloud2"
            className="layer parallax cloud"
            alt="cloud2"
            data-offset="0.3"
            src={require("../../img/cloud.svg")}
          />
          <img
            id="cloud3"
            className="layer parallax cloud small"
            alt="cloud3"
            data-offset="0.4"
            src={require("../../img/cloud.svg")}
          />
          <img
            id="layer4"
            className="layer parallax"
            alt="layer4"
            data-offset="1"
            src={require("../../img/layer-4.svg")}
          />
          <img
            id="layer3"
            className="layer parallax"
            alt="layer3"
            data-offset="0.7"
            src={require("../../img/layer-3.svg")}
          />
          <img
            id="layer2"
            className="layer parallax"
            alt="layer2"
            data-offset="0.5"
            src={require("../../img/layer-2.svg")}
          />{" "}
          {/* <img
            id="logo"
            className="layer parallax"
            alt="logo"
            data-offset="2"
            width="200"
            src={require("../../img/logo.svg")}
          /> */}
          {/* <div id="container" />
          <img
            id="fg"
            className="layer"
            alt="fg"
            src={require("../../img/layer-1.svg")}
          /> */}
        </header>
        <section id="section_1">
          <div className="center-text">
            <h1>Find Journey Mate</h1>
            <div className="row">
              <div className="col-md-12">
                <p>
                  Eliminate your boredom while travelling. Find your journey
                  mate travelling to the same destination.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="section_2">
          <div className="center-text">
            <h1>Share Your Experience</h1>
            <div className="row">
              <div className="col-md-12">
                <p>Share your experience of travelling with the world.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="section_3">
          <div className="center-text">
            <h1>Stick Your Photo</h1>
            <div className="row">
              <div className="col-md-12">
                <p>
                  Stick your photo to the sticky wall of the memorable places.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="section_4">
          <div className="center-text">
            <h1>Become a Star</h1>
            <div className="row">
              <div className="col-md-12">
                <p>
                  Become popular tourist or choosed as best experience and pic
                  sharing for the journey
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      //{" "}
      // </Profiler>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
