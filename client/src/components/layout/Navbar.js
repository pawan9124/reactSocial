import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="nav nav-tabs nav-tabs-white ml-auto">
        <li className="nav-item p-0">
          <Link to={`/profile/${user.id}`}>
            {user.avatar !== undefined ? (
              <img
                src={require("../../imageUploads/" + user.avatar)}
                alt={user.name}
                style={{ width: "50px" }}
                className="img-center img-fluid rounded-circle"
                title={user.name}
              />
            ) : null}
          </Link>
        </li>
        <li className="nav-item active p-0">
          <a
            href="/#/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link "
            style={{ display: "block" }}
            role="tablist"
          >
            <i className="tim-icons icon-button-power" />
            Logout
          </a>
        </li>
      </ul>
    );
    return (
      <div>
        {isAuthenticated ? (
          <nav
            className="navbar navbar-expand-sm bg-danger mb-3"
            style={{ height: "65px" }}
          >
            <div className="container">
              <ul className="nav nav-tabs nav-tabs-white" role="tablist">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/dashboard"
                    role="tablist"
                  >
                    <i className="tim-icons icon-spaceship" /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/trip" role="tablist">
                    <i className="tim-icons icon-compass-05" /> Trip
                  </Link>
                </li>
              </ul>

              <div className="collapse navbar-collapse" id="mobile-nav">
                {authLinks}
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
