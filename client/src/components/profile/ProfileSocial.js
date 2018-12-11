import React, { Component } from "react";
import CountryList from "../../utils/countryList.json";
import SelectListGroup from "../common/SelectListGroup";

class ProfileSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.changeData(e);
  }

  render() {
    const { isEditMode, profile, data } = this.props;
    const errors = {};
    return (
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-primary justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#linka">
              Travel
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#linkb">
              Personal
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#linkc">
              Social
            </a>
          </li>
        </ul>
        <div className="tab-content tab-subcategories">
          <div className="tab-pane active" id="linka">
            <div className="table-responsive overflow-hidden">
              <table className="table tablesorter " id="plain-table">
                <tbody>
                  <tr>
                    <td>Popularity</td>
                    <td>{profile.popularity}</td>
                  </tr>
                  <tr>
                    <td>Travel Trust</td>
                    <td>{profile.travelTrust}</td>
                  </tr>
                  <tr>
                    <td>Travel Credit</td>
                    <td>{profile.travelCredits}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tab-pane" id="linkb">
            <div className="row">
              <label className="col-sm-3 col-form-label">Country</label>
              <div className="col-sm-9">
                <div className="form-group">
                  {isEditMode ? (
                    <SelectListGroup
                      placeholder="Status"
                      name="country"
                      className="form-control"
                      value={data.country}
                      onChange={this.onChange}
                      options={CountryList}
                      error={errors.country}
                      info="Select country from list"
                    />
                  ) : (
                    <SelectListGroup
                      placeholder="Status"
                      name="country"
                      className="form-control"
                      value={profile.location.country}
                      onChange={this.onChange}
                      options={CountryList}
                      error={errors.country}
                      info="Select country from list"
                      disabled={!isEditMode}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3 col-form-label">City</label>
              <div className="col-sm-9">
                <div className="form-group">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="form-control"
                      value={data.city}
                      placeholder="City"
                      name="city"
                      onChange={this.onChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={profile.location.city}
                      placeholder="City"
                      name="city"
                      onChange={this.onChange}
                      disabled={!isEditMode}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="linkc">
            <div className="row">
              <label className="col-sm-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/creativetim"
                  className="btn btn-icon btn-facebook btn-round"
                  data-toggle="tooltip"
                  data-original-title="Like Me"
                >
                  <i className="fab fa-facebook-square" />
                </a>
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="form-control"
                      value={data.facebook}
                      placeholder="Facebook"
                      name="facebook"
                      onChange={this.onChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={profile.social.facebook}
                      placeholder="Facebook"
                      name="facebook"
                      onChange={this.onChange}
                      disabled={!isEditMode}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/creativetim"
                  className="btn btn-icon btn-dribbble btn-round"
                  data-toggle="tooltip"
                  data-original-title="Follow Me"
                >
                  <i className="fab fa-instagram" />
                </a>
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  <div className="form-group">
                    {isEditMode ? (
                      <input
                        type="text"
                        className="form-control"
                        value={data.instagram}
                        placeholder="Instagram"
                        name="instagram"
                        onChange={this.onChange}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={profile.social.instagram}
                        placeholder="Instagram"
                        name="instagram"
                        onChange={this.onChange}
                        disabled={!isEditMode}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/creativetim"
                  className="btn btn-icon btn-twitter btn-round"
                  data-toggle="tooltip"
                  data-original-title="Follow us"
                >
                  <i className="fab fa-twitter" />
                </a>
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  <div className="form-group">
                    {isEditMode ? (
                      <input
                        type="text"
                        className="form-control"
                        value={data.twitter}
                        placeholder="Twitter"
                        name="twitter"
                        onChange={this.onChange}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={profile.social.twitter}
                        placeholder="Twitter"
                        name="twitter"
                        onChange={this.onChange}
                        disabled={!isEditMode}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/creativetim"
                  className="btn btn-icon btn-danger btn-round"
                  data-toggle="tooltip"
                  data-original-title="Subscribe Me"
                >
                  <i className="fab fa-youtube" />
                </a>
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  <div className="form-group">
                    {isEditMode ? (
                      <input
                        type="text"
                        className="form-control"
                        value={data.youtube}
                        placeholder="Youtube"
                        name="youtube"
                        onChange={this.onChange}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={profile.social.youtube}
                        placeholder="Youtube"
                        name="youtube"
                        onChange={this.onChange}
                        disabled={!isEditMode}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/creativetim"
                  className="btn btn-icon btn-info btn-round"
                  data-toggle="tooltip"
                  data-original-title="Contact Me"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  <div className="form-group">
                    {isEditMode ? (
                      <input
                        type="text"
                        className="form-control"
                        value={data.linkedIn}
                        placeholder="LinkedIn"
                        name="linkedIn"
                        onChange={this.onChange}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={profile.social.linkedIn}
                        placeholder="LinkedIn"
                        name="linkedIn"
                        onChange={this.onChange}
                        disabled={!isEditMode}
                      />
                    )}
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

export default ProfileSocial;
