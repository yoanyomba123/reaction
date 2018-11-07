import Logger from "@reactioncommerce/logger";
import { check, Match } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";
import { convertWeight, convertLength } from "/lib/api";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method shop/updateShopLocalization
 * @summary Update localization properties on Shop
 * @param {String} shopId - ID of shop to update
 * @param {Object} doc - Document with updates.
 * @param {String} [doc.baseUOL] - Base unit of length. Optional
 * @param {String} [doc.baseUOM] - Base unit of mass. Optional.
 * @param {String} doc.currency - Shop default currency. All prices are assumed to be in this currency.
 * @param {String} doc.language - Shop default language.
 * @param {String} doc.timezone - Shop timezone
 * @returns {undefined}
*/
export default function updateShopLocalization(shopId, doc) {
  check(shopId, String);
  check(doc, {
    baseUOL: Match.Maybe(String),
    baseUOM: Match.Maybe(String),
    currency: String,
    language: String,
    timezone: String
  });

  if (!Reaction.hasPermission("admin", Reaction.getUserId(), shopId)) {
    throw new ReactionError("access-denied", "Access Denied");
  }

  Shops.update({
    _id: shopId
  }, {
    $set: {
      timezone: doc.timezone,
      currency: doc.currency,
      baseUOM: doc.baseUOM,
      baseUOL: doc.baseUOL,
      language: doc.language
    }
  });

  // Update default parcel size values if necessary
  const shop = Shops.findOne({ _id: shopId }, { defaultParcelSize: 1, baseUOM: 1, baseUOL: 1 });
  if (shop && shop.defaultParcelSize && (doc.baseUOM !== shop.baseUOM || doc.baseUOL !== shop.baseUOL)) {
    try {
      const parcelSize = {
        weight: convertWeight(shop.baseUOM, doc.baseUOM, shop.defaultParcelSize.weight),
        height: convertLength(shop.baseUOL, doc.baseUOL, shop.defaultParcelSize.height),
        length: convertLength(shop.baseUOL, doc.baseUOL, shop.defaultParcelSize.length),
        width: convertLength(shop.baseUOL, doc.baseUOL, shop.defaultParcelSize.width)
      };
      Meteor.call("shop/updateDefaultParcelSize", parcelSize);
    } catch (error) {
      Logger.error("Error while updating default parcel size after shop localization update", error);
    }
  }
}
