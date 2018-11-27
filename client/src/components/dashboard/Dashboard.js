import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getTopLocations } from "../../actions/dashboardActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import CreateLocation from "./CreateLocation";
import CardDisplay from "../common/CardDisplay";
import MapDisplay from "../map/MapDisplay";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getTopLocations();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { locations, loading } = this.props.dashboard;
    const { profile } = this.props.profile;

    let dashboardContent;
    let spinner;
    if (locations.length === 0 || loading) {
      spinner = true;
    } else {
      //Check if logged in user has profile data
      if (profile !== null) {
        if (Object.keys(profile).length > 0) {
          spinner = false;
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              {/* <ProfileActions /> */}
              {/* <Experience experience={profile.experience} /> */}
              {/* <Education education={profile.education} /> */}
              {/* <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div> */}
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
    }
    return (
      <div className="dashboard">
        {spinner ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
                <div height="500" width="500">
                  <MapDisplay />
                  <div>
                    <hr />
                    <CreateLocation placeholder={"Enter Location"} />
                  </div>
                  <hr />
                  <div className="row">
                    <CardDisplay locations={locations} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getTopLocations }
)(Dashboard);
