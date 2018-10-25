/**
 * @name Query.redirectRule
 * @method
 * @memberof Routes/GraphQL
 * @summary get a specific redirect rule
 * @param {Object} _ - unused
 * @param {Object} params - an object of all arguments that were sent by the client
 * @param {String} params.id - id of a redirect rule
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} RedirectRule
 */
export default async function redirectRule(_, { id }, context) {
  // TODO: this does not work?
  return context.collections.RedirectRules.findOne({ _id: id });
}
