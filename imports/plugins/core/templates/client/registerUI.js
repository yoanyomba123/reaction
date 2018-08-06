import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  dashboardSize: "md",
  i18nKeyLabel: "admin.settings.templateSettingsLabel",
  icon: "fa fa-columns",
  label: "Template",
  name: "templateSettings",
  pluginName: "reaction-templates",
  roles: ["dashboard"],
  template: "templateSettings",
  type: "setting"
});
