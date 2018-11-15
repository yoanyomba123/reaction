import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import { Address as AddressSchema } from "/imports/collections/schemas";

const inputSchema = new SimpleSchema({
  address: AddressSchema,
  shopId: String
});

/**
 * @name setShopAddress
 * @memberof Mutations/Shops
 * @method
 * @summary Set a shop's primary address
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input object
 * @param {Object} input.address - AddressInput
 * @param {Object} input.shopId - The shop to set this address on
 * @return {Promise<Object>} shop with updated address
 */
export default async function setShopAddress(context, input) {
  inputSchema.validate(input);

  const { collections, userHasPermission } = context;
  const { Shops } = collections;
  const { address, shopId } = input;

  if (!userHasPermission(["admin", "owner", "shopSettings"], shopId)) {
    throw new ReactionError("access-denied", "Access denied");
  }

  const { value: updatedShop } = await Shops.findOneAndUpdate({
    _id: shopId
  }, {
    $set: {
      addressBook: [address]
    }
  }, {
    // Default behavior is to return the original. We want the updated.
    returnOriginal: false
  });

  if (!updatedShop) throw new ReactionError("not-found", "Shop not found");

  return { shop: updatedShop };
}
