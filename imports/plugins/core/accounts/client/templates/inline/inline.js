import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.loginInline.helpers({
  loginInlineComponent() {
    return {
      component: Components.LoginInline
    };
  }
});
