import React, { Component } from "react";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], limit: false };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  _handleImageChange(e) {
    const dataFile = [];
    const files = e.target.files;
    const length = files.length;
    if (length < 6) {
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
            this.setState({ images: dataFile });
          }
        });
      });
    } else {
      this.setState({ limit: true });
    }
  }
  onRemoveClick(index) {
    this.state.images.splice(index, 1);
    this.setState({ images: this.state.images });
  }

  render() {
    const { images, limit } = this.state;

    let $imagePreview = null;

    if (images.length > 0) {
      $imagePreview = images.map((image, index) => {
        return (
          <div key={index}>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => this.onRemoveClick(index)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              alt=""
              className="img-thumbnail previewSize"
              src={image.imagePreviewUrl}
              accept=".png, .jpg, .jpeg"
            />
          </div>
        );
      });
    } else {
      console.log("LIMIT", limit);
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
            <img alt="" src={require("../../img/image-upload.png")} />
          </label>
          <input
            className="btn btn-info"
            id="file-input"
            type="file"
            onChange={e => this._handleImageChange(e)}
            multiple
          />
        </div>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}

export default ImageUploader;
