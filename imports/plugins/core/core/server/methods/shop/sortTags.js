import { check, Match } from "meteor/check";
import { Reaction } from "/lib/api";
import ReactionError from "@reactioncommerce/reaction-error";
import { Tags } from "/lib/collections";

/**
 * @name shop/sortTags
 * @method
 * @memberof Shop/Methods
 * @summary Set a new sort order for top level tags or tags that are children of a parent
 * @param {String[]} tagIds - All sibling tag IDs in new sort order
 * @param {String} [parentTagId] - ID of tag that is the parent of all tags. Null for sorting top-level tags.
 * @return {undefined}
 */
export default function sortTags(tagIds, parentTagId) {
  check(tagIds, [String]);
  check(parentTagId, Match.Maybe(String));

  const allTagIds = [...tagIds];
  if (parentTagId) allTagIds.push(parentTagId);

  const tags = Tags.find({ _id: { $in: allTagIds } }).fetch();

  let matchShopId;
  allTagIds.forEach((tagId) => {
    const tag = tags.find((tagDoc) => tagDoc._id === tagId);
    if (!tag) throw new ReactionError("not-found", "Not Found");

    if (!matchShopId) {
      matchShopId = tag.shopId;
    } else if (tag.shopId !== matchShopId) {
      throw new ReactionError("multiple-shop", "Tags must be associated with the same shop");
    }
  });

  if (!matchShopId || !Reaction.hasPermission("core", Reaction.getUserId(), matchShopId)) {
    throw new ReactionError("access-denied", "Access Denied");
  }

  const updatedAt = new Date();
  if (parentTagId) {
    // Sub tags
    Tags.update({ _id: parentTagId }, {
      $set: {
        relatedTagIds: tagIds,
        updatedAt
      }
    });
  } else {
    // Top level tags
    tagIds.forEach((tagId, position) => {
      Tags.update({ _id: tagId }, { $set: { position, updatedAt } });
    });
  }
}
