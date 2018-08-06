import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Payments",
  name: "reaction-payments",
  icon: "fa fa-credit-card",
  autoEnable: true,
  settings: {
    payments: {
      enabled: true
    }
  }
});
