import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchPanel from "./SearchPanel";
import TableDisplay from "../common/TableDisplay";
import CreateTripPlan from "./CreateTripPlan";
import { getTrips } from "../../actions/tripActions";
import Spinner from "../common/Spinner";

let counter = 0;

class Trip extends Component {
  componentDidMount() {
    this.props.getTrips();
  }

  createData(user, start, destination, from, to, startTime, endTime, join) {
    counter += 1;
    return {
      id: counter,
      user,
      start,
      destination,
      from,
      to,
      startTime,
      endTime,
      join
    };
  }

  render() {
    const { trips, loading } = this.props.trip;
    console.log("TRIPS", trips);
    let tableData = [];
    let displayHolder;
    if (loading) {
      displayHolder = <Spinner />;
    } else {
      trips.map(data => {
        return tableData.push(
          this.createData(
            data.user,
            data.start,
            data.destination,
            data.from,
            data.to,
            data.startTime,
            data.endTime,
            data.join
          )
        );
      });
      displayHolder = <TableDisplay trips={tableData} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2> Plan Trip </h2>
          </div>
          <div className="col-md-2">
            <CreateTripPlan />
          </div>
        </div>
        <div className="row">
          <SearchPanel showButton={true} />
        </div>
        <hr />
        <div className="row">
          <h4>Travellers List</h4>
          {displayHolder}
        </div>
      </div>
    );
  }
}

Trip.propTypes = {
  getTrips: PropTypes.func.isRequired
};

const mapPropsToState = state => ({
  trip: state.trip
});
export default connect(
  mapPropsToState,
  { getTrips }
)(Trip);
