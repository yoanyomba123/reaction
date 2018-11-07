import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";

Template.stripeConnectMerchantSignup.helpers({
  stripeConnectIsConnected() {
    const stripe = Packages.findOne({
      shopId: Reaction.getShopId(),
      name: "reaction-marketplace"
    });
    return stripe && stripe.settings && stripe.settings.connectAuth && stripe.settings.connectAuth.access_token;
  }
});
