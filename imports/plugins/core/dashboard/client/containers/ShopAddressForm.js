import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { compose } from "recompose";
import { Mutation } from "react-apollo";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { withComponents } from "@reactioncommerce/components-context";
import { i18next, Reaction } from "/client/api";
import Logger from "/client/modules/logger";
import { Shops } from "/lib/collections";

const setShopAddressMutation = gql`
  mutation SetShopAddress($input: SetShopAddressInput!) {
    setShopAddress(input: $input) {
      shop {
        _id
      }
    }
  }
`;

class ShopAddressForm extends Component {
  static propTypes = {
    components: PropTypes.shape({
      AddressForm: PropTypes.any,
      Button: PropTypes.any
    }),
    value: PropTypes.object
  };

  handleSave = () => {
    if (this.form) {
      this.form.submit();
    }
  }

  handleSaveCompleted = () => {
    Alerts.toast(i18next.t("admin.alerts.shopAddressSettingsSaved"), "success");
  }

  handleSaveError = (error) => {
    Logger.error(error);
    Alerts.toast(i18next.t("admin.alerts.shopAddressSettingsFailed"), "error");
  }

  render() {
    const {
      components: {
        AddressForm,
        Button
      },
      value
    } = this.props;

    return (
      <Mutation
        ignoreResults
        mutation={setShopAddressMutation}
        onCompleted={this.handleSaveCompleted}
        onError={this.handleSaveError}
      >
        {(setShopAddress) => (
          <div>
            <AddressForm ref={(form) => { this.form = form; }} onSubmit={(address) => setShopAddress({ input: { address, shopId: "123" } })} value={value} />
            <Button onClick={this.handleSave}>{i18next.t("app.saveChanges")}</Button>
          </div>
        )}
      </Mutation>
    );
  }
}

/**
 * @summary Composer for ShopAddressForm component
 * @param {Object} props Props from parent
 * @param {Function} onData Data callback
 * @returns {undefined}
 */
function composer(props, onData) {
  const shop = Shops.findOne({ _id: Reaction.getShopId() });

  if (shop) {
    onData(null, {
      value: shop.addressBook && shop.addressBook[0]
    });
  }
}

export default compose(
  withComponents,
  composeWithTracker(composer)
)(ShopAddressForm);
