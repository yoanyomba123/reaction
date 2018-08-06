import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  dashboardSize: "md",
  i18nKeyLabel: "admin.settings.emailSettingsLabel",
  icon: "fa fa-envelope-o",
  label: "Email settings",
  name: "emailSettings",
  pluginName: "reaction-email",
  roles: ["email/settings"],
  template: "emailSettings",
  type: "setting"
});
