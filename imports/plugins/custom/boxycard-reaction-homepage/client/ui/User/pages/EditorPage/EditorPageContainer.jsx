import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import EditorPage from './EditorPage'
import { Reaction } from "/client/api";
import {Meteor} from "meteor/meteor";
import { Shops, Tags,Products } from "/lib/collections";
import getCart from "../../../../../../../core/cart/client/util/getCart";
import {Logger} from "../../../../../../../../../client/api";
import {getAnonymousCartsReactive, storeAnonymousCart} from "../../../../../../../core/cart/client/util/anonymousCarts";
import {ReactionProduct} from "../../../../../../../../../lib/api";
import {Router} from "../../../../../../../../../client/modules/router";

class EditorPageContainer extends Component{

  onAddToCartSuccess(){
    Meteor.call("boxycard/letsboxy");
    Router.go('/cart/checkout');

  }



  handleLetsPrint=()=>{


    console.log(`Products ${JSON.stringify(this.props.products)}`);

    const productId = "BCTMZ6HTxFSppJESk";

    let currentVariantId="CJoRBm9vRrorc9mxZ";


    ReactionProduct.setProduct(productId,currentVariantId);
    const currentProduct = Products.findOne(productId);


    let quantity=1;

    if (productId) {
      const shop = Shops.findOne(Reaction.getPrimaryShopId());
      const shopCurrency = (shop && shop.currency) || "USD";

      const items = [{
        price: {
          amount: 12.99,
          currencyCode: shopCurrency
        },
        productConfiguration: {
          productId,
          productVariantId: currentVariantId
        },
        quantity: quantity || 1
      }];

      const { cart } = getCart();
      if (cart) {
        const storedCarts = getAnonymousCartsReactive();
        let token = null;
        if (storedCarts && storedCarts.length) {
          token = storedCarts[0].token; // eslint-disable-line prefer-destructuring
        }
        Meteor.call("cart/addToCart", cart._id, token, items, (error) => {
          if (error) {
            Logger.error(error);
            Alerts.toast(error.message, "error");
            return;
          }

          this.onAddToCartSuccess();
        });
      } else {
        Meteor.call("cart/createCart", items, (error, result) => {
          if (error) {
            Logger.error(error);
            Alerts.toast(error.message, "error");
            return;
          }

          const {
            cart: createdCart,
            incorrectPriceFailures,
            minOrderQuantityFailures,
            token
          } = result;

          if (incorrectPriceFailures.length) {
            Logger.info("incorrectPriceFailures", incorrectPriceFailures);
            Alerts.toast("Prices have changed. Please refresh the page.", "error");
          } else if (minOrderQuantityFailures.length) {
            Logger.info("minOrderQuantityFailures", minOrderQuantityFailures);
            Alerts.toast(`You must order at least ${minOrderQuantityFailures[0].minOrderQuantity} of this item`, "error");
          }

          if (createdCart) {
            if (token) {
              storeAnonymousCart({ _id: createdCart._id, shopId: shop && shop._id, token });
            }
            this.onAddToCartSuccess();
          }
        });
      }
    }



  }

  render(){
    return(
      <EditorPage products={this.props.products}
                  handleLetsPrint={this.handleLetsPrint.bind(this)}
      />
    )
  }



}


EditorPageContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
};

/*
 * Customized version of imports/plugins/included/product-variant/containers/productsContainer.js
 * It subscribes to featured products only for landing page section "Products we love"
 */
function composer(props, onData) {
  const queryParams = Object.assign({},  Reaction.Router.current().queryParams );

  if (Meteor.subscribe("Products").ready()) {
    const products = Products.find().fetch();
    onData(null, { products });
  }

}
export default composeWithTracker(composer)(EditorPageContainer);
