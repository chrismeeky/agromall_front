import React, { Component } from "react";
import LeftBar from "./left-bar";
import MainContent from "./main-content";
import "./css/home.css";
class Home extends Component {
  state = {
    activeTab: "nearbyMarkets",
  };
  switchTabs = (tab) => {
    this.setState({ activeTab: tab });
  };
  render() {
    return (
      <div className="home-body">
        <div class="row">
          <div class="column left-bar">
            <LeftBar switchTabs={this.switchTabs} />
          </div>
          <div class="column main-content">
            <MainContent activeTab={this.state.activeTab} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
