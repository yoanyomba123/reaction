import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Search",
  name: "reaction-search",
  icon: "fa fa-search",
  autoEnable: true,
  settings: {
    products: {
      includes: {
        title: true,
        description: true,
        pageTitle: false,
        metafields: true,
        vendor: true
      },
      weights: {
        title: 10,
        description: 5,
        pageTitle: 3,
        metafields: 1,
        vendor: 4
      }
    }
  }
});
