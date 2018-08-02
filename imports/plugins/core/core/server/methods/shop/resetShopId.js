import Reaction from "/imports/plugins/core/core/server/Reaction";

/**
 * @name shop/resetShopId
 * @method
 * @memberof Shop/Methods
 * @summary a way for the client to notify the server that the shop has
 *          changed. We could has provided #setShopId, however, the server
 *          has all the information it needs to determine this on its own,
 *          and allowing the client to set shopId could be a security risk
 * @returns {undefined}
 */
export default function resetShopId() {
  return Reaction.resetShopId();
}
