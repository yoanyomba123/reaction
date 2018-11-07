import { check, Match } from "meteor/check";
import { Reaction } from "/lib/api";
import ReactionError from "@reactioncommerce/reaction-error";
import { Tags } from "/lib/collections";

/**
 * @name shop/moveTagToNewParent
 * @method
 * @memberof Shop/Methods
 * @summary Moves an existing tag to a new parent
 * @param {String} tagId - ID of moved tag
 * @param {String} [parentTagId] - ID of tag that should now be the parent. Null to move to top level.
 * @return {undefined}
 */
export default function moveTagToNewParent(tagId, parentTagId) {
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
      $addToSet: {
        relatedTagIds: tagId,
        updatedAt: new Date()
      }
    });
  } else {
    Tags.update({ _id: tagId }, {
      $set: {
        isTopLevel: true,
        updatedAt: new Date()
      }
    });
  }
}
