import React, { Component } from "reactn";
import Loader from "react-loader-spinner";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./css/busy-overlay.css";

class BusyOverlay extends Component {
  state = {
    showLoadingOverlay: false,
  };

  showLoadingOverlay = (value) => {
    this.setState({ showLoadingOverlay: value });
  };
  componentDidMount() {
    this.setGlobal({ showLoadingOverlay: this.showLoadingOverlay });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.showLoadingOverlay ? (
          <div className="show-busy-overlay">
            <div className="overlay-loaderx">
              <LinearProgress />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default BusyOverlay;
