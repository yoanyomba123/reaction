import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.shippingSettingsLabel",
  icon: "fa fa-truck",
  label: "Shipping",
  name: "shippingSettings",
  pluginName: "reaction-shipping",
  roles: ["dashboard"],
  template: "shippingSettings",
  type: "setting"
});
