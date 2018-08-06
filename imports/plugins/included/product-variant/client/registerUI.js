import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Reaction, Router } from "/client/api";
import { Tags } from "/lib/collections";
import {
  addAccountDropdownOption,
  addActionView,
  addCreateContentMenuItem,
  addOperatorToolbarCustomControlsLeft,
  addOperatorToolbarButton
} from "/imports/client-plugin-registry";
import EditModeSwitch from "../components/EditModeSwitch";

addActionView({
  i18nKeyLabel: "gridSettingsPanel.title",
  icon: "fa fa-th",
  label: "Grid settings",
  name: "gridSettings",
  pluginName: "reaction-product-variant",
  roles: ["createProduct"],
  template: "productSettings",
  type: "product"
});

/**
 * @returns {undefined}
 */
function onClick() {
  Reaction.setUserPreferences("reaction-dashboard", "viewAs", "administrator");
  Meteor.call("products/createProduct", (error, productId) => {
    let currentTag;
    let currentTagId;

    if (error) {
      throw new Meteor.Error("create-product-error", error);
    }

    if (productId) {
      currentTagId = Session.get("currentTag");
      currentTag = Tags.findOne(currentTagId);
      if (currentTag) {
        Meteor.call("products/updateProductTags", productId, currentTag.name, currentTagId);
      }
      Session.set("productGrid/selectedProducts", [productId]);
      // go to new product
      Router.go("product", {
        handle: productId
      });
    }
  });
}

addAccountDropdownOption({
  icon: "fa fa-plus",
  i18nKeyLabel: "admin.shortcut.addProductLabel",
  label: "Add product",
  onClick,
  pluginName: "reaction-product-variant",
  roles: ["createProduct"]
});

addCreateContentMenuItem({
  icon: "fa fa-plus",
  i18nKeyLabel: "admin.shortcut.addProductLabel",
  label: "Add product",
  onClick,
  pluginName: "reaction-product-variant",
  routeName: "createProduct"
});

addOperatorToolbarButton({
  icon: "fa fa-plus",
  i18nKeyLabel: "admin.shortcut.addProductLabel",
  label: "Add product",
  onClick,
  pluginName: "reaction-product-variant",
  roles: ["createProduct"]
});

addOperatorToolbarCustomControlsLeft({
  Component: EditModeSwitch,
  pluginName: "reaction-product-variant",
  roles: ["createProduct"]
});
