import { addActionView } from "/imports/client-plugin-registry";

addActionView({
  i18nKeyLabel: "productDetailEdit.productSettings",
  icon: "fa fa-pencil",
  label: "Product settings",
  name: "editProduct",
  pluginName: "product-detail-simple",
  roles: ["createProduct"],
  template: "ProductAdmin",
  type: "product"
});
