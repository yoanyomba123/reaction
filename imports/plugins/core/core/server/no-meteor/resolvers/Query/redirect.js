const rules = require("./redirectRules.json");

/**
 * @name Query.redirect
 * @method
 * @memberof Routes/GraphQL
 * @summary get a specific redirect rule
 * @param {Object} _ - unused
 * @param {Object} params - an object of all arguments that were sent by the client
 * @param {String} params.from - path to redirect from
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} Redirect
 */
export default async function redirect(_, { from }) {
  return rules.find((rule) => from === rule.from);
}
