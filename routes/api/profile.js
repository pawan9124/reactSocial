const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Trip = require("../../models/Trip");
const validateProfileInput = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/src/imageUploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

//@route GET api/profile/all
//@desc GET  all profiles
//@access Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});
//@route GET api/profile/handle/:handle
//@desc GET profile by handle
//@access Public
router.get("/handle/:id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/profile/handle/:handle
//@desc GET profile by handle
//@access Public
router.post(
  "/handle/:id",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateProfileInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    Profile.findOne({ user: req.params.id })
      .then(profile => {
        let imagePath;
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        //Getting the fields
        if (req.file !== undefined) imagePath = req.file.filename;

        const profileFields = {};
        profileFields.location = {};
        profileFields.social = {};
        if (req.body.country !== undefined)
          profileFields.location.country = req.body.country;
        if (req.body.city !== undefined)
          profileFields.location.city = req.body.city;
        if (req.body.facebook !== undefined)
          profileFields.social.facebook = req.body.facebook;
        if (req.body.instagram !== undefined)
          profileFields.social.instagram = req.body.instagram;
        if (req.body.twitter !== undefined)
          profileFields.social.twitter = req.body.twitter;
        if (req.body.youtube !== undefined)
          profileFields.social.youtube = req.body.youtube;
        if (req.body.linkedIn !== undefined)
          profileFields.social.linkedIn = req.body.linkedIn;
        if (req.body.markWords !== undefined)
          profileFields.markWords = req.body.markWords;
        if (req.body.name !== undefined)
          profileFields.name = req.body.profileName;

        const userFields = {};
        if (req.body.name !== undefined) userFields.name = req.body.name;
        if (imagePath !== undefined) userFields.avatar = imagePath;
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: userFields }
        ).then(user => {
          Profile.findOneAndUpdate(
            { user: req.params.id },
            { $set: profileFields }
          )
            .populate("user", ["name", "avatar"])
            .then(profile => {
              res.json(profile);
            });
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/profile/handle/:handle
//@desc GET profile by handle
//@access Public
router.get("/handleTrip/:id", (req, res) => {
  const errors = {};
  Trip.find({})
    .populate("user", ["name", "avatar"])
    .then(trips => {
      if (trips.length === 0) {
        errors.noprofile = "There is trip for this user";
        res.status(404).json(errors);
      }
      const userTrips = [];
      for (let i = 0; i < trips.length; i++) {
        if (trips[i].user._id.equals(req.params.id)) {
          userTrips.push(trips[i]);
        }
      }
      res.json(userTrips);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/user/:user_id
//@desc GET profile by id
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route GET api/profile
//@desc Fetch profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile
//@desc Create or update a new profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      //Returns any errors with 400 status
      return res.status(400).json(errors);
    }
    //Getting the fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills- Split into array
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          //save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route POST api/experience
//@desc Add expericence
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        res.status(404).json({ profile: "Profile not found" });
      }
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST api/experience
//@desc Add expericence
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        res.status(404).json({ profile: "Profile not found" });
      }
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc  Delete experience from profile
//@access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get the remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc  Delete education from profile
//@access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get the remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/profile
//@desc  Delete user and profile
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
