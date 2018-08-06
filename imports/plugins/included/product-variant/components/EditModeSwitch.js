import React, { Component } from "react";
import { Switch } from "/imports/plugins/core/ui/client/components";
import { Reaction } from "/client/api";

export default class EditModeSwitch extends Component {
  handleViewContextChange = (event, isChecked) => {
    Reaction.setUserPreferences("reaction-dashboard", "viewAs", isChecked ? "administrator" : "customer");

    if (Reaction.isPreview() === true) {
      // Save last action view state
      const saveActionViewState = Reaction.getActionView();
      Reaction.setUserPreferences("reaction-dashboard", "savedActionViewState", saveActionViewState);

      // hideActionView during isPreview === true
      Reaction.hideActionView();
    }
  };

  render() {
    return (
      <Switch
        checked={!Reaction.isPreview()}
        i18nKeyLabel="app.editMode"
        i18nKeyOnLabel="app.editMode"
        label="Edit Mode"
        onChange={this.handleViewContextChange}
        onLabel="Edit Mode"
      />
    );
  }
}
