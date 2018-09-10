import React, { Component } from "react";
import { Components } from "@reactioncommerce/reaction-components";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { getRawComponent, registerComponent } from "@reactioncommerce/reaction-components";
import { i18nextDep, i18next, Reaction, Logger } from "/client/api";

const MainDropdown = getRawComponent("MainDropdown");
const iconStyle = {
  margin: "10px 10px 10px 6px",
  width: "20px",
  fontSize: "inherit",
  textAlign: "center"
};

const menuStyle = {
  padding: "0px 10px 10px 10px",
  minWidth: 220,
  minHeight: 50
};

class BoxyMainDropdown extends MainDropdown {
  renderSignInComponent() {
    return (
      <div className="accounts-dropdown">
        <div className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000">
          <a href='#' style={{ fontFamily: 'Futura', color: 'white', letterSpacing: 1, fontSize: 13 }}>LOGIN</a>
        </div>
        <div
          className="accounts-dialog accounts-layout dropdown-menu pull-right"
          style={{ padding: "10px 20px" }}
        >
          <Components.Login />
        </div>
      </div>
    );
  }

  renderSignOutButton() {
    return (
      <Components.MenuItem
        className="btn btn-primary btn-block accounts-btn-tag"
        label="Sign out"
        value="logout"
      />
    );
  }

  buttonElement() {
    return (
      <Components.Button containerStyle={{ color: "#FFF", fontWeight: "normal", letterSpacing: 0.8 }}>
        <span className="main-dropdown-userName">MY ACCOUNT</span>&nbsp;
        <Components.Icon
          icon={"fa fa-caret-down"}
        />
      </Components.Button>
    );
  }

  render() {
    return (
      <div className="imherebitches accounts">
        {this.props.currentAccount ?
          <div>
            <Components.DropDownMenu
              buttonElement={this.buttonElement()}
              attachment="bottom right"
              targetAttachment="top right"
              menuStyle={menuStyle}
              className="accounts-li-tag"
              onChange={this.props.handleChange}
              constraints={[{
                to: "window",
                attachment: "together"
              }]}
            >
              {this.renderUserIcons()}
              {this.renderAdminIcons()}
              {this.renderSignOutButton()}
            </Components.DropDownMenu>
          </div>
          :
          <div className="accounts dropdown" role="menu">
            {this.renderSignInComponent()}
          </div>
        }
      </div>
    );
  }
}


registerComponent("BoxyMainDropdown", BoxyMainDropdown);
export default BoxyMainDropdown;

