import React, { Component } from "reactn";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import Loader from "react-loader-spinner";
import BusyOverlay from "./busy-overlay";
import createNotification from './notification'
import Map from "./map";
import ImageUploadModal from "./image-upload-modal";
import "./css/add-market.css";
class AddNewMarket extends Component {
  state = {
    marketPhotos: [],
    showImageUploader: false,
    location: {},
    nameOfMarket: "",
    description: "",
    categories: "",
    showLoadingOverlay: false,
  };
  addImages = (newImages) => {
    const images = [...this.state.marketPhotos];
    images.concat(newImages);
    this.setState({
      marketPhotos: images.concat(newImages),
      showImageUploader: false,
    });
  };
  saveLocation = (location) => {
    this.setState({ location });
    this.setGlobal({ area: location.area });
    console.log("this is location", this.state.location.area);
  };
  handleSubmit = async () => {
    this.setState({ showLoadingOverlay: true });
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const data = {
      marketName: this.state.nameOfMarket,
      marketDescription: this.state.description,
      categories: [...this.state.categories.split(",")],
      locationID: this.state.location.place.place_id,
      addressComponents: this.state.location.place.address_components,
      formattedAddress: this.state.location.place.formatted_address,
      mapPosition: this.state.location.mapPosition,
      imageURLs: this.state.marketPhotos,
      token: userDetails.token,
    };
    try {
      const savedMarket = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/market/upload`,
        data
      );
      if (savedMarket) {
        setTimeout(() => {
          this.setState({ showLoadingOverlay: false });
          createNotification("info")
        }, 3000);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <BusyOverlay showLoadingOverlay={this.state.showLoadingOverlay} />
        <ImageUploadModal
          showImageUploader={this.state.showImageUploader}
          addImages={this.addImages}
        />
        <div
          className="add-new-markets"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="no-of-photos">
            <span>
              {!this.state.marketPhotos.length
                ? "No photos added"
                : `${this.state.marketPhotos.length} photos added`}
            </span>
          </div>
          <hr />
          <div className="all-added-photos">
            <div
              className="added-photo added-photo-first"
              onClick={() => {
                this.setState({ showImageUploader: true });
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  color: "white",
                  width: "fit-content",
                  margin: "auto",
                }}
              >
                <i class="fas fa-camera" style={{ marginTop: "15px" }}></i>
              </div>
              <span>Add photos</span>
            </div>
            {this.state.marketPhotos.map((photo) => (
              <div className="added-photo" B>
                <img
                  style={{ height: "80px", width: "90px" }}
                  src={photo}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="photo-instruction">
            <span>You need to add between 3-5 photos</span>
          </div>
          <div className="market-form">
            <span className="title1">Basic Information</span>
            <form>
              <div class="form-group row"></div>
              <div class="form-group row">
                <label for="nameofmarket" class="col-sm-4 col-form-label">
                  Name of market
                </label>
                <div class="col-sm-8">
                  <input
                    type="string"
                    class="form-control"
                    id="nameofmarket"
                    value={this.state.nameOfMarket}
                    name="nameOfMarket"
                    placeholder="E.g Tejuosho market"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-4 col-form-label">
                  Description
                </label>
                <div class="col-sm-8">
                  <input
                    type="string"
                    class="form-control"
                    id="description"
                    value={this.state.description}
                    name="description"
                    placeholder="Describe the market"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div class="form-group row">
                <label for="categories" class="col-sm-4 col-form-label">
                  Categories
                </label>
                <div class="col-sm-8">
                  <input
                    type="string"
                    class="form-control"
                    id="categories"
                    value={this.state.categories}
                    name="categories"
                    placeholder="Seperate categories with comma"
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div className="market-form location-form">
            <span className="title1">Location</span>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="">
                City
              </label>
              <input
                type="text"
                name="city"
                className="form-control col-sm-8"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.location.city}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="">
                Area
              </label>
              <input
                type="text"
                name="area"
                className="form-control col-sm-8"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.location.area}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="">
                State
              </label>
              <input
                type="text"
                name="state"
                className="form-control col-sm-8"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.location.state}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="form-control col-sm-8"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.location.address}
              />
            </div>
            <div className="google-map">
              <Map
                google={this.props.google}
                center={{ lat: 18.5204, lng: 73.8567 }}
                height="250px"
                zoom={15}
                saveLocation={this.saveLocation}
                city={this.state.location.city}
                area={this.state.location.area}
              />
            </div>
          </div>
        </div>
        <div className="market-form action-buttons">
          <div class="cancel-market-btn market-button">
            <button
              className="btn btn-primary"
              class="form-control"
              id="save-market"
            >
              Cancel
            </button>
          </div>
          <div class="add-market-btn market-button" onClick={this.handleSubmit}>
            <button
              className="btn btn-primary"
              class="form-control"
              id="save-market"
              disabled={
                !(
                  this.state.nameOfMarket.length &&
                  this.state.description.length &&
                  this.state.categories.length &&
                  this.state.location.place &&
                  this.state.marketPhotos.length
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddNewMarket;
