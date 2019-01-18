import url from "url";

/**
 * @name sitemapQuery
 * @method
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.handle] - Sitemap's handle, as set in Sitemaps collection
 * @param {String} [params.shopAbsoluteUrl] - absolute URL of the shop the sitemap belongs to. The URL is used to find the shop with the domain of the URL
 * @param {Object} context -  an object containing the per-request state
 * @returns {String} - XML, with placeholders replaced (BASE_URL, LAST_MOD), or "" if not found
 */
export default async function sitemapQuery(_, params, context) {
  const { Sitemaps, Shops } = context.collections;
  const { handle, shopAbsoluteUrl } = params;

  const domain = url.parse(shopAbsoluteUrl).hostname;

  // ensure the domain requested is a know shop domain
  const { _id: shopId } = await Shops.findOne({ domains: domain }) || {};

  console.log("shopId", shopId);
  console.log("handle", handle);
  console.log("domain", domain);

  if (!shopId) return null;

  const sitemap = await Sitemaps.findOne({ shopId, handle });

  if (!sitemap) return null;

  sitemap.xml = sitemap.xml.replace(/BASE_URL/g, shopAbsoluteUrl);

  return sitemap;
}
