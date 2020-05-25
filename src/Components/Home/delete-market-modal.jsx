import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../../config/firebase-config";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./css/image-upload-modal.css";
class ImageUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.inputRef = React.createRef();
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.setShowModal("showDelete", false);
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  componentWillReceiveProps(props) {
    this.setState({ show: props.showDelete, marketID: props.marketID });
  }
  handleDelete = async () => {
    this.handleClose();

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    try {
      const { token } = userDetails;
      const isDeleted = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/market/${this.props.marketID}/${token}`
      );
      if (isDeleted) {
        this.props.getAllMarkets();
      }
    } catch (error) {}
  };
  render() {
    return (
      <>
        <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete market</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete ?</Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" onClick={this.handleDelete}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ImageUploadModal;
