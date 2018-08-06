import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { Packages } from "/lib/collections";
import Reaction from "/imports/plugins/core/core/server/Reaction";

/**
 * @summary Transforms the document to remove all non-public settings if the user
 *   should not see them
 * @param {Object} doc The Package document
 * @param {String} userId The current user ID
 * @returns {Object} Transformed document
 */
function transform(doc, userId) {
  let permissions = ["admin", "owner", doc.name];

  // Get all permissions, add them to an array
  if (doc.permissions) {
    for (const item of doc.permissions) {
      permissions.push(item.permission);
    }
  }
  permissions = _.uniq(permissions);

  // check for admin,owner or package permissions to view settings
  const hasAdmin = Roles.userIsInRole(userId, permissions, doc.shopId);

  // admin users get all settings the intent of this it so block publication of settings without limiting the use settings
  // in this transform. non admin users should get public setting
  if (!hasAdmin && doc.settings) {
    doc.settings = {
      public: doc.settings.public
    };
  }

  return doc;
}

Meteor.publish("Packages", function publishPackages(shopId) {
  check(shopId, Match.Maybe(String));

  const self = this;
  let myShopId = shopId;

  // user is required.
  if (self.userId) {
    // default options, we're limiting fields here that we don't want to publish unless admin user. in particular, settings
    // should not be published but we need to use settings in the transform everything except settings.public and
    // settings.*.enabled are removed in transform
    let options = {
      fields: {
        shopId: 1,
        name: 1,
        enabled: 1,
        registry: 1,
        layout: 1,
        icon: 1,
        settings: 1,
        audience: 1
      }
    };

    if (!shopId) {
      myShopId = Reaction.getPrimaryShopId();
    }

    // we should always have a shop
    if (myShopId) {
      // if admin user, return all shop properties
      if (Roles.userIsInRole(self.userId, [
        "dashboard", "owner", "admin"
      ], Reaction.getShopId() || Roles.userIsInRole(self.userId, [
        "owner", "admin"
      ], Roles.GLOBAL_GROUP))) {
        options = {};
      }
      // observe and transform Package registry adds i18n and other meta data
      const observer = Packages.find({
        shopId: myShopId
      }, options).observe({
        added(doc) {
          self.added("Packages", doc._id, transform(doc, self.userId));
        },
        changed(newDoc, origDoc) {
          self.changed("Packages", origDoc._id, transform(newDoc, self.userId));
        },
        removed(origDoc) {
          self.removed("Packages", origDoc._id);
        }
      });

      self.onStop(() => {
        observer.stop();
      });
    }
    return self.ready();
  }

  return self.ready();
});
