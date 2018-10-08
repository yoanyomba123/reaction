import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Autosuggest from "react-autosuggest";
// Update to use new animation lib
// import Velocity from "velocity-animate";
// import "velocity-animate/velocity.ui";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { i18next } from "/client/api";
import { Button, Handle } from "/imports/plugins/core/ui/client/components";
import SortableItem from "./sortableItem";

// const ReactionTagItem = getRawComponent("TagItem");

class TagItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (this._updated && this._saved && this.refs.autoSuggestInput) {
      const input = this.refs.autoSuggestInput.input;

      // Update to use new animation lib
      // -- This animation flashes the text field green upon a successful update.
      // -- It may not be necessary anymore, but if it is, then it will need to be
      // -- updated to use the new animation libs used in the app
      // Velocity.RunSequence([
      //   { e: input, p: { backgroundColor: "#e2f2e2" }, o: { duration: 200 } },
      //   { e: input, p: { backgroundColor: "#fff" }, o: { duration: 100 } }
      // ]);

      this._updated = false;
    }

    if (nextProps.tag && nextProps.tag.name !== this.tag.name) {
      this._updated = true;
    }
  }

  get tag() {
    return this.props.tag || {
      name: ""
    };
  }

  get inputPlaceholder() {
    return i18next.t(this.props.i18nKeyInputPlaceholder || "tags.tagName", {
      defaultValue: this.props.inputPlaceholder || "Tag Name"
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  saveTag(event) {
    if (this.props.onTagSave) {
      this.props.onTagSave(event, this.tag, this.props.parentTag);
    }
  }

  /**
   * Handle tag form submit events and pass them up the component chain
   * @param  {Event} event Event object
   * @return {void} no return value
   */
  handleTagFormSubmit = (event) => {
    event.preventDefault();
    this._saved = true;
    this.saveTag(event);
  }

  /**
   * Handle tag remove events and pass them up the component chain
   * @param  {Event} event Event object
   * @return {void} no return value
   */
  handleTagRemove = () => {
    if (this.props.onTagRemove) {
      this.props.onTagRemove(this.tag, this.props.parentTag);
    }
  }

  handleTagKeyDown = (event) => {
    if (event.keyCode === 13) {
      this._saved = true;
      this.saveTag(event);
    }
  }

  /**
   * Handle tag mouse out events and pass them up the component chain
   * @param  {Event} event Event object
   * @return {void} no return value
   */
  handleTagMouseOut = (event) => {
    // event.preventDefault();
    if (this.props.onTagMouseOut) {
      this.props.onTagMouseOut(event, this.tag, this.props.parentTag);
    }
  }

  /**
   * Handle click event on drop button and pass up the component chain
   * @return {void} no return value
   */
  handleTagSelect = () => {
    if (this.props.onTagSelect) { // Pass the tag back up to the parent component
      this.props.onTagSelect(this.tag, this.props.parentTag, this.props.level);
    }
  }

  /**
   * Handle tag mouse over events and pass them up the component chain
   * @param  {Event} event Event object
   * @return {void} no return value
   */
  handleTagMouseOver = (event) => {
    if (this.props.onTagMouseOver) {
      this.props.onTagMouseOver(event, this.tag, this.props.parentTag);
    }
  }

  /**
   * Handle tag inout blur events and pass them up the component chain
   * @param  {Event} event Event object
   * @return {void} no return value
   */
  handleTagInputBlur = (event) => {
    if (this.props.onTagInputBlur) {
      this._saved = true;
      this.props.onTagInputBlur(event, this.tag, this.props.parentTag);
    }
  }

  handleInputChange = (event, { newValue }) => {
    const updatedTag = Object.assign({}, { ...this.tag }, {
      name: newValue
    });

    if (this.props.onTagUpdate) {
      this.props.onTagUpdate(event, updatedTag, this.props.parentTag);
    }
  }

  handleSuggestionsUpdateRequested = (suggestion) => {
    if (this.props.onGetSuggestions) {
      this.props.onGetSuggestions(suggestion);
    }
  }

  handleSuggestionsClearRequested = () => {
    if (this.props.onClearSuggestions) {
      this.props.onClearSuggestions();
    }
  }

  handleClick = (event) => {
    if (this.props.onTagClick) {
      event.preventDefault();
      this.props.onTagClick(event, this.tag, this.props.parentTag);
    }
  }

  /**
   * Render a simple tag for display purposes only
   * @return {JSX} simple tag
   */
  renderTag() {
    const baseClassName = classnames({
      "rui": true,
      "tag": true,
      "link": true,
      "full-width": this.props.fullWidth
    });

    return (
      <a
        className={baseClassName}
        href="#"
        onMouseOut={this.handleTagMouseOut}
        onMouseOver={this.handleTagMouseOver}
        onClick={this.handleClick}
      >
        {this.tag.name}
      </a>
    );
  }

  /**
   * Render an admin editable tag
   * @return {JSX} editable tag
   */
  renderEditableTag() {
    const baseClassName = classnames({
      "rui": true,
      "tag": true,
      "edit": true,
      "draggable": this.props.draggable,
      "full-width": this.props.fullWidth
    });

    return (
      this.props.connectDropTarget(
        <div className="rui item edit draggable">
          <div
            className={baseClassName}
            data-id={this.tag._id}
          >
            <form onSubmit={this.handleTagFormSubmit}>
              <Handle connectDragSource={this.props.connectDragSource} />
              {this.renderAutosuggestInput()}
              <Button icon="times-circle" onClick={this.handleTagRemove} status="danger" />
              {this.props.isTagNav &&
                <Button icon="chevron-right" onClick={this.handleTagSelect} status="default" />
              }
            </form>
          </div>
        </div>
      )
    );
  }

  /**
   * Render a tag creation form
   * @return {JSX} blank tag for creating new tags
   */
  renderBlankEditableTag() {
    const baseClassName = classnames({
      "rui": true,
      "tag": true,
      "edit": true,
      "create": true,
      "full-width": this.props.fullWidth
    });

    return (
      <div className="rui item edit draggable">
        <div className={baseClassName}>
          <form onSubmit={this.handleTagFormSubmit}>
            <Button icon="tag" />
            {this.renderAutosuggestInput()}
            <Button icon="plus" />
          </form>
        </div>
      </div>
    );
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.label}</span>
    );
  }

  renderAutosuggestInput() {
    return (
      <Autosuggest
        getSuggestionValue={this.getSuggestionValue}
        inputProps={{
          placeholder: this.inputPlaceholder,
          value: this.tag.name,
          onKeyDown(event) {
            // 9 == Tab key
            // 13 == Enter Key
            if (event.keyCode === 9 || event.keyCode === 13) {
              // this.handleUpdate
              // options.onUpdateCallback && options.onUpdateCallback();
            }
          },
          onBlur: this.handleTagInputBlur,
          onChange: this.handleInputChange
        }}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsUpdateRequested}
        ref="autoSuggestInput"
        renderSuggestion={this.renderSuggestion}
        suggestions={this.props.suggestions}
      />
    );
  }

  /**
   * Render component
   * @return {JSX} tag component
   */
  render() {
    if (this.props.blank) {
      return this.renderBlankEditableTag();
    } else if (this.props.editable) {
      return this.renderEditableTag();
    }

    return this.renderTag();
  }
}

TagItem.propTypes = {
  blank: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  fullWidth: PropTypes.bool,
  i18nKeyInputPlaceholder: PropTypes.string,
  index: PropTypes.number,
  inputPlaceholder: PropTypes.string,
  isTagNav: PropTypes.bool,
  level: PropTypes.number,
  onClearSuggestions: PropTypes.func,
  onGetSuggestions: PropTypes.func,
  onTagClick: PropTypes.func,
  onTagInputBlur: PropTypes.func,
  onTagMouseOut: PropTypes.func,
  onTagMouseOver: PropTypes.func,
  onTagRemove: PropTypes.func,
  onTagSave: PropTypes.func,
  onTagSelect: PropTypes.func,
  onTagUpdate: PropTypes.func,
  parentTag: PropTypes.object,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  tag: PropTypes.object
};

registerComponent("UniNavbarTagItem", TagItem, SortableItem("tag"));

export default TagItem;
