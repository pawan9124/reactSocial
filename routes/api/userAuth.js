const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");

//@route GET api/usersAuth/test
//@desc Tests users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@route GET api/usersAuth/register
//@desc register users route
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    } else {
      const avatar = "blank_profile.svg";

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar,
        date: Date.now()
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const newProfile = new Profile({
                user: user._id,
                location: {
                  country: "",
                  state: "",
                  city: ""
                },
                travelTrust: "",
                tours: "",
                popularity: "",
                travelCredits: "",
                markWords: "",
                social: {
                  youtube: "",
                  twitter: "",
                  facebook: "",
                  linkedin: "",
                  instagram: ""
                }
              });
              newProfile.save().then(profile => {
                res.json(user);
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route GET api/usersAuth/login
//@desc login users route
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not Found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token //provide in concatenation
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/usersAuth/current
//@desc get the current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
