import Reaction from "/imports/plugins/core/core/server/Reaction";
import mutations from "./server/mutations";
import queries from "./server/queries";
import resolvers from "./server/resolvers";
import schemas from "./server/schemas";

Reaction.registerPackage({
  label: "Shop",
  name: "reaction-shop",
  icon: "fa fa-th",
  autoEnable: true,
  graphQL: {
    resolvers,
    schemas
  },
  queries,
  mutations
});
