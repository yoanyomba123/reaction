import { Template } from "meteor/templating";
import { getCreateContentMenuItems } from "/imports/client-plugin-registry";

Template.createContentMenu.helpers({
  buttonProps(item) {
    return {
      ...item,
      status: "default"
    };
  },

  items() {
    return getCreateContentMenuItems();
  }
});
