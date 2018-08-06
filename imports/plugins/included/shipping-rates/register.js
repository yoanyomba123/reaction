import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Shipping Rates",
  name: "reaction-shipping-rates",
  icon: "fa fa-truck-o",
  autoEnable: true,
  settings: {
    name: "Flat Rate Service",
    flatRates: {
      enabled: false
    }
  },
  registry: [
    {
      provides: ["shippingSettings"],
      name: "shipping/settings/flatRates",
      label: "Flat Rate",
      description: "Provide shipping rates",
      icon: "fa fa-truck",
      template: "shippingRatesSettings"
    },
    {
      template: "flatRateCheckoutShipping",
      name: "shipping/flatRates",
      provides: ["shippingMethod"]
    }
  ]
});
