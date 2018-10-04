import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getComponent, registerComponent } from "@reactioncommerce/reaction-components";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";

class CoreAdminLayout extends Component {
  constructor(props) {
    super(props);

    const { structure } = this.props;
    const { layoutHeader, layoutFooter } = structure || {};

    const headerComponent = layoutHeader && getComponent(layoutHeader);
    const footerComponent = layoutFooter && getComponent(layoutFooter);

    if (headerComponent) {
      this.headerComponent = React.createElement(headerComponent, {});
    }

    if (footerComponent) {
      this.footerComponent = React.createElement(footerComponent, {});
    }
  }

  render() {
    const { actionViewIsOpen, structure } = this.props;
    const { template } = structure || {};

    const pageClassName = classnames({
      "page": true,
      "show-settings": actionViewIsOpen
    });

    let mainNode = null;
    try {
      const mainComponent = getComponent(template);
      mainNode = React.createElement(mainComponent, {});
    } catch (error) {
    //  Probe for Blaze template (legacy)
      if (Template[template]) {
        mainNode = <Blaze template={template} />;
      }
    }

    // Hack for the prototype. Restrict the width of all panels
    // except for orders and accounts
    let style;
    if (template !== "orders" && template !== "accountsDashboard") {
      style = { width: "100%", maxWidth: "640px", margin: "0 auto" }
    }

    console.log("template", template);


    return (
      <div className={pageClassName} id="reactionAppContainer">

        {this.headerComponent}

        <Blaze template="cartDrawer" className="reaction-cart-drawer" />

        <main style={style}>
          {mainNode}
        </main>

        {this.footerComponent}
      </div>
    );
  }
}

CoreAdminLayout.propTypes = {
  actionViewIsOpen: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  data: PropTypes.object,
  structure: PropTypes.object
};

registerComponent("coreAdminLayout", CoreAdminLayout);

export default CoreAdminLayout;
