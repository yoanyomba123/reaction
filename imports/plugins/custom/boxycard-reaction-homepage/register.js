import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "BoxyCard",
  name: "boxycard",
  icon: "fa fa-vine",
  autoEnable: true,
  registry: [
    {
      route: "/about",
      name: "about",
      template: "aboutUs",
      workflow: "coreWorkflow"
    },
    {
      route: "/contact",
      name: "contact",
      template: "contactUs",
      workflow: "coreWorkflow"
    },
    {
      route: "/faqs",
      name: "faq",
      template: "faq",
      workflow: "coreWorkflow"
    },
    {
      route: "/templates",
      name: "templates",
      template: "templates",
      workflow: "coreWorkflow"
    },
    {
      route: "/inspiration",
      name: "inspiration",
      template: "inspiration",
      workflow: "coreWorkflow"
    },
    {
      route: "/editor",
      name: "editor",
      template: "editorPage",
      workflow: "coreWorkflow"
    }
  ]
});
