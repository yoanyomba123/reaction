import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tracker } from "meteor/tracker";
import { Components } from "@reactioncommerce/reaction-components";
import {
  FlatButton,
  Icon,
  VerticalDivider
} from "/imports/plugins/core/ui/client/components";
import ReactComponentOrBlazeTemplate from "/imports/plugins/core/core/client/components/ReactComponentOrBlazeTemplate";
import { Translatable } from "/imports/plugins/core/ui/client/providers";
import { Reaction } from "/client/api";
import ShopSelect from "../components/shopSelect";

class OperatorToolbar extends Component {
  static propTypes = {
    customControlsLeft: PropTypes.arrayOf(PropTypes.shape({
      Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      id: PropTypes.string.isRequired
    })),
    dashboardHeaderTemplate: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.string]),
    documentIds: PropTypes.arrayOf(PropTypes.string),
    documents: PropTypes.arrayOf(PropTypes.object),
    hasCreateProductAccess: PropTypes.bool,
    isEnabled: PropTypes.bool,
    onShopSelectChange: PropTypes.func,
    pluginButtons: PropTypes.arrayOf(PropTypes.object),
    shopId: PropTypes.string,
    shops: PropTypes.arrayOf(PropTypes.object),
    showViewAsControls: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
    translation: PropTypes.shape({
      lang: PropTypes.string
    })
  }

  static defaultProps = {
    showViewAsControls: true,
    isEnabled: true
  }

  componentDidMount() {
    // Tracker is used to determine if a user has `hasShopSwitcherAccess` permission
    // If they do not, set the shop one time, and then not again
    // If the user does have hasShopSwitcherAccess` permission, shop is set by this.renderShopSelect()
    this.tracker = Tracker.autorun(() => {
      if (!Reaction.hasShopSwitcherAccess()) {
        this.onShopSelectChange(null, Reaction.getSellerShopId());
      }
    });
  }

  componentWillUnmount() {
    // Unmount the tracker that is checking for `hasShopSwitcherAccess` permission
    this.tracker.stop();
  }

  // Passthrough to shopSelectChange handler in container above
  onShopSelectChange = (event, shopId) => {
    if (typeof this.props.onShopSelectChange === "function") {
      this.props.onShopSelectChange(event, shopId);
    }
  }

  renderViewControls() {
    if (this.props.showViewAsControls) {
      return (
        <FlatButton
          label="Private"
          i18nKeyLabel="app.private"
          i18nKeyToggleOnLabel="app.public"
          toggleOnLabel="Public"
          icon="fa fa-eye-slash"
          onIcon="fa fa-eye"
          toggle={true}
          value="public"
          onValue="private"
          toggleOn={this.isVisible === "public"}
          onToggle={this.handleVisibilityChange}
        />
      );
    }

    return null;
  }

  renderShopSelect() {
    // If a user has owner, admin, or marketplace permissions for more than one (1) shops
    // show the shop switcher to allow for easy switching between the shops
    if (Reaction.hasShopSwitcherAccess()) {
      return (
        <ShopSelect
          onShopSelectChange={this.onShopSelectChange}
          shopId={this.props.shopId}
          shops={this.props.shops}
        />
      );
    }

    return null;
  }

  renderAdminButton() {
    return (
      <div className="hidden-xs">
        <Components.ToolbarGroup visibleOnMobile={true}>
          <VerticalDivider key={"divder-2"} />
          <FlatButton
            key="dashboard-button"
            onClick={() => {
              Reaction.showActionViewByName("actionViewList");
            }}
          >
            <Icon icon="icon icon-reaction-logo" />
          </FlatButton>
        </Components.ToolbarGroup>
      </div>
    );
  }

  renderPluginButtons() {
    const { pluginButtons } = this.props;

    return (pluginButtons || []).map((pluginButton) => (
      <FlatButton
        i18nKeyTooltip={pluginButton.i18nKeyLabel}
        icon={pluginButton.icon}
        key={pluginButton.id}
        onClick={pluginButton.onClick}
        tooltip={pluginButton.label}
      />
    ));
  }

  renderCustomControlsLeft() {
    const { customControlsLeft } = this.props;

    return (customControlsLeft || []).map((customControl) => <customControl.Component key={customControl.id} />);
  }

  renderCustomControlsRight() {
    const { dashboardHeaderTemplate, hasCreateProductAccess } = this.props;

    if (!dashboardHeaderTemplate || !hasCreateProductAccess) return null;

    return (
      <span key="customControls"><ReactComponentOrBlazeTemplate name={dashboardHeaderTemplate} /></span>
    );
  }

  render() {
    return (
      <Components.Toolbar>
        <Components.ToolbarGroup firstChild={true}>
          {this.renderCustomControlsLeft()}
          {this.renderShopSelect()}
        </Components.ToolbarGroup>
        <Components.ToolbarGroup lastChild={true}>
          {this.renderPluginButtons()}
          {this.renderCustomControlsRight()}
        </Components.ToolbarGroup>
        {this.renderAdminButton()}
      </Components.Toolbar>
    );
  }
}

export default Translatable()(OperatorToolbar);
