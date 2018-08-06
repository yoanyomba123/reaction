import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Notifications",
  name: "reaction-notification",
  icon: "fa fa-bell",
  autoEnable: true,
  permissions: [{
    label: "Notifications",
    permission: "notifications"
  }],
  registry: [{
    label: "Notifications",
    name: "notifications",
    route: "/notifications",
    workflow: "coreWorkflow",
    template: "notificationRoute"
  }]
});
