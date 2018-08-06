import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Products",
  name: "reaction-product-variant",
  icon: "fa fa-cubes",
  autoEnable: true,
  permissions: [{
    label: "Create Product",
    permission: "createProduct"
  }],
  registry: [{
    route: "/tag/:slug?",
    name: "tag",
    template: "products",
    workflow: "coreProductGridWorkflow"
  }, {
    route: "/products/createProduct",
    name: "createProduct",
    label: "Add Product",
    icon: "fa fa-plus",
    template: "productDetail",
    priority: 1
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    structure: {
      template: "productDetail",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "productNotFound",
      dashboardHeader: "ProductPublish",
      dashboardControls: "productDetailDashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }, {
    layout: "coreLayout",
    workflow: "coreProductGridWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    structure: {
      template: "products",
      layoutHeader: "NavBar",
      layoutFooter: "",
      notFound: "productNotFound",
      dashboardHeader: "GridProductPublish",
      dashboardControls: "productDetailDashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
