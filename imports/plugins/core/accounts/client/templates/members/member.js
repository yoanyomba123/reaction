import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Components } from "@reactioncommerce/reaction-components";

Template.member.events({
  "click [data-event-action=showMemberSettings]"() {
    $(".customerUsageType input").val(""); // form reset
    $(".customerUsageType").addClass("hide"); // form reset
    Reaction.setActionViewDetail({
      label: "Permissions",
      i18nKeyLabel: "admin.settings.permissionsSettingsLabel",
      data: this,
      template: "memberSettings"
    });
  }
});

Template.memberSettings.helpers({
  accountsDetail() {
    return {
      component: Components.AccountsDashboard
    };
  }
});
