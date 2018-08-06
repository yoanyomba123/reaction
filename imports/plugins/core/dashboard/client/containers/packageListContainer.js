import React from "react";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Reaction } from "/client/api";
import { getActionViews } from "/imports/client-plugin-registry";

/**
 * Push package into action view navigation stack
 * @param  {SyntheticEvent} event Original event
 * @param  {Object} app Package data
 * @return {undefined} No return value
 * @private
 */
function handleShowPackage(event, app) {
  Reaction.pushActionView(app);
}

/**
 * Open full dashboard menu
 * @return {undefined} No return value
 * @private
 */
function handleShowDashboard() {
  Reaction.hideActionViewDetail();
  Reaction.showActionViewByName("actionViewList");
}

/**
 * Push dashboard & package into action view navigation stack
 * @param  {SyntheticEvent} event Original event
 * @param  {Object} app Package data
 * @return {undefined} No return value
 * @private
 */
function handleOpenShortcut(event, app) {
  Reaction.hideActionViewDetail();
  Reaction.showActionView(app);
}

function composer(props, onData) {
  const roles = Roles.getRolesForUser(Meteor.userId(), Reaction.getShopId());

  let actions = getActionViews({ roles, type: "action" });
  actions = actions.filter((view) => view.name !== "actionViewList"); // don't include a link to self

  const settings = getActionViews({ roles, type: "setting" });

  onData(null, {
    currentView: Reaction.getActionView(),
    groupedPackages: {
      actions: {
        title: "Actions",
        i18nKeyTitle: "admin.dashboard.packageGroupActionsLabel",
        packages: actions
      },
      settings: {
        title: "Settings",
        i18nKeyTitle: "admin.dashboard.packageGroupSettingsLabel",
        packages: settings
      }
    },

    // Callbacks
    handleShowPackage,
    handleShowDashboard,
    handleOpenShortcut
  });
}

export default function PackageListContainer(Comp) {
  function CompositeComponent(props) {
    return (
      <Comp {...props} />
    );
  }

  return composeWithTracker(composer)(CompositeComponent);
}
