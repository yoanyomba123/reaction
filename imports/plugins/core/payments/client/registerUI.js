import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "admin.settings.paymentSettingsLabel",
  icon: "fa fa-credit-card",
  label: "Payment",
  name: "paymentSettings",
  pluginName: "reaction-payments",
  roles: ["dashboard"],
  template: "paymentSettings",
  type: "setting"
});
