import React, { Component } from "reactn";
import axios from "axios";
import Loader from "react-loader-spinner";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Map from "./map";

import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/specific-market.css";
class SpecificMarket extends Component {
  state = {
    market: {},
  };

  async componentDidMount() {
    const marketID = this.props.selectedMarket;
    try {
      const foundMarket = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/market/${marketID}`
      );
      if (foundMarket) {
        const market = foundMarket.data.data.market;
        console.log("found market", market);

        this.setState({ market });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <div>
        {this.state.market.marketName ? (
          <React.Fragment>
            <div className="specific-market-title">
              <span>{this.state.marketName}</span>
            </div>
            <div className="image-slider-container">
              <Carousel>
                {this.state.market.imageURLs.map((url) => (
                  <div>
                    <img src={url} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="about-market">
              <div className="title">
                <span>About market</span>
              </div>
              <div className="description">
                <span>{this.state.market.marketDescription}</span>
              </div>
              <div className="location-info">
                <span className="title">Location</span>
                <div className="property">
                  Area: <span>{this.state.market.area}</span>
                </div>
                <div className="property">
                  City: <span>{this.state.market.city}</span>
                </div>
                <div className="property">
                  State: <span>{this.state.market.state}</span>
                </div>
                <div className="property">
                  Address: <span>{this.state.market.formattedAddress}</span>
                </div>
              </div>
              <div className="google-map-specific">
                <Map
                  hideAutoComplete={true}
                  google={this.props.google}
                  center={this.state.market.mapPosition}
                  height="250px"
                  zoom={15}
                  saveLocation={this.saveLocation}
                  city={this.state.market.city}
                  area={this.state.market.area}
                />
              </div>
              <div className="categories">
                <span>Categories</span>
                <div className="container">
                  {this.state.market.categories.map((category) => (
                    <div className="category">{category}</div>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
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
        )}
      </div>
    );
  }
}

export default SpecificMarket;
