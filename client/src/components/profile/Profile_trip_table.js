import React from "react";
import moment from "moment";

export default ({ trips }) => {
  let experienceData;
  if (trips.length !== 0) {
    experienceData = trips.map((data, index) => {
      return (
        <tr keys={index + 1}>
          <td className="text-center">{index + 1}</td>
          <td>{data.start}</td>
          <td>{data.destination}</td>
          <td>{moment(data.to).format("DD-MM-YYYY")}</td>
          <td>{moment(data.from).format("DD-MM-YYYY")}</td>
          <td>{data.startTime}</td>
          <td>{data.endTime}</td>
          <td>{data.experience}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="profile-title text-left">Travel History</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Start</th>
                    <th>Destination</th>
                    <th>To</th>
                    <th>From</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Experience</th>
                  </tr>
                </thead>
                <tbody>{experienceData}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
