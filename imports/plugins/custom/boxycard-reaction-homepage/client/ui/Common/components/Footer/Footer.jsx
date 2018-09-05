import React, { Component } from 'react';
import { render } from 'react-dom';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from 'react-router-dom'
import globalStyles from "../../../../config/globalStyles"
import { combineStyles } from "../../../../config/helpers"
import styles from "./styles"
import { appName } from "../../../../config/globalConsts"
import { registerComponent } from "@reactioncommerce/reaction-components";

const helpMenus = [
  {
    name: 'FAQs',
    id: 'faqs',
    uriObj: {
      isExternal: false,
      uri: '/shop/faqs',
    },
  },
  {
    name: 'Delivery & Returns',
    id: 'delivery',
    uriObj: {
      isExternal: false,
      uri: '/shop/faqs',
    },
  },
  {
    name: 'What is Ethereum?',
    id: 'buyEth',
    uriObj: {
      isExternal: true,
      uri: 'https://www.coinbase.com/what-is-ethereum?locale=en-US',
    },
  },
  {
    name: 'Buy ETH',
    id: 'buyEth',
    uriObj: {
      isExternal: true,
      uri: 'https://www.coinbase.com/buy-ethereum',
    },
  },
]
const menus = [
  {
    name: "Help",
    id: 'help',
    subMenus: helpMenus,
  }
]

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderCopyright() {
    return (
      <Grid item xs={12} style={globalStyles.noMarginPadding}>
        <div style={combineStyles([globalStyles.widthFull, styles.contCopyright])}>
          <p style={combineStyles([globalStyles.textCenter, globalStyles.textSmall])}>Copyright @ {appName} 2017</p>
        </div>
      </Grid>
    )
  }
  render() {
    return (
      <Grid container style={combineStyles([globalStyles.noMarginPadding, styles.contFooter])}>
        {this.renderCopyright()}
      </Grid>
    )
  }
}

registerComponent("BoxycardFooter", Footer);
