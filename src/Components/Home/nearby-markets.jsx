import React, { Component } from "reactn";
import axios from "axios";
import Loader from "react-loader-spinner";
import Autocomplete from "react-google-autocomplete";
import { getCity, getArea, getState } from "../../Utils/getAddressComponent";
import SpecificMarket from "./specific-market";
import "./css/nearby-markets.css";
class NearbyMarkets extends Component {
  state = {
    accordionOpen: false,
    height: "0px",
    initialHeight: 0,
    openedAccordion: false,
    markets: [],
    marketsCopy: [],
    allCategories: [],
    selectedCategories: [],
    selectedLocation: {},
    filteredMarkets: [],
    foundMarkets: [],
    viewSpecificMarket: false,
  };
  initializeMarkets = async () => {
    try {
      const markets = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/markets`
      );
      const categories = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories`
      );
      if (markets && categories) {
        const allMarkets = markets.data.data.markets;
        const allCategories = categories.data.data.categories;
        const toBeRendered = [];

        allMarkets.forEach((market) => {
          const {
            marketName,
            formattedAddress,
            imageURLs,
            categories,
            locationID,
            city,
            state,
            area,
            _id,
          } = market;
          toBeRendered.push({
            marketName,
            formattedAddress,
            imageURL: imageURLs[0],
            categories,
            locationID,
            city,
            state,
            area,
            _id,
          });
        });
        this.setState({
          markets: toBeRendered,
          marketsCopy: toBeRendered,
          allCategories,
          allMarkets,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  async componentDidMount() {
    this.initializeMarkets();
    this.setGlobal({
      setView: this.setView,
      initializeMarkets: this.initializeMarkets,
    });
  }
  handleSelectedCategory = (event) => {
    let selectedCategories = [...this.state.selectedCategories];
    const selectedCategory = event.target.name;
    if (selectedCategories.includes(selectedCategory)) {
      selectedCategories = selectedCategories.filter(
        (category) => category !== selectedCategory
      );
    } else {
      selectedCategories.push(selectedCategory);
    }
    this.setState({ selectedCategories });
  };
  onPlaceSelected = async (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.setState({
      selectedLocation: address.split(",")[0],
    });
  };
  applyFilter = () => {
    let foundMarkets = [];
    const filteredMarkets = [];
    const markets = [...this.state.marketsCopy];
    const { selectedLocation, selectedCategories } = this.state;
    markets.forEach((market) => {
      if (market.formattedAddress.includes(selectedLocation)) {
        foundMarkets.push(market);
      }
    });
    const toBeFilteredMarkets = foundMarkets.length ? foundMarkets : markets;
    if (this.state.selectedCategories.length) {
      for (let index = 0; index < toBeFilteredMarkets.length; index += 1) {
        const { categories } = toBeFilteredMarkets[index];
        const found =
          selectedCategories.some((category) =>
            categories.includes(category)
          ) ||
          categories.some((category) => selectedCategories.includes(category));
        if (found) {
          filteredMarkets.push(toBeFilteredMarkets[index]);
        }
      }
    } else {
      foundMarkets = toBeFilteredMarkets;
    }

    console.log(foundMarkets, filteredMarkets);

    this.setState({
      markets: filteredMarkets.length ? filteredMarkets : foundMarkets,
      filteredMarkets,
      foundMarkets,
    });
  };
  handleSelectedMarket = (id) => {
    this.global.hideToggleButton(true);
    const selectedMarket = this.state.allMarkets.filter(
      (market) => market._id === id
    )[0];

    this.setState({ selectedMarket: id, viewSpecificMarket: true });
  };
  setView = (value) => {
    this.setState({ viewSpecificMarket: value });
  };
  render() {
    return (
      <div className="nearbyMarkets">
        <div
          className="action-accordion"
          ref={(divElement) => (this.divElement = divElement)}
        >
          <div
            className={`accordion-body`}
            style={{ maxHeight: this.props.height }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="show-categories">
                  <span>Show</span>
                </div>
                <div className="container all-categories">
                  {this.state.allCategories.map((category) => (
                    <div class="custom-control custom-checkbox  ">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id={category}
                        name={category}
                        onChange={this.handleSelectedCategory}
                      ></input>
                      <label
                        class="remember-me custom-control-label"
                        for={category}
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="show-categories">
                  <span>Where</span>
                </div>
                <div className="location-searchbox">
                  <Autocomplete
                    style={{
                      width: "100%",
                      height: "40px",
                      paddingLeft: "16px",
                      marginTop: "2px",
                      marginBottom: "500px",
                    }}
                    onPlaceSelected={this.onPlaceSelected}
                    types={["geocode"]}
                  />
                </div>
              </div>
              <div className="apply-filter">
                <button className="btn btn-primary" onClick={this.applyFilter}>
                  Apply filter
                </button>
              </div>
            </div>
          </div>
        </div>
        {!this.state.markets.length ? (
          <div
            style={{ width: "fit-content", margin: "auto", marginTop: "200px" }}
          >
            {" "}
            <Loader
              type="Oval"
              color="grey"
              height={60}
              width={60}
              timeout={10000000000000} //3 secs
            />
          </div>
        ) : null}

        <React.Fragment>
          {this.state.viewSpecificMarket ? (
            <SpecificMarket selectedMarket={this.state.selectedMarket} />
          ) : null}
        </React.Fragment>
        {this.state.markets.length && !this.state.viewSpecificMarket ? (
          <div>
            {this.state.markets.reverse().map((market) => (
              <div className="nearby-markets-container">
                <div
                  className="market"
                  onClick={() => this.handleSelectedMarket(market._id)}
                >
                  <img
                    style={{ width: "100%", height: "inherit" }}
                    src={market.imageURL}
                    alt=""
                  />
                  <div className="market-overlay">
                    <div className="market-info">
                      <div className="name">{market.marketName}</div>
                      <span className="address">
                        <i
                          class="fas fa-map-marker-alt"
                          style={{ marginRight: "5px" }}
                        ></i>
                        {market.formattedAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default NearbyMarkets;
