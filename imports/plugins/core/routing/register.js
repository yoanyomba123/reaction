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
  }
});
