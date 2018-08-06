import SimpleSchema from "simpl-schema";

const menuItemSchema = new SimpleSchema({
  label: String,
  i18nKeyLabel: {
    type: String,
    optional: true
  },
  icon: {
    type: String,
    optional: true
  },
  routeName: String,
  pluginName: String,
  priority: {
    type: SimpleSchema.Integer,
    defaultValue: 1000
  }
});


const menuItems = [];

/**
 * @returns {Object[]} List of registered items for the create content menu
 */
export function getCreateContentMenuItems() {
  return menuItems;
}

/**
 * @param {Object} menuItem Menu item details
 * @returns {undefined}
 */
export function addCreateContentMenuItem(menuItem) {
  const cleanedItem = menuItemSchema.clean(menuItem);
  menuItemSchema.validate(cleanedItem);
  menuItems.push(cleanedItem);
}
