const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Trip = require("../../models/Trip");
const validateCreateTrip = require("../../validator/trip");
const moment = require("moment");

//@route POST api/trip
//@desc  Create trip
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCreateTrip(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const tripData = new Trip({
      from: req.body.from,
      startTime: req.body.startTime,
      to: req.body.to,
      endTime: req.body.endTime,
      start: req.body.start,
      destination: req.body.destination,
      travellers: req.body.travellers,
      user: req.body.userId
    });

    tripData
      .save()
      .then(trip => res.json(trip))
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/trip
//@desc  GET trip
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trip.find({ from: { $gte: moment(Date.now()).format("YYYY-MM-DD") } })
      .sort({ from: 1 })
      .populate("user", ["name", "avatar"])
      .then(trips => {
        res.json(trips);
      })
      .catch(err => res.status(404).json({ nopostsfound: "No Trips found" }));
  }
);

function compareStringPercentage(stringCompare, stringToCompare) {
  stringToCompare = stringToCompare.split(",");
  stringCompare = stringCompare.split(",");
  const stringToCompareLength = stringToCompare.length / 2;
  let count = 0;
  for (let i = 0; i < stringCompare.length; i++) {
    if (stringToCompare.indexOf(stringCompare[i]) > -1) {
      count++;
    }
  }
  if (count >= stringToCompareLength) {
    return true;
  } else {
    return false;
  }
}

//@route GET api/trips
//@desc  GET trips
//@access Private
router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCreateTrip(req.body, false);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Trip.find({
      $and: [
        { from: { $gte: moment(req.body.from).format("YYYY-MM-DD") } },
        { to: { $lte: moment(req.body.to).format("YYYY-MM-DD") } }
      ]
    })
      .sort({ from: 1 })
      .populate("user")
      .then(trips => {
        const returnData = [];
        trips.forEach(data => {
          if (
            compareStringPercentage(data.start, req.body.searchStart) &&
            compareStringPercentage(
              data.destination,
              req.body.searchDestination
            )
          ) {
            returnData.push(data);
          }
        });
        res.json(returnData);
      })
      .catch(err => {
        res.status(404).json({ nopostsfound: "No Trips found" });
      });
  }
);

module.exports = router;
