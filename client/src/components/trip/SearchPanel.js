import React, { Component } from "react";
import LocationSearchBox from "../common/LocationSearchBox";
import { connect } from "react-redux";
import DatePicker from "../common/DatePicker";
import TimeInput from "material-ui-time-picker";
import moment from "moment";
import PropTypes from "prop-types";
import { getSearchedTrips } from "../../actions/tripActions";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      searchStart: "",
      searcDestination: ""
    };
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.searchTrips = this.searchTrips.bind(this);
  }

  handleSubmit(e) {
    e.preventDeafult();
  }

  searchTrips() {
    console.log("Tisss", this.state);
    this.props.getSearchedTrips(this.state);
  }
  handleChange(time, name) {
    const convertime = moment(time).format("hh:mm a");
    this.setState({ [name]: convertime });
  }

  setLocation(title, value) {
    this.setState({ [title]: value });
  }

  setDate(e) {
    this.setState({ [e.target.name]: new Date(e.target.value) });
  }

  render() {
    return (
      <div className="container mt-5 form-group">
        <div className="row">
          <div className=" col-md-3 ">
            <label>Select trip date:</label>
          </div>
          <div className=" col-md-4  ">
            <DatePicker
              dateName={"from"}
              setDate={this.setDate}
              label={"From:"}
            />
            {/* <span className="mt-5 pl-2">
              <TimeInput
                mode="12h"
                value={this.state.time}
                name="startTime"
                onChange={(time, e) => this.handleChange(time, "startTime")}
              />
            </span> */}
          </div>
          <div className=" col-md-4">
            <DatePicker dateName={"to"} setDate={this.setDate} label={"To:"} />
            {/* <span className="mt-3 pl-2">
              <TimeInput
                mode="12h"
                value={this.state.time}
                name="endTime"
                onChange={time => this.handleChange(time, "endTime")}
              />
            </span> */}
          </div>
          <div className="col-md-1 mt-3" />
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-md-3  ">
            <label>Select location:</label>
          </div>
          <div className="col-md-4  ">
            <label>Start:</label>
            <LocationSearchBox
              showButton={false}
              name={"searchStart"}
              setLocation={this.setLocation}
              placeholder={"Enter Start Location"}
            />
          </div>
          <div className="col-md-4  ">
            <label>Destination:</label>
            <LocationSearchBox
              showButton={false}
              name={"searchDestination"}
              setLocation={this.setLocation}
              placeholder={"Enter Destination Location"}
            />
          </div>
        </div>
        {this.props.showButton ? (
          <div className="row mt-5">
            <div className="col-md-12">
              <center>
                <button
                  type="button"
                  onClick={this.searchTrips}
                  className="btn btn-primary"
                >
                  Search
                </button>
              </center>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

SearchPanel.propTypes = {
  getSearchedTrips: PropTypes.func.isRequired
};

export default connect(
  null,
  { getSearchedTrips }
)(SearchPanel);
