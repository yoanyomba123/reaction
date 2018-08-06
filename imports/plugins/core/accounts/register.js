import Reaction from "/imports/plugins/core/core/server/Reaction";

/**
 * @file Accounts core plugin: Manage how members sign into your shop
 *
 * @namespace Accounts
 */

Reaction.registerPackage({
  label: "Accounts",
  name: "reaction-accounts",
  icon: "fa fa-users",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/account/profile/verify",
    label: "Account Verify",
    name: "account/verify",
    workflow: "coreAccountsWorkflow",
    template: "VerifyAccount"
  }, {
    route: "/dashboard/accounts",
    name: "dashboard/accounts",
    workflow: "coreAccountsWorkflow",
    label: "Accounts",
    icon: "fa fa-users",
    priority: 1,
    container: "dashboard",
    template: "accountsDashboard"
  }, {
    route: "/account/profile",
    template: "accountProfile",
    name: "account/profile",
    label: "Profile",
    icon: "fa fa-user"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreAccountsWorkflow",
    collection: "Accounts",
    theme: "default",
    enabled: true,
    structure: {
      template: "accountsDashboard",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
