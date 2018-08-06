import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Dashboard",
  name: "reaction-dashboard",
  icon: "fa fa-th",
  autoEnable: true,
  permissions: [{
    label: "Dashboard",
    permission: "dashboard"
  }],
  settings: {
    name: "Dashboard"
  },
  registry: [{
    route: "/dashboard",
    name: "dashboard",
    workflow: "coreDashboardWorkflow",
    label: "Dashboard",
    template: "dashboardPackages",
    icon: "icon-reaction-logo",
    priority: 0
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreDashboardWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "dashboardPackages",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "dashboardHeaderControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
