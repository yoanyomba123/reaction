import React, { Component } from "react";
import _ from "lodash";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

class NavigationEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTagTree: [{ _id: "top-level" }]
    };
  }

  handleTagSelect = (tag, parentTag, level) => {
    this.setState(({ selectedTagTree }) => {
      let newSelectedTagTree = [
        ...selectedTagTree
      ];

      // Remove columns that are below the selected tags index, by keeping the ones above.
      newSelectedTagTree = selectedTagTree.slice(0, level + 1);

      // Add the new column
      newSelectedTagTree.push(tag);

      // Ensure there are no duplicate columns
      newSelectedTagTree = _.uniqBy(newSelectedTagTree, (t) => t._id);

      return {
        selectedTagTree: newSelectedTagTree
      };
    });
  }

  get selectedTagTree() {
    return this.state.selectedTagTree || [{ _id: "top-level" }];
  }

  renderColumns() {
    if (Array.isArray(this.selectedTagTree)) {
      return this.selectedTagTree.map((parentTag, index) => {
        return (
          <Components.UniNavbarEditorColumn
            key={index}
            level={index}
            parentTag={parentTag}
            onTagSelect={this.handleTagSelect}
          />
        );
      });
    }

    return null;
  }

  render() {
    return (
      <Components.DragDropProvider>
        <div className="rui uni-navbar-editor-columns">
          {this.renderColumns()}
        </div>
      </Components.DragDropProvider>
    );
  }
}

registerComponent("UniNavbarEditor", NavigationEditor);

export default NavigationEditor;
