import Reaction from "/imports/plugins/core/core/server/Reaction";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  label: "Routing",
  name: "reaction-routing",
  icon: "fa fa-table",
  autoEnable: true,
  graphQL: {
    resolvers,
    schemas
  },
  registry: [{
    label: "URL Redirects",
    description: "URL Redirects",
    icon: "fa fa-table",
    name: "routing/settings",
    provides: ["settings"],
    workflow: "coreRoutingWorkflow",
    template: "routingSettings",
    meta: {
      actionView: {
        dashboardSize: "md"
      }
    }
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreRoutingWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "routingSettings",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
