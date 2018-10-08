import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import update from "immutability-helper";
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { getTagIds } from "/lib/selectors/tags";
import { TagHelpers } from "./tags";
import { Tags } from "/lib/collections";

const TagNavHelpers = {
  onTagCreate(tagName, parentTag) {
    TagHelpers.createTag(tagName, undefined, parentTag);
  },
  onTagRemove(tag, parentTag) {
    TagHelpers.removeTag(tag, parentTag);
  },
  onTagSort(tagIds, parentTag) {
    TagHelpers.sortTags(tagIds, parentTag);
  },
  onTagDragAdd(movedTagId, toListId, toIndex, ofList) {
    TagHelpers.moveTagToNewParent(movedTagId, toListId, toIndex, ofList);
  },
  onUpdateTag(tagId, tagName, parentTagId) {
    TagHelpers.updateTag(tagId, tagName, parentTagId);
  },
  isMobile() {
    return window.matchMedia("(max-width: 991px)").matches;
  },
  tagById(tagId, tags) {
    return _.find(tags, (tag) => tag._id === tagId);
  },
  updateSuggestions(suggestion, excludeTagsObj) {
    return TagHelpers.updateSuggestions(suggestion, excludeTagsObj);
  },
  hasSubTags(tagId, tags) {
    const foundTag = this.tagById(tagId, tags);

    if (foundTag) {
      if (Array.isArray(foundTag.relatedTagIds) && foundTag.relatedTagIds.length) {
        return true;
      }
    }
    return false;
  }
};

