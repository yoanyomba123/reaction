import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.searchSettingsLabel",
  icon: "fa fa-search",
  label: "Search",
  name: "searchSettings",
  pluginName: "reaction-search",
  roles: ["dashboard"],
  template: "searchSettings",
  type: "setting"
});
