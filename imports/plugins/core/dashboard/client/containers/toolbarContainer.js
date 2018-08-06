import React from "react";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Shops } from "/lib/collections";
import { AdminContextProvider } from "/imports/plugins/core/ui/client/providers";
import { getOperatorToolbarButtonsByRoles, getOperatorToolbarCustomControlsLeftByRoles } from "/imports/client-plugin-registry";

/**
 * @summary Handler that fires when the shop selector is changed
 * @param {Object} event - the `event` coming from the select change event
 * @param {String} shopId - The `value` coming from the select change event
 * @returns {undefined}
 * @private
 */
const handleShopSelectChange = (event, shopId) => {
  if (/^[A-Za-z0-9]{17}$/.test(shopId)) { // Make sure shopId is a valid ID
    Reaction.setShopId(shopId);
  }
};

function composer(props, onData) {
  // Reactive data sources
  const shopIds = Reaction.getShopsForUser(["owner", "admin", "dashboard"]);
  const shops = Shops.find({
    _id: { $in: shopIds }
  }).fetch();

  const roles = Roles.getRolesForUser(Meteor.userId(), Reaction.getShopId());
  const pluginButtons = getOperatorToolbarButtonsByRoles(roles);
  const customControlsLeft = getOperatorToolbarCustomControlsLeftByRoles(roles);

  onData(null, {
    actionViewIsOpen: Reaction.isActionViewOpen(),
    customControlsLeft,
    dashboardHeaderTemplate: props.data.dashboardHeader,
    hasCreateProductAccess: Reaction.hasPermission("createProduct", Meteor.userId(), Reaction.getShopId()),
    isActionViewAtRootView: Reaction.isActionViewAtRootView(),
    onShopSelectChange: handleShopSelectChange,
    pluginButtons,
    shopId: Reaction.getShopId(),
    shops
  });
}

export default function ToolbarContainer(Comp) {
  function CompositeComponent(props) {
    return (
      <AdminContextProvider>
        <Comp {...props} />
      </AdminContextProvider>
    );
  }

  return composeWithTracker(composer)(CompositeComponent);
}
