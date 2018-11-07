import _ from "lodash";
import { i18next } from "/client/api";
import { Tags } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";

/**
 * @memberof Helpers
 * @summary Reaction TagNav shared helpers
 * @type {Object}
 */
export const TagHelpers = {
  moveItem(oldArray, fromIndex, toIndex) {
    const newArray = [...oldArray];
    newArray.splice(toIndex, 0, newArray.splice(fromIndex, 1)[0]);
    return newArray;
  },

  subTags(parentTag) {
    if (_.isArray(parentTag.relatedTagIds)) {
      const tags = Tags.find({
        isTopLevel: false,
        _id: {
          $in: parentTag.relatedTagIds
        }
      }).fetch();

      const subTags = parentTag.relatedTagIds.map((tagId) => _.find(tags, (tagObject) => tagObject._id === tagId));

      return subTags;
    }

    return [];
  },

  currentTag() {
    return Session.get("currentTag");
  },

  getTags() {
    let tags = [];

    tags = Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();
    /*
    if (this.tagIds) {
      for (let relatedTagId of this.tagIds) {
        if (!_.find(tags, {
          _id: relatedTagId
        })) {
          tags.push(Tags.findOne(relatedTagId));
        }
      }
    }*/

    if (this.tag) {
      Session.set("currentTag", this.tag._id);
    } else {
      Session.set("currentTag", "");
    }

    return tags;
    // there are cases where
    // we'll have no tags, and sort will error
    // so we check length for safety
    // if (tags) {
    //   tags.sort(function (a, b) {
    //     return a.position - b.position;
    //   });
    //   return tags;
    // }
  },

  createTag(tagName, tagId, parentTag) {
    if (!tagName) {
      return;
    }
    let parentTagId;

    if (parentTag) {
      parentTagId = parentTag._id;
    }

    Meteor.call("shop/updateHeaderTags", tagName, null, parentTagId, (error) => {
      if (error) {
        Alerts.toast(i18next.t("productDetail.tagExists"), "error");
      }
    });
  },

  updateTag(tagId, tagName, parentTagId) {
    Meteor.call("shop/updateHeaderTags", tagName, tagId, parentTagId, (error) => {
      if (error) {
        Alerts.toast(i18next.t("productDetail.tagExists"), "error");
      }
    });
  },

  moveTagToNewParent(tagId, parentTagId) {
    if (tagId) {
      Meteor.call("shop/moveTagToNewParent", tagId, parentTagId);
    }
  },

  sortTags(tagIds, parentTag) {
    if (_.isArray(tagIds)) {
      const parentTagId = _.isEmpty(parentTag) ? null : parentTag._id;
      Meteor.call("shop/sortTags", _.compact(tagIds), parentTagId);
    }
  },

  removeTag(tag, parentTag) {
    const parentTagId = _.isEmpty(parentTag) ? null : parentTag._id;
    Meteor.call("shop/removeTag", tag._id, parentTagId);
  }
};

/**
 * @method reactionSubTags
 * @summary Template method to return subTags
 * @param parentTag {Object} Tag
 * @return {Array} Array of subtags or empty Array
 * @memberof BlazeTemplateHelpers
 */
Template.registerHelper("reactionSubTags", TagHelpers.subTags);
