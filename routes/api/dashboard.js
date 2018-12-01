const express = require("express");
const router = express.Router();
const Locations = require("../../models/Locations");
const Zipcode = require("../../models/Zipcode");
const passport = require("passport");
const validateLocations = require("../../validator/locations");
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

//@route GET api/posts
//@desc GET Location
//@access Public
router.get("/", (req, res) => {
  Locations.find()
    .sort({ country: -1 })
    .limit(20)
    .then(locations => {
      res.json(locations);
    })
    .catch(err =>
      res.status(404).json({ noLocationsFound: "None Locations found" })
    );
});

//@route GET api/posts
//@desc Get Location
//@access Public
router.get("/:id", (req, res) => {
  Locations.findById(req.params.id)
    .then(location => res.json(location))
    .catch(err =>
      res.status(404).json({ noLocationFound: "No Location found" })
    );
});

//@route Post api/dashboard/:country
//@desc Post post by country
//@access Private
router.post("/", (req, res) => {
  if (req.body.query !== undefined) {
    const reqQuery = req.body.query.split(",");
    for (let i = 0; i < reqQuery.length; i++) {
      reqQuery[i] = reqQuery[i].trim().toLowerCase();
    }

    Locations.find({})
      .then(locations => {
        const sendLocations = [];
        locations.forEach(element => {
          if (
            reqQuery.indexOf(element.country) > -1 ||
            reqQuery.indexOf(element.state) > -1 ||
            reqQuery.indexOf(element.city) > -1
          ) {
            sendLocations.push(element);
          }
        });
        res.json(sendLocations);
      })
      .catch(err =>
        res.status(404).json({ noLocationsFound: "No Location Found" })
      );
  } else {
    res.status(404).json({ locationNotFound: "Location Not Found" });
  }
});

//@route Post api/posts
//@desc GET post
//@access Private
router.post(
  "/createLocation",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLocations(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Zipcode.findOne({ zipcode: req.body.zipcode }).then(zip => {
      if (zip !== null && zip !== undefined && zip !== "") {
        res.status(404).json({ zipcode: "Zipcode already registred" });
      } else {
        const imagePath = req.file.filename;
        const newLocations = new Locations({
          country: req.body.country.trim().toLowerCase(),
          state:
            req.body.state !== undefined
              ? req.body.state.trim().toLowerCase()
              : "",
          city: req.body.city.trim().toLowerCase(),
          zipcode: req.body.zipcode,
          image: imagePath,
          description: req.body.description
        });
        new Zipcode({ zipcode: req.body.zipcode })
          .save()
          .then(zipcode =>
            newLocations.save().then(location => res.json(location))
          );
      }
    });
  }
);

//@route DELETE api/posts/:id
//@desc DELETE post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for the owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST api/posts/like/:id
//@desc Like Post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User already Liked this post" });
          }

          //Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc Unlike Post
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not liked this post" });
          }

          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          //save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);
        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc DELETE comment from post
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment.id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(400).json({ commentnotfound: "Comment not found" });
        }

        const removeIndex = post.comments
          .map(comment => comment.id.toString)
          .indexOf(req.params.comment_id);

        //remove index
        post.comments.splice(removeIndex, 1);
        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
