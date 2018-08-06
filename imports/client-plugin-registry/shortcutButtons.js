import SimpleSchema from "simpl-schema";
import { Router } from "/client/api";

const shortcutButtonSchema = new SimpleSchema({
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


const shortcutButtons = [];

/**
 * @returns {Object[]} List of registered shortcut buttons
 */
export function getShortcutButtons() {
  const items = shortcutButtons.map((shortcutButton) => ({
    type: "link",
    href: Router.pathFor(shortcutButton.routeName),
    className: Router.isActiveClassName(shortcutButton.routeName),
    icon: shortcutButton.icon,
    tooltip: shortcutButton.label,
    i18nKeyTooltip: shortcutButton.i18nKeyLabel,
    tooltipPosition: "left middle"
  }));

  items.push({ type: "seperator" });

  items.push({
    icon: "plus",
    tooltip: "Create Content",
    i18nKeyTooltip: "app.createContent",
    tooltipPosition: "left middle"
  });

  return items;
}

/**
 * @param {Object} shortcutButton Shortcut button details
 * @returns {undefined}
 */
export function addShortcutButton(shortcutButton) {
  const cleanedButton = shortcutButtonSchema.clean(shortcutButton);
  shortcutButtonSchema.validate(cleanedButton);
  shortcutButtons.push(cleanedButton);
}
