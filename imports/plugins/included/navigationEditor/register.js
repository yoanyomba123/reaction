import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Navigation",
  name: "reaction-navigation",
  icon: "fa fa-bars",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/dashboard/navigation",
    name: "navigation",
    workflow: "coreDashboardWorkflow",
    provides: ["dashboard"],
    label: "Navigation",
    template: "navigationEditor",
    icon: "fa fa-bars",
    priority: 0,
    container: "core",
    permissions: [{
      label: "Navigation",
      permission: "navigation"
    }]
  }]
});
