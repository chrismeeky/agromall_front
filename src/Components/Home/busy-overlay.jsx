import React, { Component } from "react";
import Loader from "react-loader-spinner";

import "./css/busy-overlay.css";

class BusyOverlay extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {this.props.showLoadingOverlay ? (
          <div className="show-busy-overlay">
            <div className="overlay-loader">
              <Loader
                type="ThreeDots"
                color="white"
                height={20}
                width={100}
                timeout={10000000000000} //3 secs
              />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default BusyOverlay;
