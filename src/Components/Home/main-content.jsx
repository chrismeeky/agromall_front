import React, { Component } from "reactn";
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
    adRequests: "Manage adverts",
    nearbyMarkets: "Markets nearby",
    newMarkets: "New markets",
    manageMarkets: "Manage markets",
    preferences: "Preferences",
    aboutUs: "About us",
    contactUs: "Contact us",
  };
  handleToggle = () => {
    this.setState({
      accordionOpen: !this.state.accordionOpen,
      height: this.state.accordionOpen ? "0px" : "170px",
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
  hideToggleButton = (value) => {
    this.setState({ hideToggle: value });
  };
  componentDidMount() {
    this.setGlobal({ hideToggleButton: this.hideToggleButton });
  }
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
          {!this.state.hideToggle ? (
            <div className="filter-search" onClick={this.handleToggle}>
              <i className="fa fa-filter"></i>
            </div>
          ) : null}
        </div>
        {this.state.activeTab === "manageMarkets" ? <AddNewMarket /> : ""}
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
