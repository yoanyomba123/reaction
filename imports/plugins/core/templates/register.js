import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Templates",
  name: "reaction-templates",
  icon: "fa fa-columns",
  autoEnable: true,
  settings: {
    name: "Templates",
    custom: {
      enabled: true
    }
  },
  registry: [
    {
      label: "Email Templates",
      name: "templates/settings/email",
      provides: ["templateSettings"],
      template: "emailTemplates"
    }
  ]
});
