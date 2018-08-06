import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { registerComponent } from "@reactioncommerce/reaction-components";
import Blaze from "meteor/gadicc:blaze-react-component";
import ReactComponentOrBlazeTemplate from "/imports/plugins/core/core/client/components/ReactComponentOrBlazeTemplate";

class CoreLayout extends Component {
  render() {
    const { actionViewIsOpen, structure } = this.props;
    const { layoutHeader, layoutFooter, template } = structure || {};

    const pageClassName = classnames({
      "page": true,
      "show-settings": actionViewIsOpen
    });

    return (
      <div className={pageClassName} id="reactionAppContainer">
        <ReactComponentOrBlazeTemplate name={layoutHeader} />
        <Blaze template="cartDrawer" className="reaction-cart-drawer" />
        <main>
          <ReactComponentOrBlazeTemplate name={template} />
        </main>
        <ReactComponentOrBlazeTemplate name={layoutFooter} />
      </div>
    );
  }
}

CoreLayout.propTypes = {
  actionViewIsOpen: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  data: PropTypes.object,
  structure: PropTypes.object
};

registerComponent("coreLayout", CoreLayout);

export default CoreLayout;
