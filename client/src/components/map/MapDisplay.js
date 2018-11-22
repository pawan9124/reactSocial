import React, { Component } from "react";
import L from "leaflet";
import LocationSearchBox from "../common/LocationSearchBox";

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocation: {}
    };
    this.setMapCoordinate = this.setMapCoordinate.bind(this);
    this.locateMap = this.locateMap.bind(this);
  }

  componentDidMount() {
    this.locateMap();
  }

  locateMap() {
    //  Define search controls
    const mapData = this.state.searchLocation;
    console.log("MAPADATA", mapData);
    let obj;
    if (mapData === null || Object.keys(mapData).length === 0) {
      obj = {
        label: "World",
        x: 0.0,
        y: 0.0,
        setView: 2
      };
    } else {
      obj = {
        label: mapData.label,
        x: mapData.x,
        y: mapData.y,
        setView: 12
      };
    }
    console.log("OBE", obj);
    const markerIcons = L.icon({
      iconUrl: require("../../img/marker-icon.png"),
      shadowUrl: require("../../img/marker-shadow.png"),
      iconSize: [25, 41] // size of the icon
    });

    document.getElementById("mapContainer").innerHTML = "";
    document.getElementById("mapContainer").innerHTML =
      "<div id='map' style='width: 100%; height: 100%;'></div>";
    const map = L.map("map", {
      maxZoom: 18,
      zoom: 17,
      zoomControl: false
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(map);

    var featureGroup = new L.featureGroup();
    L.marker(new L.LatLng(obj.y, obj.x), { icon: markerIcons })
      .bindPopup(obj.label)
      .on("mouseover", function(e) {
        this.openPopup();
      })
      .addTo(featureGroup);
    map.addLayer(featureGroup);
    map.setView([obj.y, obj.x], obj.setView);
  }

  setMapCoordinate(location) {
    console.log("SETMAP", location);
    this.setState({ searchLocation: location[0] });
    setTimeout(() => {
      this.locateMap();
    }, 500);
  }

  render() {
    return (
      <div className="container">
        <LocationSearchBox
          showButton={true}
          setMapCoordinate={this.setMapCoordinate}
        />
        <div className="row" style={{ marginTop: "20" }}>
          <div className="col-md-12">
            <div id="mapContainer" />
          </div>
        </div>
      </div>
    );
  }
}

export default MapDisplay;
