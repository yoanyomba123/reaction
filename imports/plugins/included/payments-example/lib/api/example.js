import { Meteor } from "meteor/meteor";

export const Example = {
  authorize(cardInfo, paymentInfo, callback) {
    Meteor.call("exampleSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
