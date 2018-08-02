import Reaction from "/imports/plugins/core/core/server/Reaction";

const utils = {
  getPackageSettings() {
    const searchPackage = Reaction.getPackageSettings("reaction-search");
    return searchPackage && searchPackage.settings;
  }
};

export default utils;
