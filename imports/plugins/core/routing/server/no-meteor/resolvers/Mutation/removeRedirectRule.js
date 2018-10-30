import ReactionError from "@reactioncommerce/reaction-error";
import SimpleSchema from "simpl-schema";
import { RedirectRule as schema } from "/imports/collections/schemas";
import { decodeRedirectRuleOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/routing";

/**
 * @name Mutation.removeRedirectRule
 * @method
 * @memberof Routes/GraphQL
 * @summary Remove a specified redirect rule
 * @param {Object} parentResult - unused
 * @param {Object} args.input - RemoveRedirectRuleInput
 * @param {String} args.input.id - id of the rule to remove
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} RemoveRedirectRulePayload
 */
export default async function removeRedirectRule(parentResult, { input }, context) {
  const { RedirectRules } = context.collections;
  const ruleId = decodeRedirectRuleOpaqueId(input.id);

  const { result } = await RedirectRules.deleteOne({ _id: ruleId });

  if (result.n === 0) {
    throw new ReactionError("not-found", "Redirect rule not found");
  }

  return {
    clientMutationId: input.clientMutationId,
    wasRemoved: result.ok === 1
  };
}
