import React, { Component } from "react";
import axios from "axios";
import "./css/nearby-markets.css";
class NearbyMarkets extends Component {
  state = {
    accordionOpen: false,
    height: "0px",
    initialHeight: 0,
    openedAccordion: false,
    markets: [],
  };
  async componentDidMount() {
    try {
      const markets = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/markets`
      );
      if (markets) {
        const allMarkets = markets.data.data.markets;
        const toBeRendered = [];

        allMarkets.forEach((market) => {
          const {
            marketName,
            formattedAddress,
            imageURLs,
            locationID,
          } = market;
          toBeRendered.push({
            marketName,
            formattedAddress,
            imageURL: imageURLs[0],
            locationID,
          });
        });
        this.setState({ markets: toBeRendered });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
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
                  <div class="custom-control custom-checkbox  ">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberme"
                      name="rememberMe"
                    ></input>
                    <label
                      class="remember-me custom-control-label"
                      for="rememberme"
                    >
                      fashion
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox  ">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberme"
                      name="rememberMe"
                    ></input>
                    <label
                      class="remember-me custom-control-label"
                      for="rememberme"
                    >
                      food
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox  ">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberme"
                      name="rememberMe"
                    ></input>
                    <label
                      class="remember-me custom-control-label"
                      for="rememberme"
                    >
                      building
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox  ">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberme"
                      name="rememberMe"
                    ></input>
                    <label
                      class="remember-me custom-control-label"
                      for="rememberme"
                    >
                      fruits
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox  ">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberme"
                      name="rememberMe"
                    ></input>
                    <label
                      class="remember-me custom-control-label"
                      for="rememberme"
                    >
                      vegetables
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="show-categories">
                  <span>Where</span>
                </div>
                <div className="md-form">
                  <input
                    name="address"
                    onChange={this.onChange}
                    type="address"
                    className="form-control"
                    id="address"
                    placeholder="Somolu"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.markets.length ? (
          <div>
            {this.state.markets.map((market) => (
              <div className="nearby-markets-container">
                <div className="market">
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
