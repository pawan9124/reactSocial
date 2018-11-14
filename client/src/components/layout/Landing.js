import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
// import "../../parallax.js";
import { ReactComponent as Path } from "../../img/3-path.svg";
import ImageGallery from "../common/ImageGallery";
import Gallery from "react-grid-gallery";

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" }
    ],
    caption: "Boats (Jeshu John - designerspics.com)"
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg"
  }
];

class Landing extends Component {
  constructor() {
    super();
    this.state = { showImage: false };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //redirect the user
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <ImageGallery images={IMAGES} />
        {/* <Gallery images={IMAGES} /> */}
      </div>
    );

    //  <header>
    //     <img
    //       id="cloud1"
    //       className="layer parallax cloud small"
    //       alt="cloud1"
    //       data-offset="0.7"
    //       src={require("../../img/cloud.svg")}
    //     />
    //     <img
    //       id="cloud2"
    //       className="layer parallax cloud"
    //       alt="cloud2"
    //       data-offset="0.3"
    //       src={require("../../img/cloud.svg")}
    //     />
    //     <img
    //       id="cloud3"
    //       className="layer parallax cloud small"
    //       alt="cloud3"
    //       data-offset="0.4"
    //       src={require("../../img/cloud.svg")}
    //     />

    //     <img
    //       id="layer4"
    //       className="layer parallax"
    //       alt="layer4"
    //       data-offset="1"
    //       src={require("../../img/layer-4.svg")}
    //     />
    //     <img
    //       id="layer3"
    //       className="layer parallax"
    //       alt="layer3"
    //       data-offset="0.7"
    //       src={require("../../img/layer-3.svg")}
    //     />
    //     <img
    //       id="layer2"
    //       className="layer parallax"
    //       alt="layer2"
    //       data-offset="0.5"
    //       src={require("../../img/layer-2.svg")}
    //     /> */
    // <img id="logo" className="layer parallax" alt="logo" data-offset="2" width="200" src={require("../../img/logo.svg")}/>
    // <div id="container" />
    //   <img
    //     id="fg"
    //     className="layer"
    //     alt="fg"
    //     src={require("../../img/layer-1.svg")}
    //   />
    // </header>
    // <section id="section1">
    //   <canvas id="canvas" width="460" height="460" />
    // </section>
    // <section id="section3">
    //   <img
    //     className="layer layer2"
    //     src={require("../../img/3-bg.svg")}
    //     alt=""
    //   />
    //   <img
    //     id="light"
    //     className="abs"
    //     src={require("../../img/2-light.png")}
    //     alt=""
    //   />
    //   <img
    //     className="layer layer2"
    //     src={require("../../img/3-mask.svg")}
    //     alt=""
    //   />
    //   <Path />
    // </section>
    // <div id="triggerStatus" />
    // <section>
    //   <div id="square" data-inview="" />
    // </section>
    // <section />
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
