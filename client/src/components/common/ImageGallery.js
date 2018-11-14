import React, { Component } from "react";
import Gallery from "react-grid-gallery";

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHolder: this.props.images,
      images: []
    };
  }

  componentDidMount() {
    this.createImageArray();
  }

  calculateThubmnailImage(src, param) {
    let tn_height, tn_width;
    let img = new Image();
    img.src = src;
    tn_width = img.width - Math.floor(img.height / 5) * 100;
    tn_height = img.height - Math.floor(img.height / 5) * 100;
    if (param === "height") return Math.abs(tn_height);
    if (param === "width") return Math.abs(tn_width);
  }

  createImageArray() {
    let tempImage = [];
    this.state.imageHolder.map((data, index) => {
      const imageVar = {
        src: data.src,
        thumbnail: data.src,
        thumbnailWidth: this.calculateThubmnailImage(data.src, "width"),
        thumbnailHeight: this.calculateThubmnailImage(data.src, "height"),
        tags: data.tags !== undefined ? data.tags : [],
        caption: data.caption !== undefined ? data.caption : ""
      };
      tempImage.push(imageVar);
    });

    console.log("MPA", tempImage);

    this.setState({ images: tempImage });
  }

  render() {
    return (
      <div>
        <Gallery images={this.state.images} enableImageSelection={false} />
      </div>
    );
  }
}

export default ImageGallery;
