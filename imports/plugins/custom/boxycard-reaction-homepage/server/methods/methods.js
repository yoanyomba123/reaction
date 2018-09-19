import {Meteor} from "meteor/meteor";
import {Match, check} from "meteor/check"
import {Accounts, Cart, Products, Shops} from "../../../../../../lib/collections";


Meteor.methods({
  "boxycard/letsboxy": function () {
    console.log("Lets boxy!");

    return true;
  }
});


