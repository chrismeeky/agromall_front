import React, { Component } from "react";
import "./css/left-bar.css";
class LeftBar extends Component {
  state = {};
  render() {
    return (
      <div className="left-bar-body">
        <div className="left-bar-content">
          <div className="site-title">
            <span>agromall</span>
          </div>
          <hr />
          <div className="user-profile">
            <div className="row">
              <div className="col-md-8">
                <div className="profile-image"></div>
                <div className="users-name">
                  <span>Chris</span>
                  <span>Admin</span>
                </div>
              </div>
              <div className="col-md-4 sign-out">
                <i className="fa fa-sign-out-alt"></i>
              </div>
            </div>
            <button className="edit-profile btn">
              <i className="fa fa-edit"></i> Edit profile
            </button>
          </div>
          <hr />
          <div
            className="menu-options"
            onClick={() => this.props.switchTabs("newMarkets")}
          >
            <span>New markets</span>
          </div>
          <div
            className="menu-options"
            onClick={() => this.props.switchTabs("nearbyMarkets")}
          >
            <span>Markets nearby</span>
          </div>
          <div
            className="menu-options"
            onClick={() => this.props.switchTabs("addMarket")}
          >
            <span>Add market</span>
          </div>
          <div
            className="menu-options"
            onClick={() => this.props.switchTabs("manageMarkets")}
          >
            <span>Manage markets</span>
          </div>
          <hr />
          <div className="popular-markets">
            <span>Popular markets</span>
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
