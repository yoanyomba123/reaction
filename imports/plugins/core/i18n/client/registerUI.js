import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.localizationAndI18NLabel",
  icon: "fa fa-language",
  label: "Localization and i18n",
  name: "i18nSettings",
  pluginName: "reaction-i18n",
  roles: ["dashboard"],
  template: "i18nSettings",
  type: "setting"
});
