import { check, Match } from "meteor/check";
import { Reaction } from "/lib/api";
import ReactionError from "@reactioncommerce/reaction-error";
import { Tags } from "/lib/collections";

/**
 * @name shop/removeTag
 * @method
 * @memberof Shop/Methods
 * @param {String} tagId - ID of tag to remove
 * @param {String} [parentTagId] - Parent to remove from. Null to remove from top level
 * @return {undefined}
 */
export default function removeTag(tagId, parentTagId) {
  check(tagId, String);
  check(parentTagId, Match.Maybe(String));

  const tagIds = [tagId];
  if (parentTagId) tagIds.push(parentTagId);

  const tags = Tags.find({ _id: { $in: tagIds } }).fetch();

  const tag = tags.find((tagDoc) => tagDoc._id === tagId);
  if (!tag) throw new ReactionError("not-found", "Not Found");

  if (parentTagId) {
    const parentTag = tags.find((tagDoc) => tagDoc._id === parentTagId);
    if (!parentTag) throw new ReactionError("not-found", "Not Found");
    if (tag.shopId !== parentTag.shopId) throw new ReactionError("multiple-shop", "Tags must be associated with the same shop");
  }

  if (!Reaction.hasPermission("core", Reaction.getUserId(), tag.shopId)) {
    throw new ReactionError("access-denied", "Access Denied");
  }

  if (parentTagId) {
    Tags.update({ _id: parentTagId }, {
      $pull: {
        relatedTagIds: tagId
      },
      $set: {
        updatedAt: new Date()
      }
    });
  } else if (tag.isTopLevel) {
    Tags.update({ _id: tag._id }, {
      $set: {
        isTopLevel: false,
        updatedAt: new Date()
      }
    });
  }
}
