const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 7000;
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const profile = require("./routes/api/profile");
const userAuth = require("./routes/api/userAuth");
const userPost = require("./routes/api/post");
const dashboard = require("./routes/api/dashboard");
const trip = require("./routes/api/trip");
const passport = require("passport");

//middleware for using the body-parser
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//connect to the db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

//Passport middleware
app.use(passport.initialize());
// app.use(cors);

//Passport Config
require("./config/passport")(passport);

//App use
app.use("/api/profile", profile);
app.use("/api/userAuth", userAuth);
app.use("/api/posts", userPost);
app.use("/api/dashboard", dashboard);
app.use("/api/trip", trip);

app.use(express.static("client/src/imageUploads"));

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`The port is lisenting on:${port}`));
