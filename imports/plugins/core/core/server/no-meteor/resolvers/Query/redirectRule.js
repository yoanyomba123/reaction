import ReactionError from "@reactioncommerce/reaction-error";
import rules from "./redirectRules.json";

/**
 * @name Query.redirectRule
 * @method
 * @memberof Routes/GraphQL
 * @summary get a specific redirect rule
 * @param {Object} _ - unused
 * @param {Object} params - an object of all arguments that were sent by the client
 * @param {String} params.from - path to redirect from
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} RedirectRule
 */
export default async function redirectRule(_, { from }) {
  const rule = rules.find((rule) => from === rule.from);
  if (!rule) throw new ReactionError("not-found", "Redirect rule not found");
  return rule;
}
