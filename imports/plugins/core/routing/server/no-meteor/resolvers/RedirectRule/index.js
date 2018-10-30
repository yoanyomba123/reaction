import { encodeRedirectRuleOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/routing";

export default {
  _id: (rule) => encodeRedirectRuleOpaqueId(rule._id)
};
