import _ from "lodash";
import Reaction from "/imports/plugins/core/core/server/Reaction";

const DefaultSocialApp = {
  profilePage: "",
  enabled: false
};

Reaction.registerPackage({
  label: "Social",
  name: "reaction-social",
  icon: "fa fa-share-alt",
  autoEnable: true,
  permissions: [{
    label: "Social",
    permission: "dashboard/social"
  }],
  settings: {
    public: {
      autoInit: true,
      apps: {
        facebook: _.extend({
          appId: "",
          version: "v2.1"
        }, DefaultSocialApp),
        twitter: _.extend({
          username: ""
        }, DefaultSocialApp),
        googleplus: _.extend({}, DefaultSocialApp),
        pinterest: _.extend({}, DefaultSocialApp)
      },
      appsOrder: ["facebook", "twitter", "pinterest", "googleplus"],
      iconOnly: true,
      faSize: "fa-2x",
      faClass: "square",
      targetWindow: "_self"
    }
  },
  registry: [{
    template: "reactionSocial",
    provides: ["social"]
  }]
});
