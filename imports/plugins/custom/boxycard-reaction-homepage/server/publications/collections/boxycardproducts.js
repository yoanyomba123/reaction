import { getSchemas } from "@reactioncommerce/reaction-collections";


// Validate the subscription filter against our extended filter schema.
const Schemas = getSchemas();
const filters = Schemas.filters;

/* Replace stock publication with our custom publication that knows how to filter
 * featured products as well.
 */
Meteor.startup(() => {
  Meteor.default_server.publish_handlers.Products = publishBoxyProducts;
});

/**
 * Swag shop products publication. Knows how to filter for featured products.
 * @param {Number} [productScrollLimit] - optional, defaults to 24
 * @param {Array} shops - array of shopId to retrieve product from.
 * @return {Object} return product cursor
 */
function publishBoxyProducts(productScrollLimit = 24, productFilters, sort = {}, editMode = true) {
  check(productScrollLimit, Number);
  check(productFilters, Match.OneOf(undefined, Object));
  check(sort, Match.OneOf(undefined, Object));
  check(editMode, Match.Maybe(Boolean));

} // end if productFilters

