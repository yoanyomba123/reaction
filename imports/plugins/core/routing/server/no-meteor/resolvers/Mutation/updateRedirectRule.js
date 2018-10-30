import ReactionError from "@reactioncommerce/reaction-error";
import SimpleSchema from "simpl-schema";
import { RedirectRule as schema } from "/imports/collections/schemas";
import { decodeRedirectRuleOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/routing";

const paramsSchema = new SimpleSchema({
  from: String,
  to: String,
  type: String,
  status: SimpleSchema.Integer,
  enabled: Boolean
}, { requiredByDefault: false });

/**
 * @name Mutation.updateRedirectRule
 * @method
 * @memberof Routes/GraphQL
 * @summary Update a specified redirect rule
 * @param {Object} _ - unused
 * @param {Object} args.input - UpdateRedirectRuleInput
 * @param {String} args.input.id - id of the rule to update
 * @param {String} [args.input.from] - path to redirect from
 * @param {String} [args.input.to] - path to redirect to
 * @param {Number} [args.input.status] - HTTP status code of the redirect
 * @param {String} [args.input.type] - RedirectType
 * @param {Boolean} [args.input.enabled] - whether the rule is enabled
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} UpdateRedirectRulePayload
 */
export default async function updateRedirectRule(parentResult, { input }, context) {
  const { RedirectRules } = context.collections;
  const { clientMutationId } = input;
  const ruleId = decodeRedirectRuleOpaqueId(input.id);

  const params = {
    from: input.from,
    to: input.to,
    type: input.type,
    status: input.status,
    enabled: input.enabled
  };
  paramsSchema.validate(params);

  const { result } = await RedirectRules.updateOne(
    { _id: ruleId },
    { $set: params }
  );

  if (result.n === 0) {
    throw new ReactionError("not-found", "Redirect rule not found");
  }

  const redirectRule = await RedirectRules.findOne({ _id: ruleId });

  return {
    clientMutationId,
    redirectRule
  };
}
