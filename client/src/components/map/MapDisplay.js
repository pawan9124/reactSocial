import React, { Component } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionList: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.locateMap();
  }
  handleOnChange(e) {
    const provider = new OpenStreetMapProvider();
    provider.search({ query: e.target.value }).then(results => {
      this.setState({ suggestionList: results });
    });
  }

  locateMap() {
    //  Define search controls
    const markerIcons = L.icon({
      iconUrl: require("../../img/marker-icon.png"),
      shadowUrl: require("../../img/marker-shadow.png"),
      iconSize: [25, 41] // size of the icon
    });

    const map = L.map("mapContainer", {
      maxZoom: 18,
      zoom: 17,
      zoomControl: false
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(map);

    var featureGroup = new L.featureGroup();
    L.marker(new L.LatLng(52.0852378, 5.3846249), { icon: markerIcons })
      .bindPopup("BING")
      .on("mouseover", function(e) {
        this.openPopup();
      })
      .addTo(featureGroup);
    map.addLayer(featureGroup);
    map.setView([56.246108, -100.5256652], 4);
  }
  handleLocation(data) {
    console.log("handleLocationData==>", data);
  }

  render() {
    const { suggestionList } = this.state;
    let locationSuggestion;
    if (suggestionList.length > 0) {
      locationSuggestion = suggestionList.map((data, index) => {
        return (
          <option
            key={"options" + index}
            onClick={this.handleLocation.bind(this, data)}
            value={data.label}
          />
        );
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <input
              className="glass"
              type="text"
              placeholder="Enter address"
              style={{ outline: "none" }}
              onChange={this.handleOnChange}
              list="locations"
              name="locations"
            />
            <datalist id="locations">{locationSuggestion}</datalist>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20" }}>
          <div className="col-md-12">
            <div id="mapContainer" />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchMap;
