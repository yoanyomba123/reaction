import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";

const optionSchema = new SimpleSchema({
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
   * An optional FontAwesome icon class to use to render an icon to the left of the label
   */
  "icon": {
    type: String,
    optional: true
  },
  /**
   * Code to run when the option is clicked in the account dropdown
   */
  "onClick": Function,
  /**
   * Optionally specify a list of roles. If the user has any of these roles, they will
   * see this option in the menu. If not set, then all users will see this option.
   */
  "roles": {
    type: Array,
    optional: true
  },
  "roles.$": String,
  /**
   * The name of the plugin adding this. The option won't appear if this plugin
   * is disabled.
   */
  "pluginName": String,
  /**
   * A priority integer. The full list of added menu items is sorted by this, ascending,
   * when rendered.
   */
  "priority": {
    type: SimpleSchema.Integer,
    min: 0,
    defaultValue: 1000
  }
});

const accountDropdownOptions = [];

/**
 * @summary Get a list of options for the account dropdown, filtered to only
 *   those that should be seen by a user with the given list of roles
 * @param {String[]} roles The roles that the user viewing the app has
 * @returns {Object[]} Array of options
 */
export function getAccountDropdownOptionsByRoles(roles) {
  const options = accountDropdownOptions.filter((option) => !option.roles || !roles || option.roles.find((role) => roles.indexOf(role) !== -1));
  options.sort((itemA, itemB) => itemA.priority - itemB.priority);
  return options;
}

/**
 * @param {Object} option The option details (see SimpleSchema)
 * @returns {undefined}
 */
export function addAccountDropdownOption(option) {
  const cleanedOption = optionSchema.clean(option);
  optionSchema.validate(cleanedOption);
  accountDropdownOptions.push(cleanedOption);
}
