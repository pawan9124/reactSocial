import React, { Component } from "react";

let slideIndex = 1;

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHolder: this.props.images,
      images: []
    };
    this.closeModal = this.closeModal.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  componentDidMount() {
    this.createImageArray();
  }

  createImageArray() {
    if (this.state.imageHolder !== undefined) {
      const imageTemp = this.state.imageHolder.map((data, index) => {
        return (
          <img
            key={index}
            height="170"
            width="170"
            className="postImage"
            src={require("../../imageUploads/" + data.src)}
            alt="id"
            onClick={this.popupImage.bind(this, data.src, index)}
          />
        );
      });

      this.setState({ images: imageTemp });
    }
  }

  popupImage(src, index) {
    let modal = document.getElementById("myModal");
    let imageContainer = document.getElementById("imageContainer");
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    modal.style.display = "block";
    const imagesArray = this.state.imageHolder;
    for (let i = 0; i < imagesArray.length; i++) {
      let img = document.createElement("img");
      img.src = require("../../imageUploads/" + imagesArray[i].src);
      img.key = i;
      img.alt = i;
      img.className = "mySlides modal-content";
      imageContainer.appendChild(img);
    }
    slideIndex = 0;
    this.showImage(index);

    // modalImg.src = require("../../imageUploads/" + src);
  }
  closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  showImage(n) {
    let i;
    slideIndex = n;
    let x = document.getElementsByClassName("mySlides");
    if (n >= x.length) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = x.length - 1;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex].style.display = "block";
  }
  changeImage(n) {
    this.showImage((slideIndex += n));
  }

  render() {
    const { images } = this.state;
    const popUpHTML = (
      <div id="myModal" className="modal" tabIndex="-1" role="dialog">
        <span onClick={this.closeModal} className="close">
          &times;
        </span>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div id="imageContainer" />
              <i
                className="fa fa-chevron-circle-left fa-3x backBtn"
                aria-hidden="true"
                name="back"
                onClick={() => this.changeImage(-1)}
              />
              <i
                className="fa fa-chevron-circle-right fa-3x nextBtn"
                aria-hidden="true"
                name="next"
                onClick={() => this.changeImage(1)}
              />
            </div>
            <div className="modal-footer" />
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {images}
        {popUpHTML}
      </div>
    );
  }
}

export default ImageGallery;
