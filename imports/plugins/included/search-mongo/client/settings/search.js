import { AutoForm } from "meteor/aldeed:autoform";
import { Template } from "meteor/templating";
import { Reaction, i18next } from "/client/api";
import { SearchPackageConfig } from "../../lib/collections/schemas";


Template.searchSettings.helpers({
  SearchPackageConfig() {
    return SearchPackageConfig;
  },
  packageData() {
    return Reaction.getPackageSettings("reaction-search");
  }
});


Template.searchSettings.events({
  "click [data-event-action=showSearchSettings]"() {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "search-update-form": {
    onSuccess() {
      Alerts.removeSeen();
      return Alerts.toast(i18next.t("searchSettings.settingsSaved"), "success");
    },
    onError(operation, error) {
      Alerts.removeSeen();
      return Alerts.toast(`${i18next.t("searchSettings.settingsFailed")} ${error}`, "error");
    }
  }
});