class NavigationEditorColumn extends Component {
  static propTypes = {
    closeNavbar: PropTypes.func,
    editButton: PropTypes.node,
    editable: PropTypes.bool,
    hasEditRights: PropTypes.bool,
    isVisible: PropTypes.bool,
    level: PropTypes.number,
    onTagSelect: PropTypes.func,
    parentTag: PropTypes.object,
    tagIds: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.object),
    tagsByKey: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      tagIds: props.tagIds || [],
      tagsByKey: props.tagsByKey || {},
      suggestions: [],
      newTag: {
        name: ""
      }
    };

    this.handleTagSort = _.debounce((tagIds, parentTag) => {
      TagNavHelpers.onTagSort(tagIds, parentTag);
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagIds: nextProps.tagIds || [],
      tagsByKey: nextProps.tagsByKey || {}
    });
  }

  canSaveTag(tag) {
    // Blank tags cannot be saved
    if (typeof tag.name === "string" && tag.name.trim().length === 0) {
      return false;
    }

    // If the tag does not have an id, then allow the save
    if (!tag._id) {
      return true;
    }

    // Get the original tag from the props
    // Tags from props are not mutated, and come from an outside source
    const originalTag = this.props.tagsByKey[tag._id];

    if (originalTag && originalTag.name !== tag.name) {
      return true;
    }

    return false;
  }

  handleNewTagSave = (event, tag, parentTag) => {
    if (this.canSaveTag(tag)) {
      TagNavHelpers.onTagCreate(tag.name, parentTag);

      this.setState({ newTag: { name: "" } });
    }
  }

  handleNewTagUpdate = (event, tag) => {
    this.setState({ newTag: tag });
  }

  handleTagRemove = (tag, parentTag) => {
    TagNavHelpers.onTagRemove(tag, parentTag);
  }

  handleTagUpdate = (event, tag) => {
    const newState = update(this.state, {
      tagsByKey: {
        [tag._id]: {
          $set: tag
        }
      }
    });

    this.setState(newState);
  }

  handleTagSave = (event, tag) => {
    TagNavHelpers.onUpdateTag(tag._id, tag.name);
  }

  handleMoveTag = (dragIndex, hoverIndex, item) => {
    this.setState(({ tagIds }) => {
      const updatedTagIds = update(tagIds, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, item.tag._id]
        ]
      });

      return {
        tagIds: _.compact(_.uniq(updatedTagIds))
      };
    }, () => {
      this.handleTagSort(this.state.tagIds, item.parentTag);
    });
  }

  handleGetSuggestions = (suggestionUpdateRequest) => {
    const suggestions = TagNavHelpers.updateSuggestions(
      suggestionUpdateRequest.value,
      { excludeTags: this.state.tagIds }
    );

    this.setState({ suggestions });
  }

  handleClearSuggestions = () => {
    this.setState({ suggestions: [] });
  }

  get tags() {
    if (this.state.editable) {
      return this.state.tagIds.map((tagId) => this.state.tagsByKey[tagId]);
    }

    return this.props.tags;
  }

  handleTagSelect = (tag) => {
    this.props.onTagSelect &&
    this.props.onTagSelect(tag, this.props.parentTag, this.props.level);
  }

  flatenTree(selectedTagTree) {
    // Copy array so we can mutate safetly
    const copy = [...selectedTagTree];

    // Result to return
    const result = [];

    // Should traverse deeper
    let goDeeper = true;

    while (goDeeper) {
      // Mutate the copy and pull the first tag out of the list
      const parentTag = copy.shift();

      // Determin id the tag exists, and has sub tags
      if (parentTag && Array.isArray(parentTag._subTags) && parentTag._subTags.length) {
        // Add the sub tags from the parent as a column
        // while loop will go deeper on next run
        result.push(parentTag._subTags);
      } else {
        if (parentTag) {
          // Add blank level
          result.push(["nextLevel"]);
        }

        // Stop going deeper
        goDeeper = false;
      }
    }

    return result;
  }

  renderTagList() {
    const { tags, parentTag } = this.props;
    const { tagIds } = this.state;

    if (Array.isArray(tagIds) && tagIds.length) {
      return tagIds.map((tagId, index) => {
        const tag = this.state.tagsByKey[tagId];
        if (!tag) return null;

        return (
          <Components.UniNavbarTagItem
            {...TagNavHelpers}
            suggestions={this.state.suggestions}
            onClearSuggestions={this.handleClearSuggestions}
            onGetSuggestions={this.handleGetSuggestions}
            parentTag={parentTag}
            editable={true}
            data-id={tag._id}
            index={index}
            key={tag._id}
            tag={tag}
            tags={tags}
            onMove={this.handleMoveTag}
            draggable={true}
            isTagNav={true}
            onTagSelect={this.handleTagSelect}
            onTagInputBlur={this.handleTagSave}
            onTagRemove={this.handleTagRemove}
            onTagSave={this.handleTagSave}
            onTagClick={this.handleTagClick}
            onTagUpdate={this.handleTagUpdate}
          />
        );
      });
    }

    return null;
  }

  renderColumnHeader() {
    if (this.props.parentTag && this.props.parentTag.name) {
      return (
        <h2>{this.props.parentTag.name}</h2>
      );
    }

    return (
      <h2>Top Level</h2>
    );
  }

  renderNewTag() {
    return (
      <Components.UniNavbarTagItem
        {...TagNavHelpers}
        editable={true}
        suggestions={this.state.suggestions}
        onClearSuggestions={this.handleClearSuggestions}
        onGetSuggestions={this.handleGetSuggestions}
        blank={true}
        key="newTagForm"
        inputPlaceholder="Add Tag"
        i18nKeyInputPlaceholder="tags.addTag"
        parentTag={this.props.parentTag}
        tag={this.state.newTag}
        onTagInputBlur={this.handleNewTagSave}
        onTagSave={this.handleNewTagSave}
        onTagUpdate={this.handleNewTagUpdate}
      />
    );
  }

  render() {
    return (
      <div className="rui uni-navbar-editor-list">
        {this.renderColumnHeader()}
        {this.renderTagList()}
        {this.renderNewTag()}
      </div>
    );
  }
}


const composer = (props, onData) => {
  let tags = [];

  // Grap an updated copy of the parentTag to keep things properly reactive
  const parentTag = Tags.findOne(props.parentTag._id);

  if (props.parentTag._id !== "top-level") {
    tags = Tags.find(
      { _id: { $in: parentTag.relatedTagIds || [] } },
      { sort: { position: 1 } }
    ).fetch();
  } else {
    tags = Tags.find(
      { isTopLevel: true },
      { sort: { position: 1 } }
    ).fetch();
  }

  const tagsByKey = {};

  if (Array.isArray(tags)) {
    for (const tag of tags) {
      tagsByKey[tag._id] = tag;
    }
  }

  // First level of recursive tag tree get
  onData(null, {
    tags,
    parentTag,
    hasEditRights: Reaction.hasAdminAccess(),
    tagIds: getTagIds({ tags }),
    tagsByKey
  });
};

registerComponent("UniNavbarEditorColumn", NavigationEditorColumn, composeWithTracker(composer));

export default NavigationEditorColumn;
