import SimpleSchema from "simpl-schema";

const settingsFormSchema = new SimpleSchema({
  "label": String,
  "i18nKeyLabel": String,
  "icon": {
    type: String,
    optional: true
  },
  "location": String,
  "pluginName": String,
  "settingsKey": String,
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
  "template": String
});

const forms = [];

/**
 * @returns {Object[]} List of registered settings forms
 */
export function getSettingsForms({ location, shopType }) {
  return forms.filter((form) => form.location === location &&
    (!form.shopTypes || !shopType || form.shopTypes.indexOf(shopType) !== -1));
}

/**
 * @param {Object} form Settings form details
 * @returns {undefined}
 */
export function addSettingsForm(form) {
  const cleanedForm = settingsFormSchema.clean(form);
  settingsFormSchema.validate(cleanedForm);
  forms.push(cleanedForm);
}
