import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //redirect the user
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  closeModal() {
    let modal = document.getElementById("loginPage");
    modal.style.display = "none";
  }

  render() {
    const { errors } = this.state;
    // console.log("ERRORS", errors);
    return (
      <div id="loginPage" className="modal over" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content card card-register">
            <div className="modal-header card-header">
              <img
                className="card-img"
                src="../assets/img/square1.png"
                alt="Card image1"
              />
              <h5 className="modal-title card-title">Login</h5>
              <button
                type="button"
                onClick={this.closeModal}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body card-body">
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="tim-icons icon-single-02" />
                      </div>
                    </div>
                    <TextFieldGroup
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                  </div>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="tim-icons icon-email-85" />
                      </div>
                    </div>
                    <TextFieldGroup
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { loginUser }
)(withRouter(Login));
