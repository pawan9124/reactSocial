import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import ImageUploader from "../common/ImageUploader";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      images: [],
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setPropsImage = this.setPropsImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    //creating the form data to post the image
    const { user } = this.props.auth;
    const location = window.localStorage.getItem("location");
    console.log("Locations", location);
    const fd = new FormData();
    //Server side don't accept array of formdata so the loop is calling
    for (let i = 0; i < this.state.images.length; i++) {
      fd.append("images", this.state.images[i]);
    }
    fd.append("text", this.state.text);
    fd.append("name", user.name);
    fd.append("avatar", user.avatar);
    fd.append("country", location.country);
    fd.append("state", location.state);
    fd.append("city", location.city);
    fd.append("zipcode", location.zipcode);

    this.props.addPost(fd);
    this.setState({ text: "" });
  }

  setPropsImage(images) {
    this.setState({ images: images });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-success text-white" />
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <ImageUploader
                  setPropsImage={this.setPropsImage}
                  type="multiple"
                  showPreview={true}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
