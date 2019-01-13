import createShop from "./createShop";
import createTag from "./createTag";
import getLocale from "./getLocale";
import locateAddress from "./locateAddress";
import moveTagToNewParent from "./moveTagToNewParent";
import removeTag from "./removeTag";
import sortTags from "./sortTags";
import togglePackage from "./togglePackage";
import updateBrandAssets from "./updateBrandAssets";
import updateCurrencyConfiguration from "./updateCurrencyConfiguration";
import updateDefaultParcelSize from "./updateDefaultParcelSize";
import updateHeaderTags from "./updateHeaderTags";
import updateLanguageConfiguration from "./updateLanguageConfiguration";
import updateShopLocalization from "./updateShopLocalization";
import updateShopExternalServices from "./updateShopExternalServices";

/**
 * @file Meteor methods for Shop
 *
 *
 * @namespace Shop/Methods
*/

export default {
  "shop/createShop": createShop,
  "shop/createTag": createTag,
  "shop/getLocale": getLocale,
  "shop/locateAddress": locateAddress,
  "shop/moveTagToNewParent": moveTagToNewParent,
  "shop/removeTag": removeTag,
  "shop/sortTags": sortTags,
  "shop/togglePackage": togglePackage,
  "shop/updateBrandAssets": updateBrandAssets,
  "shop/updateCurrencyConfiguration": updateCurrencyConfiguration,
  "shop/updateDefaultParcelSize": updateDefaultParcelSize,
  "shop/updateHeaderTags": updateHeaderTags,
  "shop/updateLanguageConfiguration": updateLanguageConfiguration,
  "shop/updateShopLocalization": updateShopLocalization,
  "shop/updateShopExternalServices": updateShopExternalServices
};
