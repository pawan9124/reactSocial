import React from "react";

export default () => {
  return (
    <div className="btn-wrapper profile pt-3">
      <h4>Posts</h4>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          <li data-target="#carouselExampleIndicators" data-slide-to="3" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={require("../../imageUploads/1542305446114-HTB19yasrHsrBKNjSZFpq6AXhFXae.jpg")}
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={require("../../imageUploads/1542305446119-HTB10mCZKf9TBuNjy0Fcq6zeiFXa2.jpg")}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={require("../../imageUploads/1542629583148-Temporary-Tattoo-Crystal-Sticker-Face-Jewels-Gems-Rhinestone-Temporary-Face-Stickers-Diy-Face-Stickers-Party-Body.jpg")}
              alt="Third slide"
            />
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={require("../../imageUploads/1542629583148-Temporary-Tattoo-Crystal-Sticker-Face-Jewels-Gems-Rhinestone-Temporary-Face-Stickers-Diy-Face-Stickers-Party-Body.jpg")}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};
