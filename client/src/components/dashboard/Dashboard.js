import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getTopLocations } from "../../actions/dashboardActions";
import Spinner from "../common/Spinner";
import CreateLocation from "./CreateLocation";
import CardDisplay from "../common/CardDisplay";
import MapDisplay from "../map/MapDisplay";
import { createDatabase, createTableAndRow } from "../../cache";

class Dashboard extends Component {
  componentDidMount() {
    console.time("fetching Profile");
    this.props.getCurrentProfile();
    this.props.getTopLocations();
    createDatabase("dashboard", "props", "id").then(result => {
      createTableAndRow(result, "props", this.props.auth);
      createTableAndRow(result, "props", this.props.dashboard);
      createTableAndRow(result, "props", this.props.profile);
    });
    console.timeEnd("fetching Profile");
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    console.time("renderingDashboard");
    console.log("Props", this.props);
    const { user } = this.props.auth;
    const { locations, loading } = this.props.dashboard;
    const { profile } = this.props.profile;

    let dashboardContent;
    let spinner;
    if (locations.length === 0 || loading) {
      spinner = true;
    }
    //Check if logged in user has profile data
    if (profile !== null) {
      if (Object.keys(profile).length > 0) {
        spinner = false;
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${user.id}`}>{user.name}</Link>
            </p>
          </div>
        );
      }
    } else {
      //User is logged in but has no profile
      spinner = false;
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
    return (
      <div className="dashboard">
        <div className=" page-header" style={{ marginTop: "5%" }}>
          <img
            alt="image1"
            src={require("../../img/blob.png").default}
            className="path"
          />
          <img
            alt="image2"
            src={require("../../img/path2.png").default}
            className="path2"
          />
          <img
            alt="image3"
            src={require("../../img/triunghiuri.png").default}
            className="shapes triangle"
            style={{ top: "76%" }}
          />
          <img
            alt="image4"
            src={require("../../img/waves.png").default}
            className="shapes wave"
            style={{ top: "0%", left: "0%" }}
          />
          <img
            alt="image6"
            src={require("../../img/cercuri.png").default}
            className="shapes circle"
            style={{ top: "0%", left: "25%" }}
          />
          <div className="container wrapper">
            <div className="row mt-3">
              <div className="col-md-12">
                {dashboardContent}
                <div height="500" width="500">
                  <MapDisplay />
                  <div>
                    <hr />
                    <CreateLocation placeholder={"Enter Location"} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        {spinner ? (
          <Spinner />
        ) : (
          <div className="section section-lg" style={{ paddingTop: "35px" }}>
            {locations.length !== 0 ? (
              <div>
                <img
                  alt="image1"
                  src={require("../../img/path4.png").default}
                  className="path"
                  style={{ left: "0px" }}
                />
                <img
                  alt="image2"
                  src={require("../../img/path4.png").default}
                  className="path"
                  style={{ top: "260px" }}
                />
                <div className="container">
                  <div className="row">
                    <CardDisplay locations={locations} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
        {console.timeEnd("renderingDashboard")}
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  dashboard: state.dashboard
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getTopLocations
})(Dashboard);
