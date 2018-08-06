import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.taxSettingsLabel",
  icon: "fa fa-university",
  label: "Tax",
  name: "taxSettings",
  pluginName: "reaction-taxes",
  roles: ["dashboard"],
  template: "taxSettings",
  type: "setting"
});
