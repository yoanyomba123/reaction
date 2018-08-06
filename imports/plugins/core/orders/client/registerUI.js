import { Reaction } from "/client/api";
import { addAccountDropdownOption, addActionView } from "/imports/client-plugin-registry";

addActionView({
  dashboardSize: "lg",
  i18nKeyLabel: "admin.shortcut.ordersLabel",
  icon: "fa fa-sun-o",
  label: "Orders",
  name: "orders",
  pluginName: "reaction-orders",
  roles: ["dashboard/orders"],
  template: "orders",
  type: "action"
});

addAccountDropdownOption({
  icon: "fa fa-sun-o",
  i18nKeyLabel: "admin.shortcut.ordersLabel",
  label: "Orders",
  onClick() {
    Reaction.showActionViewByName("orders");
  },
  pluginName: "reaction-orders",
  priority: 1,
  roles: ["dashboard/orders"]
});
