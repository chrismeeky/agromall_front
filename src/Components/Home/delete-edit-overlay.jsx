import React, { useState, Component } from "reactn";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import "./css/delete-edit-overlay.css";

class Example extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <OverlayTrigger
          trigger="click"
          placement="left"
          rootClose={false}
          overlay={
            <Popover id="popover-basic">
              <div className="animated">
                <Popover.Title as="h3">Options</Popover.Title>
                <div className="option" onClick={this.props.handleEdit}>
                  <Popover.Content>
                    <i class="fas fa-pen"></i>{" "}
                    <span style={{ marginLeft: "5px" }}>Edit</span>
                  </Popover.Content>
                </div>
                <div className="option" onClick={this.props.handleDelete}>
                  <Popover.Content>
                    <i class="fas fa-trash"></i>{" "}
                    <span style={{ marginLeft: "5px" }}>Delete</span>
                  </Popover.Content>
                </div>
              </div>
            </Popover>
          }
          rootClose={true}
        >
          <i class="fas fa-ellipsis-v grey-text icons"></i>
        </OverlayTrigger>
      </React.Fragment>
    );
  }
}
export default Example;
