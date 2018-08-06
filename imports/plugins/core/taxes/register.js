import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Taxes",
  name: "reaction-taxes",
  icon: "fa fa-university",
  autoEnable: true,
  settings: {
    custom: {
      enabled: true
    },
    rates: {
      enabled: false
    }
  },
  registry: [
    {
      label: "Custom Rates",
      name: "taxes/settings/rates",
      provides: ["taxSettings"],
      template: "customTaxRates"
    },
    {
      template: "flatRateCheckoutTaxes",
      provides: ["taxMethod"]
    }
  ]
});
