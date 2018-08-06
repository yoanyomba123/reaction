import { Reaction } from "/client/api";
import { Router } from "/client/modules/router";
import { addAccountDropdownOption, addActionView, addShortcutButton } from "/imports/client-plugin-registry";

addActionView({
  dashboardSize: "lg",
  i18nKeyLabel: "admin.dashboard.accountsLabel",
  icon: "fa fa-users",
  label: "Accounts",
  name: "accounts",
  pluginName: "reaction-accounts",
  roles: ["dashboard/accounts"],
  template: "accountsDashboard",
  type: "action"
});

addActionView({
  i18nKeyLabel: "admin.settings.accountSettingsLabel",
  icon: "fa fa-sign-in",
  label: "Login services",
  name: "accountsSettings",
  pluginName: "reaction-accounts",
  roles: ["dashboard/accounts"],
  shopTypes: ["primary"],
  template: "accountsSettings",
  type: "setting"
});

addAccountDropdownOption({
  icon: "fa fa-user",
  i18nKeyLabel: "admin.userAccountDropdown.profileLabel",
  label: "Profile",
  onClick() {
    Router.go("account/profile");
  },
  pluginName: "reaction-accounts",
  priority: 0
});

addAccountDropdownOption({
  icon: "fa fa-users",
  i18nKeyLabel: "admin.dashboard.accountsLabel",
  label: "Accounts",
  onClick() {
    Reaction.showActionViewByName("accounts");
  },
  pluginName: "reaction-accounts",
  priority: 1,
  roles: ["dashboard/accounts"]
});

addShortcutButton({
  icon: "fa fa-users",
  i18nKeyLabel: "admin.dashboard.accountsLabel",
  label: "Accounts",
  pluginName: "reaction-accounts",
  routeName: "dashboard/accounts"
});
