import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import { Reaction } from "/client/api";

const actionViewSchema = new SimpleSchema({
  "dashboardSize": {
    type: String,
    allowedValues: ["lg", "md", "sm"],
    defaultValue: "sm"
  },
  /**
   * We don't expect an ID to be passed in, but we create one before storing so that
   * we can use this as a React key
   */
  "id": {
    type: String,
    autoValue: () => Random.id()
  },
  /**
   * The translation key for the label
   */
  "i18nKeyLabel": String,
  /**
   * An optional FontAwesome icon class to use to render an icon to the left of the label
   */
  "icon": {
    type: String,
    optional: true
  },
  /**
   * Label is generally not used since i18nKeyLabel is required and used. We require it
   * as a fallback, though.
   */
  "label": String,
  /**
   * A unique name. This allows code to show this action view by name.
   */
  "name": String,
  /**
   * The name of the plugin adding this. The option won't appear if this plugin
   * is disabled.
   */
  "pluginName": String,
  /**
   * Optionally specify a list of roles. If the user has any of these roles, they will
   * be able to see this view. If not set, then all users will be able to see this view
   */
  "roles": {
    type: Array,
    optional: true
  },
  "roles.$": String,
  /**
   * Optionally specify a list of shop types. If the current shop has any of these types, users will
   * be able to see this view. If not set, then all users will be able to see this view
   */
  "shopTypes": {
    type: Array,
    optional: true
  },
  "shopTypes.$": {
    type: String,
    allowedValues: ["primary", "merchant", "affiliate"]
  },
  /**
   * The template to show in the action view pane
   */
  "template": String,
  "type": {
    type: String,
    allowedValues: ["action", "product", "setting"]
  }
});

const actionViews = [];

/**
 * @summary Get a list of action views, filtered to only
 *   those that should be seen by a user with the given list of roles
 * @param {String[]} roles The roles that the user viewing the app has
 * @param {String} shopType Current shop's type
 * @param {String} type Return only action views of this type ("action" or "setting")
 * @returns {Object[]} Array of action views
 */
export function getActionViews({ includeDisabled = false, roles, shopType, type }) {
  return actionViews.filter((view) => (!view.roles || !roles || view.roles.find((role) => roles.indexOf(role) !== -1)) &&
    (!type || view.type === type) &&
    (!view.shopTypes || !shopType || view.shopTypes.indexOf(shopType) !== -1) &&
    (includeDisabled || Reaction.isPluginEnabled(view.pluginName)));
}

/**
 * @summary Get the data for a registered action view by name
 * @param {String} name Desired action view name
 * @returns {Object} The registered view data
 */
export function getActionViewByName(name) {
  return actionViews.find((view) => view.name === name);
}

/**
 * @param {Object} actionView The actionView details (see SimpleSchema)
 * @returns {undefined}
 */
export function addActionView(actionView) {
  const cleanedActionView = actionViewSchema.clean(actionView);
  actionViewSchema.validate(cleanedActionView);
  actionViews.push(cleanedActionView);
}
