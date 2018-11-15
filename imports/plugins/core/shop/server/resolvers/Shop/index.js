import { getXformedCurrencyByCode, getXformedCurrenciesByShop } from "@reactioncommerce/reaction-graphql-xforms/currency";
import { encodeShopOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/shop";
import tags from "./tags";

export default {
  _id: (node) => encodeShopOpaqueId(node._id),
  address: (shop) => (Array.isArray(shop.addressBook) ? shop.addressBook[0] : null),
  currencies: (shop) => getXformedCurrenciesByShop(shop),
  currency: (shop) => getXformedCurrencyByCode(shop.currency),
  tags
};
