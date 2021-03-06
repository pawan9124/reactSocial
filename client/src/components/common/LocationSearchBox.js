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
      if (this.props.setLocation !== undefined) {
        this.props.setLocation(this.props.name, searchQuery);
      }
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
    const { name, placeholder } = this.props;
    let locationSuggestion;
    if (suggestionList.length > 0) {
      locationSuggestion = suggestionList.map((data, index) => {
        return <option key={"options" + index} value={data.label} />;
      });
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-10 no-padding mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={placeholder}
                style={{ outline: "none" }}
                onChange={this.handleOnChange}
                list={name}
                name={name}
              />
              <datalist id={name}>{locationSuggestion}</datalist>
            </div>
            <div className="col-md-2 no-padding mb-3">
              {this.props.showButton ? (
                <button
                  style={{ width: "100%", marginTop: "-1px" }}
                  className="btn btn-primary"
                  type="submit"
                >
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </form>
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
