import _ from "lodash";
import Logger from "@reactioncommerce/logger";
import { Roles } from "meteor/alanning:roles";

/**
 * @name assignOwnerRoles
 * @method
 * @memberof Core
 * @summary populate roles with all the packages and their permissions
 * this is the main way that roles are inserted and created for
 * admin user.
 * we assign all package roles to each owner account for each shopId
 * we assign only basic GLOBAL_GROUP rights
 *
 * @param  {String} shopId - shopId
 * @param  {String} pkgName - Package name
 * @param  {Object} pkg - Package object
 * @return {undefined}
 */
export default function assignOwnerRoles(shopId, pkgName, pkg) {
  const defaultRoles = ["owner", "admin", "createProduct", "guest", pkgName];
  const globalRoles = defaultRoles;

  // A wrong value in permissions (ie. [String] instead of [Object] in any plugin register.js
  // results in an undefined element in defaultRoles Array
  // an undefined value would make Roles.getUsersInRole(defaultRoles) return ALL users
  (pkg.permissions || []).forEach((entry) => {
    if (entry && typeof entry.permission === "string" && entry.permission.length) {
      defaultRoles.push(entry.permission);
    }
  });

  // only unique roles
  const defaultOwnerRoles = _.uniq(defaultRoles);

  // get existing shop owners to add new roles to
  const shopOwners = Roles.getUsersInRole(defaultOwnerRoles).fetch();
  const ownerIds = shopOwners.map((user) => user._id);

  // we don't use accounts/addUserPermissions here because we may not yet have permissions
  Roles.addUsersToRoles(ownerIds, defaultOwnerRoles, shopId);

  // the reaction owner has permissions to all sites by default
  Roles.addUsersToRoles(ownerIds, globalRoles, Roles.GLOBAL_GROUP);

  Logger.debug(`Owner permissions added for ${pkgName}`);
}
