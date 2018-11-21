import React, { Component } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { getLocation } from "../../actions/dashboardActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionList: [],
      searchQuery: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    const provider = new OpenStreetMapProvider();
    const searchQuery = e.target.value;
    provider.search({ query: e.target.value }).then(results => {
      console.log("results", results);
      this.setState({ suggestionList: results, searchQuery: searchQuery });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = { query: this.state.searchQuery };
    this.props.setMapCoordinate(this.state.suggestionList);
    this.props.getLocation(query);
  }

  render() {
    const { suggestionList } = this.state;
    let locationSuggestion;
    if (suggestionList.length > 0) {
      locationSuggestion = suggestionList.map((data, index) => {
        return <option key={"options" + index} value={data.label} />;
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <input
                className="glass"
                type="text"
                placeholder="Enter address"
                style={{ outline: "none" }}
                onChange={this.handleOnChange}
                list="locations"
                name="locations"
              />
              <button className="btn btn-primary" type="submit">
                <i className="fa fa-search" aria-hidden="true" />
              </button>
              <datalist id="locations">{locationSuggestion}</datalist>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

MapSearch.propTypes = {
  getLocation: PropTypes.func.isRequired
};

export default connect(
  null,
  { getLocation }
)(MapSearch);
