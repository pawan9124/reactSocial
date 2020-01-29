import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./scripts";
console.log("HOLLAL");
ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then(reg => console.log("Service worker registered", reg))
    .catch(err => console.log("Servicw worker not registered", err));

  // Then later, request a one-off sync:
  navigator.serviceWorker.ready.then(function(swRegistration) {
    console.log("SYNCED---RESGIESTERE");
    return swRegistration.sync.register("myFirstSync");
  });
}
