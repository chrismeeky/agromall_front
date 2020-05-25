import React, { Component, useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { storage } from "../../config/firebase-config";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./css/image-upload-modal.css";
class ImageUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      uploadedImages: [],
      imageSelector: null,
      uploading: false,
      disableButton: true,
    };
    this.inputRef = React.createRef();
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.setShowImageUploader("showImageUploader", false);
  };
  componentWillReceiveProps(props) {
    this.setState({ show: props.showImageUploader });
  }
  handleImageChange = async (event) => {
    let uploadedImages = [...this.state.uploadedImages];
    uploadedImages.push("empty");
    this.setState({ uploadedImages });
    this.setState({ uploading: true, disableButton: true });
    const fileUpload = event.target.files[0];
    if (fileUpload) {
      const uploadTask = storage
        .ref(`images/${fileUpload.name}`)
        .put(fileUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(fileUpload.name)
            .getDownloadURL()
            .then((url) => {
              if (uploadedImages[uploadedImages.length - 1] === "empty") {
                uploadedImages = uploadedImages.filter(
                  (image) => image !== "empty"
                );
              }
              uploadedImages.push(url);
              this.setState({ uploadedImages, disableButton: false });
              this.inputRef = React.createRef();
            });
        }
      );
    }
  };
  handleImageUpload = () => {
    this.handleClose();
    this.setState({ uploadedImages: [], uploading: false });
    this.props.addImages(this.state.uploadedImages);
  };
  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <span>Add photos of market</span>
        </Modal.Header>
        <div className="image-upload-body">
          {this.state.uploading ? (
            <React.Fragment>
              {this.state.uploadedImages.map((image, index) => (
                <div className="uploaded-market-mage">
                  {this.state.uploadedImages[index] === "empty" ? (
                    <div className="image-upload-loader">
                      <Loader
                        type="Oval"
                        color="white"
                        height={30}
                        width={50}
                        timeout={10000000000000} //3 secs
                      />
                    </div>
                  ) : (
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={image}
                    ></img>
                  )}
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="drag-drop-area">
                <button
                  className="edit-profile btn image-upload-select"
                  onClick={() => {
                    this.inputRef.current.click();
                  }}
                >
                  <i
                    className="fa fa-image"
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  ></i>{" "}
                  Upload photos from your computer
                </button>
              </div>
              <div class="custom-file" style={{ display: "none" }}>
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFileLang"
                  ref={this.inputRef}
                  lang="en"
                  onChange={this.handleImageChange}
                />
                <label class="custom-file-label" for="customFileLang">
                  {this.state.file}
                </label>
              </div>
            </React.Fragment>
          )}
        </div>
        <div>
          {!this.state.uploading ? null : (
            <Modal.Footer>
              <div class="custom-file" style={{ display: "none" }}>
                <input
                  type="file"
                  class="custom-file-input"
                  id="customFileLang"
                  ref={this.inputRef}
                  lang="en"
                  onChange={this.handleImageChange}
                />
                <label class="custom-file-label" for="customFileLang">
                  {this.state.file}
                </label>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  document.getElementById("customFileLang").click();
                }}
                disabled={this.state.disableButton}
              >
                Add more photos
              </Button>
              <Button variant="secondary" onClick={this.handleImageUpload}>
                Continue
              </Button>
            </Modal.Footer>
          )}
        </div>
      </Modal>
    );
  }
}
export default ImageUploadModal;
