import React, { Component } from "reactn";
import { Redirect, Link } from "react-router-dom";

import "./css/left-bar.css";
class LeftBar extends Component {
  state = { loggedOut: false, loggedIn: false };
  componentDidMount() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("user", userDetails);
    if (userDetails) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  render() {
    return (
      <div className="left-bar-body">
        {this.state.loggedOut ? <Redirect to={"/admin/login"} /> : null}
        <div className="left-bar-content">
          <div className="site-title">
            <span>agromall</span>
          </div>
          <hr />
          {this.state.loggedIn ? (
            <React.Fragment>
              {" "}
              <div className="user-profile">
                <div className="row">
                  <div className="col-md-8">
                    <div className="profile-image"></div>
                    <div className="users-name">
                      <span>Chris</span>
                      <span>Admin</span>
                    </div>
                  </div>
                  <div
                    className="col-md-4 sign-out"
                    onClick={() => {
                      localStorage.clear();
                      this.setState({ loggedOut: true });
                    }}
                  >
                    <i className="fa fa-sign-out-alt" title="Log out"></i>
                  </div>
                </div>
                <button className="edit-profile btn">
                  <i className="fa fa-edit"></i> Edit profile
                </button>
                <div
                  className="log-out-btn menu-options"
                  onClick={() => {
                    localStorage.clear();
                    this.setState({ loggedOut: true });
                  }}
                >
                  Log out
                </div>
              </div>
              <hr />
            </React.Fragment>
          ) : null}

          {this.state.loggedIn ? (
            <React.Fragment>
              <div
                className="menu-options"
                onClick={() => {
                  this.global.setView(false);
                  this.global.hideToggleButton(false);
                  this.props.switchTabs("nearbyMarkets", false);
                  this.global.initializeMarkets();
                }}
              >
                <span>Markets nearby</span>
              </div>
              <div
                className="menu-options"
                onClick={() => this.props.switchTabs("manageMarkets")}
              >
                <span>Manage markets</span>
              </div>
              <div
                className="menu-options"
                onClick={() => this.props.switchTabs("preferences")}
              >
                <span>Preferences</span>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                className="menu-options"
                onClick={() => {
                  this.global.setView(false);
                  this.global.hideToggleButton(false);
                  this.props.switchTabs("nearbyMarkets", false);
                  this.global.initializeMarkets();
                }}
              >
                <span>Markets nearby</span>
              </div>
              <div
                className="menu-options"
                onClick={() => this.props.switchTabs("aboutUs")}
              >
                <span>About us</span>
              </div>
              <div
                className="menu-options"
                onClick={() => this.props.switchTabs("contactUs")}
              >
                <span>Contact us</span>
              </div>
              <div
                className="menu-options"
                onClick={() => {
                  localStorage.clear();
                  this.setState({ loggedOut: true });
                }}
              >
                <span>Admin</span>
              </div>
            </React.Fragment>
          )}

          <hr />
          <div className="popular-markets">
            <span id="popular-market">Popular markets</span>
          </div>
          <div className="markets">
            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>

            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>
            <div className="popular-market"></div>

            <div className="popular-market"></div>
            <div className="popular-market"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftBar;
