/**
 * @name Query.redirectRules
 * @method
 * @memberof Routes/GraphQL
 * @summary get list of redirect rules
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.id] - rule id
 * @param {String} [params.from] - path to redirect from
 * @param {String} [params.to] - path to redirect to
 * @param {String} [params.type] - type of redirect
 * @param {Number} [params.status] - HTTP status code of the redirect
 * @param {Boolean} [params.enabled] - whether the rule is enabled
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Array<Object>>} array of RedirectRules
 */
export default async function redirectRules(_, params, context) {
  return context.collections.RedirectRules.find({
    _id: params.id,
    from: params.from,
    to: params.to,
    type: params.type,
    status: params.status,
    enabled: params.enabled
  }).toArray();
}
