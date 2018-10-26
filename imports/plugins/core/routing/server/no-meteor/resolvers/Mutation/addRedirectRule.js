import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import { RedirectRule as schema } from "/imports/collections/schemas";

/**
 * @name Mutation.addRedirectRule
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a redirect rule
 * @param {Object} _ - unused
 * @param {Object} args.input - AddRedirectRuleInput
 * @param {String} args.from - path to redirect from
 * @param {String} args.to - path to redirect to
 * @param {Number} args.status - HTTP status code of the redirect
 * @param {String} args.type - RedirectType
 * @param {Boolean} args.enabled - whether the rule is enabled
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} AddRedirectRulePayload
 */
export default async function addRedirectRule(parentResult, { input }, context) {
  const { RedirectRules } = context.collections;
  const { clientMutationId } = input;

  const redirectRule = {
    _id: Random.id(),
    from: input.from,
    to: input.to,
    type: input.type,
    status: input.status,
    enabled: input.enabled
  };

  schema.validate(redirectRule);
  const { result } = await RedirectRules.insertOne(redirectRule);

  if (result.ok !== 1) {
    throw new ReactionError("server-error", "Unable to create rule");
  }

  return {
    clientMutationId,
    redirectRule
  };
}
