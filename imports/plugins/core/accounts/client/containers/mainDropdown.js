import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { registerComponent, composeWithTracker, withCurrentAccount } from "@reactioncommerce/reaction-components";
import { i18nextDep, i18next, Reaction, Logger } from "/client/api";
import { getUserAvatar } from "/imports/plugins/core/accounts/client/helpers/helpers";
import { getAccountDropdownOptionsByRoles } from "/imports/client-plugin-registry";
import MainDropdown from "../components/mainDropdown";

function displayName(displayUser) {
  i18nextDep.depend();

  const user = displayUser || Accounts.user();

  if (user) {
    if (user.name) {
      return user.name;
    } else if (user.username) {
      return user.username;
    } else if (user.profile && user.profile.name) {
      return user.profile.name;
    }

    // todo: previous check was user.services !== "anonymous", "resume". Is this
    // new check covers previous check?
    if (Roles.userIsInRole(
      user._id || user.userId, "account/profile",
      Reaction.getShopId()
    )) {
      return i18next.t("accountsUI.guest", { defaultValue: "Guest" });
    }
  }
}

/**
 * @summary change handler function for when a dropdown option is clicked
 * @param {Object} event The event
 * @param {String|Object} value The option value
 * @returns {undefined}
 */
function handleChange(event, value) {
  event.preventDefault();

  if (value === "logout") {
    Meteor.logout((error) => {
      if (error) {
        Logger.error(error, "Failed to logout.");
      }

      // Resets the app to show the primary shop as the active shop when a user logs out.
      // When an admin user is switching back and forth between shops, the app will keep the
      // activeShopId as the last shop visited. If an admin user logs out, the app will stay on that shop
      // for any new user who uses the same browser, temporarily, until the app is refreshed. This fixes that issue.
      Reaction.setShopId(Reaction.getPrimaryShopId());
    });
    return;
  }

  // Else value is a registered option with an onClick
  value.onClick();
}

const composer = ({ currentAccount }, onData) => {
  const userImage = getUserAvatar(currentAccount);
  const userName = displayName(currentAccount);

  const roles = Roles.getRolesForUser(Meteor.userId(), Reaction.getShopId());
  const menuItems = getAccountDropdownOptionsByRoles(roles);

  onData(null, {
    menuItems,
    userImage,
    userName
  });
};

const handlers = {
  handleChange
};

registerComponent("MainDropdown", MainDropdown, [
  withCurrentAccount,
  withProps(handlers),
  composeWithTracker(composer, false)
]);

export default compose(
  withCurrentAccount,
  withProps(handlers),
  composeWithTracker(composer, false)
)(MainDropdown);
