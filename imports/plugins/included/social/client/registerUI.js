import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.socialSettingsLabel",
  icon: "fa fa-share-alt",
  label: "Social",
  name: "socialSettings",
  pluginName: "reaction-social",
  roles: ["dashboard/social"],
  template: "socialSettings",
  type: "setting"
});
