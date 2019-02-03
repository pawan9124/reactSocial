import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

const Navbar = lazy(() => import("./components/layout/Navbar"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Landing = lazy(() => import("./components/layout/Landing"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const PrivateRoute = lazy(() => import("./components/common/PrivateRoute"));
const CreateProfile = lazy(() =>
  import("./components/create-profile/CreateProfile")
);
const EditProfile = lazy(() => import("./components/edit-profile/EditProfile"));
const AddExperience = lazy(() =>
  import("./components/add-credentials/AddExperience")
);
const AddEducation = lazy(() =>
  import("./components/add-credentials/AddEducation")
);
const Profiles = lazy(() => import("./components/profiles/Profiles"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Posts = lazy(() => import("./components/posts/Posts"));
const Post = lazy(() => import("./components/post/Post"));
const Trip = lazy(() => import("./components/trip/Trip"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check if the token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profiles
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="App">
              <Route exact path="/" component={Landing} />
              <div>
                <Navbar />

                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/profile/:handle"
                    component={Profile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/feed/:city" component={Posts} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/trip" component={Trip} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
              <Footer />
            </div>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
