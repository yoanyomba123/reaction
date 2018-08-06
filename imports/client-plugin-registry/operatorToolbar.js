import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";

const toolbarButtonSchema = new SimpleSchema({
  /**
   * We don't expect an ID to be passed in, but we create one before storing so that
   * we can use this as a React key
   */
  "id": {
    type: String,
    autoValue: () => Random.id()
  },
  /**
   * Label is generally not used since i18nKeyLabel is required and used. We require it
   * as a fallback, though.
   */
  "label": String,
  /**
   * The translation key for the label
   */
  "i18nKeyLabel": String,
  /**
   * A FontAwesome icon class to use to render an icon to the left of the label
   */
  "icon": String,
  /**
   * Code to run when the option is clicked in the account dropdown
   */
  "onClick": Function,
  /**
   * Optionally specify a list of roles. If the user has any of these roles, they will
   * see this button in the toolbar. If not set, then all users will see this option.
   */
  "roles": {
    type: Array,
    optional: true
  },
  "roles.$": String,
  /**
   * The name of the plugin adding this. The button won't appear if this plugin
   * is disabled.
   */
  "pluginName": String
});

const toolbarButtons = [];

/**
 * @summary Get a list of toolbar buttons for the operator toolbar, filtered to only
 *   those that should be seen by a user with the given list of roles
 * @param {String[]} roles The roles that the user viewing the app has
 * @returns {Object[]} List of registered toolbar buttons
 */
export function getOperatorToolbarButtonsByRoles(roles) {
  const items = toolbarButtons.filter((item) => !item.roles || !roles || item.roles.find((role) => roles.indexOf(role) !== -1));
  items.sort((itemA, itemB) => itemA.priority - itemB.priority);
  return items;
}

/**
 * @param {Object} toolbarButton Toolbar button details
 * @returns {undefined}
 */
export function addOperatorToolbarButton(toolbarButton) {
  const cleanedButton = toolbarButtonSchema.clean(toolbarButton);
  toolbarButtonSchema.validate(cleanedButton);
  toolbarButtons.push(cleanedButton);
}

/**
 * CUSTOM LEFT-SIDE CONTROLS
 */

const toolbarControlSchema = new SimpleSchema({
  /**
   * A React component class to render on the left side of the operator toolbar
   */
  "Component": Function,
  /**
   * We don't expect an ID to be passed in, but we create one before storing so that
   * we can use this as a React key
   */
  "id": {
    type: String,
    autoValue: () => Random.id()
  },
  /**
   * Optionally specify a list of roles. If the user has any of these roles, they will
   * see this button in the toolbar. If not set, then all users will see this option.
   */
  "roles": {
    type: Array,
    optional: true
  },
  "roles.$": String,
  /**
   * The name of the plugin adding this. The component won't appear if this plugin
   * is disabled.
   */
  "pluginName": String
});

const customControlsLeft = [];

/**
 * @summary Get a list of custom left-side controls for the operator toolbar, filtered to only
 *   those that should be seen by a user with the given list of roles
 * @param {String[]} roles The roles that the user viewing the app has
 * @returns {Object[]} List of registered left-side controls
 */
export function getOperatorToolbarCustomControlsLeftByRoles(roles) {
  return customControlsLeft.filter((item) => !item.roles || !roles || item.roles.find((role) => roles.indexOf(role) !== -1));
}

/**
 * @param {Object} customControl Toolbar custom control details
 * @returns {undefined}
 */
export function addOperatorToolbarCustomControlsLeft(customControl) {
  const cleanedDetails = toolbarControlSchema.clean(customControl);
  toolbarControlSchema.validate(cleanedDetails);
  customControlsLeft.push(cleanedDetails);
}
