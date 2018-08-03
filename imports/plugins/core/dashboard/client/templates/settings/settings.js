import { Template } from "meteor/templating";
import { Reaction } from "/client/api";

Template.settingsHeader.helpers({

  /**
   * Data pased to action view
   * @return {Object} Registry entry for item
   * @ignore
   */
  registry() {
    return Reaction.getActionView() || {};
  },

  isActionViewAtRootView() {
    return Reaction.isActionViewAtRootView();
  }
});

Template.settingsHeader.events({
  "click [data-event-action=closeSettings]": () => {
    Reaction.hideActionView();
  },

  "click .js-back-button"() {
    Reaction.popActionView();
  }
});

Template.settingsSidebar.helpers({
  /**
   * pkgPermissions Check package permissions
   * @return {Boolean} user has permission to see settings for this package
   * @ignore
   */
  pkgPermissions() {
    if (Reaction.hasPermission("dashboard")) {
      if (this.name) {
        return Reaction.hasPermission(this.name);
      }

      return Reaction.hasPermission(this.name);
    }

    return false;
  }
});

Template.settingsSidebarItem.helpers({
  /**
   * label
   * @return {String} Label for item
   * @ignore
   */
  label() {
    return Template.parentData(1).label || this.label;
  }
});
