import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LocationSearchBox from "../common/LocationSearchBox";
import DatePicker from "../common/DatePicker";
import { addTrip } from "../../actions/tripActions";
import TimeInput from "material-ui-time-picker";
import moment from "moment";

class CreateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travellers: "",
      searchLocation: "",
      start: "",
      destination: "",
      startTime: "",
      endTime: "",
      from: "",
      to: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.createTrip = this.createTrip.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  createTrip(e) {
    const tripData = this.state;
    const userId = this.props.auth.user.id;
    const postData = {
      from: tripData.from,
      startTime: tripData.startTime,
      to: tripData.to,
      endTime: tripData.endTime,
      start: tripData.start,
      destination: tripData.destination,
      travellers: tripData.travellers,
      userId: userId
    };
    this.props.addTrip(postData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setLocation(title, value) {
    this.setState({ [title]: value });
  }

  setDate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(time, name) {
    const convertime = moment(time).format("hh:mm a");
    this.setState({ [name]: convertime });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="mt-5">
        <button
          type="button"
          className="ml-5 btn btn-primary"
          data-toggle="modal"
          data-target="#createTrip"
        >
          Create Trip
        </button>

        <div id="createTrip" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content card card-register">
              <div className="modal-header card-header">
                <img
                  className="card-img"
                  src="../assets/img/square1.png"
                  alt="Card image1"
                />
                <h5
                  className="modal-title card-title"
                  style={{ fontSize: "3em", textTransform: "none" }}
                >
                  Create Trip
                </h5>
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
                <div className="container">
                  <hr />
                  <div className="row mt-3">
                    <div className=" col-sm-12 ">
                      <label>Select trip date:</label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <DatePicker
                        dateName={"from"}
                        label={"From:"}
                        setDate={this.setDate}
                      />
                    </div>
                    <div className="col-sm-6 mt-3">
                      <TimeInput
                        mode="12h"
                        value={this.state.time}
                        name="startTime"
                        onChange={(time, e) =>
                          this.handleChange(time, "startTime")
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <DatePicker
                        dateName={"to"}
                        label={"To:"}
                        setDate={this.setDate}
                      />
                    </div>
                    <div className="col-sm-6 mt-3">
                      <TimeInput
                        mode="12h"
                        value={this.state.time}
                        name="endTime"
                        onChange={time => this.handleChange(time, "endTime")}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <label>Enter location:</label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <LocationSearchBox
                        showButton={false}
                        name={"start"}
                        setLocation={this.setLocation}
                        placeholder={"Enter Start Location"}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <LocationSearchBox
                        showButton={false}
                        name={"destination"}
                        setLocation={this.setLocation}
                        placeholder={"Enter Destination Location"}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-sm-5">
                      <label>No of travellers:</label>
                    </div>
                    <div className="col-sm-7">
                      <select
                        name="travellers"
                        className="custom-select"
                        onChange={this.onChange}
                      >
                        <option defaultValue>Travellers</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3 mt-4 mb-4">
                    <div className="col-md-6">
                      <button
                        id="closeModalLocation"
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-info btn-block"
                        onClick={this.createTrip}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateLocation.propTypes = {
  // errors: PropTypes.object.isRequired,
  // addTrip: PropTypes.func.isRequired
};

const mapPropsToState = state => ({
  errors: state.errors,
  trip: state.trip,
  auth: state.auth
});
export default connect(
  mapPropsToState,
  { addTrip }
)(CreateLocation);
