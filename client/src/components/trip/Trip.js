import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchPanel from "./SearchPanel";
import TableDisplay from "../common/TableDisplay";
import CreateTripPlan from "./CreateTripPlan";

class Trip extends Component {
  render() {
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
          <TableDisplay />
        </div>
      </div>
    );
  }
}
export default Trip;
