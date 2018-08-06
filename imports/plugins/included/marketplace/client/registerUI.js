import { addActionView, addSettingsForm } from "/imports/client-plugin-registry";

addActionView({
  dashboardSize: "lg",
  i18nKeyLabel: "admin.settings.marketplaceShopsLabel",
  icon: "fa fa-globe",
  label: "Marketplace Shops",
  name: "marketplaceShopsSettings",
  pluginName: "reaction-marketplace",
  roles: ["marketplaceShops"],
  shopTypes: ["primary"],
  template: "MarketplaceShops",
  type: "setting"
});

addSettingsForm({
  label: "Marketplace",
  i18nKeyLabel: "admin.shopSettings.marketplaceLabel",
  icon: "fa fa-globe",
  location: "shopSettings",
  pluginName: "reaction-marketplace",
  settingsKey: "reaction-marketplace",
  shopTypes: ["primary"],
  template: "marketplaceShopSettings"
});

addSettingsForm({
  shopTypes: ["merchant", "affiliate"],
  label: "My Shop Settings",
  i18nKeyLabel: "admin.shopSettings.myShopSettingsLabel",
  icon: "fa fa-briefcase",
  location: "shopSettings",
  pluginName: "reaction-marketplace",
  settingsKey: "reaction-marketplace",
  template: "marketplaceMerchantSettings"
});
