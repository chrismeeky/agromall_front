import React, { Component } from "react";
import AddNewMarket from "./add-market";
import "./css/main-content.css";
import NearbyMarkets from "./nearby-markets";
class MainContent extends Component {
  state = {
    accordionOpen: false,
    height: "0px",
    initialHeight: 0,
    openedAccordion: false,
    activeTab: "nearbyMarkets",
    marketPhotos: [],
  };
  tabNames = {
    addMarket: "Add market",
    nearbyMarkets: "Markets nearby",
    newMarkets: "New markets",
    manageMarkets: "Manage markets",
  };
  handleToggle = () => {
    this.setState({
      accordionOpen: !this.state.accordionOpen,
      height: this.state.accordionOpen ? "0px" : "110px",
    });
    if (this.state.openedAccordion)
      setTimeout(() => {
        this.setState({ openedAccordion: false });
      }, 300);
    else this.setState({ openedAccordion: true });
  };
  componentWillReceiveProps = (props) => {
    this.setState({ activeTab: props.activeTab });
  };

  render() {
    return (
      <div className="main-content-body">
        <div
          className={`main-content-header ${
            this.state.openedAccordion ? "opened-accordion" : ""
          }`}
        >
          <div className="title">
            <span>{this.tabNames[this.state.activeTab]}</span>
          </div>
          <div className="filter-search" onClick={this.handleToggle}>
            <i className="fa fa-filter"></i>
          </div>
        </div>
        {this.state.activeTab === "addMarket" ? <AddNewMarket /> : ""}
        {this.state.activeTab === "nearbyMarkets" ? (
          <NearbyMarkets
            accordionOpen={this.state.accordionOpen}
            height={this.state.height}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MainContent;
