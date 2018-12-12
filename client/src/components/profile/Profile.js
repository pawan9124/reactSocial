import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getProfileByHandle,
  getTripByHandle,
  updateProfileByHandle
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ImageUploader from "../common/ImageUploader";
import ProfileTrip from "./Profile_trip_table";
import ProfileSocial from "./ProfileSocial";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      country: "",
      city: "",
      errors: {},
      image: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedIn: "",
      markWords: "",
      name: "",
      imageSrc: ""
    };
    this.onChange = this.onChange.bind(this);
    this.setPropsImage = this.setPropsImage.bind(this);
    this.onSubmitChanges = this.onSubmitChanges.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getTripByHandle(this.props.match.params.handle);

      this.props.getProfileByHandle(this.props.match.params.handle);
      if (this.props.profile.profile !== null) {
        this.setState({ imageSrc: this.props.profile.profile.user.avatar });
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  setPropsImage(image, imageFile) {
    this.setState({ image: image, imageSrc: imageFile[0].imagePreviewUrl });
  }
  onClickEdit() {
    let stateData = {};
    const profileData = this.props.profile.profile;
    if (profileData !== null) {
      stateData["country"] =
        Object.keys(profileData.location).length > 0
          ? profileData.location.country
          : "India";
      stateData["city"] =
        Object.keys(profileData.location).length > 0
          ? profileData.location.city
          : "";
      stateData["image"] =
        profileData.user.avatar !== null ? profileData.user.avatar : "";
      stateData["facebook"] =
        Object.keys(profileData.location).length > 0
          ? profileData.social.facebook
          : "";
      stateData["instagram"] =
        Object.keys(profileData.location).length > 0
          ? profileData.social.instagram
          : "";
      stateData["twitter"] =
        Object.keys(profileData.location).length > 0
          ? profileData.social.twitter
          : "";
      stateData["youtube"] =
        Object.keys(profileData.location).length > 0
          ? profileData.social.youtube
          : "";
      stateData["linkedIn"] =
        Object.keys(profileData.location).length > 0
          ? profileData.social.linkedIn
          : "";
      stateData["markWords"] = profileData.markWords;
      stateData["name"] =
        profileData.user !== null ? profileData.user.name : "";
      this.setState({
        country: stateData.country,
        city: stateData.city,
        image: stateData.image,
        facebook: stateData.facebook,
        instagram: stateData.instagram,
        twitter: stateData.twitter,
        youtube: stateData.youtube,
        linkedIn: stateData.linkedIn,
        markWords: stateData.markWords,
        name: stateData.name,
        isEditMode: true
      });
    }
  }
  onSubmitChanges() {
    const fd = new FormData();
    const formState = this.state;
    if (formState.country !== undefined)
      fd.append("country", formState.country);
    if (formState.state !== undefined) fd.append("state", formState.state);
    if (formState.city !== undefined) fd.append("city", formState.city);
    if (formState.image !== undefined) {
      for (let i = 0; i < this.state.image.length; i++) {
        fd.append("image", this.state.image[i]);
      }
    }
    if (formState.facebook !== undefined)
      fd.append("facebook", formState.facebook);
    if (formState.instagram !== undefined)
      fd.append("instagram", formState.instagram);
    if (formState.twitter !== undefined)
      fd.append("twitter", formState.twitter);
    if (formState.youtube !== undefined)
      fd.append("youtube", formState.youtube);
    if (formState.linkedIn !== undefined)
      fd.append("linkedIn", formState.linkedIn);
    if (formState.markWords !== undefined)
      fd.append("markWords", formState.markWords);
    if (formState.name !== undefined) {
      fd.append("name", formState.name);
    }
    this.props.updateProfileByHandle(
      this.props.match.params.handle,
      fd,
      this.props.history
    );
  }
  render() {
    let {
      isEditMode,
      country,
      state,
      city,
      facebook,
      instagram,
      twitter,
      youtube,
      linkedIn,
      markWords,
      name,
      imageSrc
    } = this.state;
    const data = {
      country: country,
      state: state,
      city: city,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      youtube: youtube,
      linkedIn: linkedIn
    };
    const { profile } = this.props.profile;
    const { trips } = this.props.trip;
    console.log("imagebefore", imageSrc);
    if (this.props.profile.profile !== null) {
      if (
        this.props.profile.profile.user !== null &&
        this.props.profile.profile.user.avatar !== undefined
      ) {
        imageSrc = require("../../imageUploads/" +
          this.props.profile.profile.user.avatar);
      }
    }

    return (
      <div className="wrapper" id="profile-page">
        {profile !== null ? (
          <div>
            <div className="page-header">
              <img
                alt=""
                src="../assets/img/dots.png"
                className="dots"
                style={{ zIndex: -2 }}
              />
              <img alt="" src="../assets/img/path4.png" className="path" />
              <div className="container align-items-center">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    {isEditMode ? (
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={name}
                        placeholder="Your Name"
                        name="name"
                        onChange={this.onChange}
                      />
                    ) : (
                      <h1 className="profile-title text-left">
                        {profile.user.name}
                      </h1>
                    )}
                    <h5 className="text-on-back">56</h5>
                    {isEditMode ? (
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          value={markWords}
                          placeholder="Mark Your Words"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="markWords"
                          onChange={this.onChange}
                          disabled={!isEditMode}
                        />
                      </div>
                    ) : (
                      <p className="profile-description">{profile.markWords}</p>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                    <div className="card card-coin card-plain">
                      <div className="p-4">
                        <div className="overlay-container">
                          {imageSrc === "" ? (
                            <img
                              alt="user"
                              src={require("../../img/blank_profile.svg")}
                              className="img-center img-fluid rounded-circle"
                            />
                          ) : (
                            <img
                              alt="user"
                              src={imageSrc}
                              className="img-center img-fluid rounded-circle"
                            />
                          )}

                          {isEditMode ? (
                            <div className="profile-overlay">
                              <a
                                href="#1"
                                ng-click={this.changeProfilePic}
                                className="icon profile-icon"
                                title="User image"
                              >
                                <ImageUploader
                                  showPreview={false}
                                  setPropsImage={this.setPropsImage}
                                  type=""
                                  className="camera-icon-white"
                                />
                              </a>
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-5">
                          <h4 className="user-profile-heading title">
                            Profile Info
                          </h4>
                          {isEditMode ? (
                            <button
                              onClick={this.onSubmitChanges}
                              className="btn btn-success float-right"
                            >
                              Submit
                            </button>
                          ) : (
                            <button
                              onClick={this.onClickEdit}
                              className="btn btn-primary float-right"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                      <ProfileSocial
                        isEditMode={isEditMode}
                        profile={profile}
                        data={data}
                        changeData={this.onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProfileTrip trips={trips} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired
};
const mapPropsTostates = state => ({
  profile: state.profile,
  trip: state.trip
});
export default connect(
  mapPropsTostates,
  { getProfileByHandle, getTripByHandle, updateProfileByHandle }
)(withRouter(Profile));
