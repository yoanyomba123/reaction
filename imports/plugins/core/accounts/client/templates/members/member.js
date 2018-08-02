import _ from "lodash";
import { Components } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Roles } from "meteor/alanning:roles";
import { Reaction } from "/client/api";
import { Packages, Shops } from "/lib/collections";
import AccountsDashboard from "../../containers/accountsDashboardContainer";
import { groupPermissions } from "../../helpers/accountsHelper";

/**
 * shopMember helpers
 * permissions / roles controls
 * we use userInRole instead of Reaction intentionally
 * to check each users permissions
 */
Template.member.events({
  "click [data-event-action=showMemberSettings]"() {
    $(".customerUsageType input").val(""); // form reset
    $(".customerUsageType").addClass("hide"); // form reset
    Reaction.setActionViewDetail({
      label: "Permissions",
      i18nKeyLabel: "admin.settings.permissionsSettingsLabel",
      data: this,
      template: "memberSettings"
    });
  }
});

Template.memberSettings.helpers({
  isOwnerDisabled() {
    if (Meteor.userId() === this.userId) {
      if (Roles.userIsInRole(this.userId, "owner", this.shopId)) {
        return true;
      }
    }
  },
  userId() {
    return Meteor.userId();
  },
  hasPermissionChecked(permission, userId) {
    if (userId && Roles.userIsInRole(userId, permission, this.shopId || Roles.userIsInRole(
      userId, permission,
      Roles.GLOBAL_GROUP
    ))) {
      return "checked";
    }
  },
  groupsForUser(groupUserId) {
    const userId = groupUserId || this.userId || Template.parentData(1).userId;
    return Roles.getGroupsForUser(userId);
  },
  shopLabel(thisShopId) {
    const shopId = thisShopId || Template.currentData();
    const shop = Shops.findOne({
      _id: shopId
    });
    if (shop && shop.name) {
      return shop.name || "Default Shop";
    }
  },
  permissionGroups(thisShopId) {
    const shopId = thisShopId || Template.currentData();
    const packages = Packages.find({
      shopId
    });

    return groupPermissions(packages);
  },

  hasManyPermissions(permissions) {
    return Boolean(permissions.length);
  },

  /**
   * showAvalaraTaxSettings
   * @return {Boolean} True if avalara is enabled. Defaults to false if not found
   * @ignore
   */
  showAvalaraTaxSettings() {
    const avalara = Reaction.getPackageSettings("taxes-avalara");

    return _.get(avalara, "settings.avalara.enabled", false);
  },

  accountsDetail() {
    return {
      component: AccountsDashboard
    };
  },

  ReactionAvatar() {
    return {
      component: Components.ReactionAvatar
    };
  }
});

/**
 * shopMember events
 *
 */
Template.memberSettings.events({
  "change [data-event-action=toggleMemberPermission]"(event, template) {
    const self = this;
    const permissions = [];
    const member = template.data;
    if (!this.shopId) {
      throw new Meteor.Error("invalid-parameter", "Shop is required");
    }
    if (self.name) {
      permissions.push(self.name);
      for (const pkgPermissions of self.permissions) {
        permissions.push(pkgPermissions.permission);
      }
    } else {
      permissions.push(self.permission);
    }
    if (Template.instance().$(event.currentTarget).is(":checked")) {
      Meteor.call("accounts/addUserPermissions", member.userId, permissions, this.shopId);
    } else {
      Meteor.call("accounts/removeUserPermissions", member.userId, permissions, this.shopId);
    }
  },
  "click [data-event-action=resetMemberPermission]"(event, template) {
    const $icon = Template.instance().$(event.currentTarget);
    if (confirm($icon.data("confirm"))) { // eslint-disable-line no-alert
      const results = [];
      for (const role of template.data.roles) {
        results.push(Meteor.call("accounts/setUserPermissions", this.userId, ["guest", "account/profile"], role));
      }
      return results;
    }
  }
});
