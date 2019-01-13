import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addLocation } from "../../actions/dashboardActions";
import ImageUploader from "../common/ImageUploader";
import SelectListGroup from "../common/SelectListGroup";
import CountryList from "../../utils/countryList.json";

const initialState = {
  country: "India",
  state: "",
  city: "",
  zipcode: "",
  image: "",
  description: "",
  errors: {},
  showPreview: true,
  showLoader: false
};

class CreateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setPropsImage = this.setPropsImage.bind(this);
    this.switchOffLoader = this.switchOffLoader.bind(this);
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
    this.setState({ showLoader: true });
    const fd = new FormData();
    fd.append("country", this.state.country);
    fd.append("state", this.state.state);
    fd.append("city", this.state.city);
    fd.append("zipcode", this.state.zipcode);
    //Server side don't accept array of formdata so the loop is calling
    for (let i = 0; i < this.state.image.length; i++) {
      fd.append("image", this.state.image[i]);
    }
    fd.append("description", this.state.description);
    e.preventDefault();

    this.props.addLocation(fd);
  }

  setPropsImage(image) {
    this.setState({ image: image, showPreview: true });
  }

  switchOffLoader() {
    this.setState(initialState);
    this.setState({ showPreview: false });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="mt-5">
        <label>Add a location:</label>
        <button
          type="button"
          className="ml-5 btn btn-primary"
          data-toggle="modal"
          data-target="#createLocation"
          onClick={this.switchOffLoader}
        >
          Add Location
        </button>

        <div
          id="createLocation"
          className="modal fade"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content card card-register">
              <div className="modal-header card-header">
                <img
                  className="card-img"
                  src="../assets/img/square1.png"
                  alt="Card image1"
                />
                <h5
                  className="modal-title card-title"
                  style={{ fontSize: "3em", textTransform: "none" }}
                >
                  Add Location
                </h5>
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <form
                        encType="multipart/form-data"
                        id="createLocationForm"
                        onSubmit={this.onSubmit}
                      >
                        <SelectListGroup
                          placeholder="Status"
                          name="country"
                          value={this.state.country}
                          onChange={this.onChange}
                          options={CountryList}
                          error={errors.country}
                          info="Select country from list"
                        />
                        <TextFieldGroup
                          type="text"
                          placeholder="State"
                          name="state"
                          value={this.state.state}
                          onChange={this.onChange}
                        />
                        <TextFieldGroup
                          type="text"
                          placeholder="City"
                          name="city"
                          value={this.state.city}
                          onChange={this.onChange}
                          error={errors.city}
                        />
                        <TextFieldGroup
                          type="text"
                          placeholder="Zipcode"
                          name="zipcode"
                          value={this.state.zipcode}
                          onChange={this.onChange}
                          error={errors.zipcode}
                        />
                        <ImageUploader
                          setPropsImage={this.setPropsImage}
                          type=""
                          style={{ marginLeft: "15px" }}
                          className="camera-icon-black"
                          showPreview={this.state.showPreview}
                        />
                        <TextFieldGroup
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                        />
                        <div className="row mt-4 mb-4">
                          <div className="col-md-5">
                            <button
                              id="closeModalLocation"
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                          <div className="col-md-5">
                            <input
                              type="submit"
                              className="btn btn-info btn-block"
                            />
                          </div>
                          <div className="col-md-2">
                            {this.state.showLoader ? (
                              <div className="loader" />
                            ) : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateLocation.propTypes = {
  addLocation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapPropsToState = state => ({
  errors: state.errors
});
export default connect(
  mapPropsToState,
  { addLocation }
)(CreateLocation);
