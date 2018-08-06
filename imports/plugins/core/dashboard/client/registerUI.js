import { Reaction } from "/client/api";
import { addAccountDropdownOption, addActionView, addSettingsForm, addShortcutButton } from "/imports/client-plugin-registry";

addAccountDropdownOption({
  icon: "icon-reaction-logo",
  i18nKeyLabel: "admin.shortcut.dashboardLabel",
  label: "Dashboard",
  onClick() {
    Reaction.showActionViewByName("actionViewList");
  },
  pluginName: "reaction-dashboard",
  priority: 0,
  routeName: "dashboard"
});

addActionView({
  icon: "icon-reaction-logo",
  i18nKeyLabel: "dashboard.coreTitle",
  label: "Dashboard",
  name: "actionViewList",
  pluginName: "reaction-dashboard",
  roles: ["dashboard"],
  template: "dashboardPackages",
  type: "action"
});

addActionView({
  i18nKeyLabel: "admin.settings.shopSettingsLabel",
  icon: "fa fa-th",
  label: "Shop settings",
  name: "shopSettings",
  pluginName: "reaction-dashboard",
  roles: ["dashboard"],
  template: "shopSettings",
  type: "setting"
});

addShortcutButton({
  icon: "icon-reaction-logo",
  i18nKeyLabel: "admin.shortcut.dashboardLabel",
  label: "Dashboard",
  pluginName: "reaction-dashboard",
  priority: 0,
  routeName: "dashboard"
});

addSettingsForm({
  label: "Options",
  i18nKeyLabel: "admin.settings.options.label",
  location: "shopSettings",
  pluginName: "reaction-dashboard",
  settingsKey: "shopSettings",
  shopTypes: ["primary"],
  template: "optionsShopSettings"
});
