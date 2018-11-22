import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LocationSearchBox from "../common/LocationSearchBox";
import DateAndTimePickers from "../common/DateAndTimePickers";
import SelectDropdown from "../common/SelectDropdown";

class CreateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarvellers: "",
      searchLocation: "",
      from: "",
      to: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setDate = this.setDate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    console.log("EREE", e);
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    const fd = new FormData();
    fd.append();
    e.preventDefault();

    this.props.addLocation(fd);
  }
  setMapCoordinate(location) {
    console.log("SETMAP", location);
    this.setState({ searchLocation: location[0] });
    setTimeout(() => {
      this.locateMap();
    }, 500);
  }

  setDate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    console.log("THISSTE", this.state);
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

        <div
          className="modal fade"
          id="createTrip"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="createTrip"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="p-1">
                      <h3 className="display-4 text-center">Create Trip</h3>
                      <p className="lead text-center">
                        Plan your trip to make people join you
                      </p>
                      <div className="row">
                        <div className=" col-sm-12 ">
                          <label>Select trip date:</label>
                        </div>
                        <div className=" col-sm-12  ">
                          <DateAndTimePickers
                            dateName={"from"}
                            label={"From:"}
                            setDate={this.setDate}
                          />
                        </div>
                        <div className=" col-sm-12">
                          <DateAndTimePickers
                            dateName={"to"}
                            label={"To:"}
                            setDate={this.setDate}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row mt-2">
                        <div className="col-sm-12  ">
                          <label>Select location:</label>
                        </div>
                        <div className="col-sm-12  ">
                          <label>Start:</label>
                          <LocationSearchBox
                            showButton={false}
                            setMapCoordinate={this.setMapCoordinate}
                          />
                        </div>
                        <div className="col-sm-12  ">
                          <label>Destination:</label>
                          <LocationSearchBox
                            showButton={false}
                            setMapCoordinate={this.setMapCoordinate}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row mt-2">
                        <div className="col-sm-4">
                          <label>No of travellers:</label>
                        </div>
                        <div className="col-sm-5">
                          <select
                            name="tarvellers"
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
                      <div className="row mt-4 mb-4">
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
                          <input
                            type="submit"
                            className="btn btn-info btn-block"
                          />
                        </div>
                      </div>
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
  errors: PropTypes.object.isRequired
};

const mapPropsToState = state => ({
  errors: state.errors
});
export default connect(
  mapPropsToState,
  {}
)(CreateLocation);
