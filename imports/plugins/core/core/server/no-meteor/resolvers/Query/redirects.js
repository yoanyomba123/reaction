const rules = require("./redirectRules.json");

/**
 * @name Query.redirects
 * @method
 * @memberof Routes/GraphQL
 * @summary get list of redirect rules
 * @param {Object} _ - unused
 * @param {Object} params - an object of all arguments that were sent by the client
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Array<Object>>} array of Redirects
 */
export default async function redirects() {
  return rules;
}