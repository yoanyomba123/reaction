import { decodeShopOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/shop";

/**
 * @name "Mutation.setShopAddress"
 * @method
 * @memberof Shop/GraphQL
 * @summary resolver for the setShopAddress GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.input.address - AddressInput
 * @param {String} args.input.shopId - Shop ID
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} SetShopAddressPayload
 */
export default async function setShopAddress(parentResult, { input }, context) {
  const { clientMutationId = null, address, shopId: opaqueShopId } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);

  const { shop } = await context.mutations.setShopAddress(context, {
    address,
    shopId
  });

  return {
    clientMutationId,
    shop
  };
}
