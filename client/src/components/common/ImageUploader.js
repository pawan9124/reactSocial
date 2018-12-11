import React, { Component } from "react";
import PropTypes from "prop-types";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], limit: false, propsImage: [] };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  _handleImageChange(e) {
    const dataFile = [];
    const rawFiles = [];
    const files = e.target.files;
    const length = files.length;
    if (length < 6) {
      rawFiles.push(files);
      return Promise.all(
        [].map.call(files, function(file) {
          return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function() {
              resolve({ result: reader.result, file: file });
            };
            reader.readAsDataURL(file);
          });
        })
      ).then(results => {
        results.forEach(result => {
          dataFile.push({ file: result.file, imagePreviewUrl: result.result });
          if (length === dataFile.length) {
            this.props.setPropsImage(files, dataFile);
            this.setState({
              images: dataFile,
              propsImage: rawFiles
            });
          }
        });
      });
    } else {
      this.setState({ limit: true });
    }
  }
  onRemoveClick(index) {
    this.state.images.splice(index, 1);
    this.state.propsImage.splice(index, 1);
    this.props.setPropsImage(this.state.propsImage);
    this.setState({ images: this.state.images });
  }

  render() {
    const { images, limit } = this.state;
    const { type, showPreview } = this.props;

    let $imagePreview = null;

    if (images.length > 0) {
      $imagePreview = images.map((image, index) => {
        return (
          <div key={index}>
            <button
              type="button"
              className="close"
              style={{ position: "relative", top: "0px", right: "0px" }}
              aria-label="Close"
              onClick={() => this.onRemoveClick(index)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              alt=""
              className="img-thumbnail previewSize"
              src={image.imagePreviewUrl}
            />
          </div>
        );
      });
    } else {
      if (limit === false) {
        $imagePreview = <div className="previewText">Select Images</div>;
      } else {
        $imagePreview = <div className="red">Image limit exceeds from 6</div>;
      }
    }

    return (
      <div className="previewComponent" id="imageUploader">
        <div className="image-upload">
          <label htmlFor="file-input">
            {/* <img alt="" src={require("../../img/image-upload.png")} /> */}
            <i
              className="fa fa-camera fa-3x"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            className="btn btn-info"
            id="file-input"
            type="file"
            onChange={e => this._handleImageChange(e)}
            accept=".png, .jpg, .jpeg"
            multiple={type}
          />
        </div>
        {showPreview ? <div className="imgPreview">{$imagePreview}</div> : null}
      </div>
    );
  }
}

ImageUploader.propTypes = {
  setPropsImage: PropTypes.func.isRequired
};

export default ImageUploader;
