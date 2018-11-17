import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };

    this.mapRef = createRef();
  }

  handleClick = () => {
    const map = this.mapRef.current;
    if (map !== null) {
      map.leafletElement.locate();
    }
  };

  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null;
    console.log("DATA FOR THE CHAMP");
    return (
      <Map
        center={this.state.latlng}
        length={4}
        style={{ width: "100%", height: "400px" }}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoom={13}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
      </Map>
    );
  }
}

export default MapDisplay;
