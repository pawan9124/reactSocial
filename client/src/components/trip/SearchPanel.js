import React, { Component } from "react";
import LocationSearchBox from "../common/LocationSearchBox";
import DateAndTimePickers from "../common/DateAndTimePickers";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: ""
    };
    this.setMapCoordinate = this.setMapCoordinate.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setMapCoordinate(location) {
    console.log("SETMAP", location);
    this.setState({ searchLocation: location[0] });
    setTimeout(() => {
      this.locateMap();
    }, 500);
  }

  handleSubmit(e) {
    e.preventDeafult();
  }

  setDate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container mt-5 form-group">
        <div className="row">
          <div className=" col-md-3 ">
            <label>Select trip date:</label>
          </div>
          <div className=" col-md-4  ">
            <DateAndTimePickers
              dateName={"from"}
              setDate={this.setDate}
              label={"From:"}
            />
          </div>
          <div className=" col-md-4">
            <DateAndTimePickers
              dateName={"to"}
              setDate={this.setDate}
              label={"To:"}
            />
          </div>
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
              setMapCoordinate={this.setMapCoordinate}
            />
          </div>
          <div className="col-md-4  ">
            <label>Destination:</label>
            <LocationSearchBox
              showButton={false}
              setMapCoordinate={this.setMapCoordinate}
            />
          </div>
        </div>
        {this.props.showButton ? (
          <div className="row mt-5">
            <div className="col-md-12">
              <center>
                <button type="submit" className="btn btn-primary">
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

export default SearchPanel;
