import React, { Component } from "reactn";
import axios from "axios";
import Loader from "react-loader-spinner";
import BusyOverlay from "./busy-overlay";
import DeleteOverlay from "./delete-market-modal";
import createNotification from "./notification";
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
    showAvailableMarkets: true,
    allMarkets: [],
    token: "",
    isEditing: false,
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
  setShowImageUploader = (value) => {
    this.setState({ showImageUploader: value });
  };
  handleSubmit = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    this.setState({
      showLoadingOverlay: true,
      showImageUploader: false,
      token: userDetails.token,
    });

    const data = {
      marketName: this.state.nameOfMarket,
      marketDescription: this.state.description,
      categories: [...this.state.categories.split(",")],
      locationID: this.state.location.place.place_id,
      addressComponents: this.state.location.place.address_components,
      formattedAddress: this.state.location.place.formatted_address,
      mapPosition: this.state.location.mapPosition,
      imageURLs: this.state.marketPhotos,
      city: this.state.location.city,
      area: this.state.location.area,
      state: this.state.location.state,
      token: userDetails.token,
    };
    try {
      const savedMarket = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/market/upload`,
        data
      );
      if (savedMarket) {
        setTimeout(() => {
          this.setState({
            showLoadingOverlay: false,
            nameOfMarket: "",
            description: "",
            categories: "",
            location: {},
            imageURLs: [],
            isEditing: false,
          });
          createNotification("info");
        }, 3000);
        this.getAllMarkets();
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getAllMarkets = async () => {
    this.setState({ showDelete: false, showLoadingOverlay: true });
    try {
      const markets = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/markets`
      );
      if (markets) {
        const allMarkets = markets.data.data;
        if (allMarkets.markets.length) {
          this.setState({ showAvailableMarkets: true });
        } else this.setState({ showAvailableMarkets: false });
        this.setState({
          allMarkets: allMarkets.markets,
          showLoadingOverlay: false,
        });
      }
    } catch (error) {}
  };
  componentDidMount = async () => {
    this.getAllMarkets();
  };
  getPublishedDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const newDate = new Date(date);
    return `Published ${monthNames[newDate.getMonth()]} ${newDate.getDate()}`;
  };
  handleEdit = (marketID) => {
    const market = [...this.state.allMarkets].filter(
      (market) => market._id === marketID
    )[0];
    const data = {
      nameOfMarket: market.marketName,
      description: market.marketDescription,
      categories: market.categories,
      marketPhotos: market.imageURLs,
      location: {
        place: {
          place_id: market.locationID,
          address_components: market.addressComponents,
          formatted_address: market.formattedAddress,
          mapPosition: market.mapPosition,
        },
        city: market.city,
        area: market.area,
        state: market.state,
        address: market.formattedAddress,
      },
    };
    this.setState({ ...data, showAvailableMarkets: false, isEditing: true });
  };
  render() {
    return (
      <React.Fragment>
        <BusyOverlay showLoadingOverlay={this.state.showLoadingOverlay} />
        <ImageUploadModal
          showImageUploader={this.state.showImageUploader}
          addImages={this.addImages}
          setShowImageUploader={this.setShowImageUploader}
        />
        <DeleteOverlay
          showDelete={this.state.showDelete}
          marketID={this.state.marketID}
          token={this.state.token}
          getAllMarkets={this.getAllMarkets}
        />
        {this.state.showAvailableMarkets ? (
          <React.Fragment>
            <div className="market-list">
              {this.state.allMarkets.reverse().map((market) => (
                <div className="one-market">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="market-picture">
                        <img src={market.imageURLs[0]} alt="" />
                      </div>
                      <div className="market-title">
                        <div className="title">
                          <span>{market.marketName}</span>
                        </div>
                        <div className="date">
                          <span>{this.getPublishedDate(market.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="modify-icons-container">
                        <div
                          className="modify-icons"
                          title="delete market"
                          onClick={() =>
                            this.setState({
                              showDelete: true,
                              marketID: market._id,
                            })
                          }
                        >
                          <i
                            className="fa fa-trash"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </div>

                        <div
                          className="modify-icons "
                          title="edit market"
                          onClick={() => this.handleEdit(market._id)}
                        >
                          <i
                            className="fa fa-pen edit"
                            style={{ fontSize: "20px", marginRight: "20px" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : null}
        {!this.state.showAvailableMarkets ? (
          <React.Fragment>
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
                    center={
                      this.state.location.place.mapPosition || {
                        lat: 18.5204,
                        lng: 73.8567,
                      }
                    }
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
              <div
                class="cancel-market-btn market-button"
                onClick={() =>
                  this.setState({
                    showAvailableMarkets: true,
                    ImageUploadModal: false,
                    isEditing: false,
                  })
                }
              >
                <button
                  className="btn btn-primary"
                  class="form-control"
                  id="save-market"
                >
                  Cancel
                </button>
              </div>
              <div
                class="add-market-btn market-button"
                onClick={this.handleSubmit}
              >
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
                  {this.state.isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
        {this.state.showAvailableMarkets ? (
          <div
            className="chat-opener-holder"
            onClick={() =>
              this.setState({ showAvailableMarkets: false, showDelete: false })
            }
          >
            {" "}
            <div className="chat-opener">
              <button id="chat-opener" data-toggle="tooltip" title="Add market">
                <i className="fa fa-plus fa-1.5x animated zoomIn"></i>
              </button>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddNewMarket;
