import React from "react";
import { replaceComponent } from "/imports/plugins/core/components/lib";
import { render } from 'react-dom';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from 'react-router-dom'
import globalStyles from "../../../../config/globalStyles"
import { combineStyles } from "../../../../config/helpers"
import styles from "./styles"
import { appName } from "../../../../config/globalConsts"

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

const BoxycardFooter = () => (
  <Grid container spacing={24} style={styles.contFooter}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'block' }}>
      <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minWidth: 460, padding: '3%' }}>
            <div><a href="/about.html">About</a></div>
            <div><a href="/templates.html">Templates</a></div>
            <div><a href="/inspiration.html">Inspiration</a></div>
            <div><a href="/faqs.html">FAQs</a></div>
            <div><a href="/hire-a-pro">Hire a Pro</a></div>
            <div><a href="/contact.html">Contact Us</a></div>
          </div>
        </div>
      </Grid>
      <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minWidth: 300, padding: '3%' }}>
            <div><a href="/terms.html">Terms &amp; Conditions</a></div>
            <div><a href="/privacy.html">Privacy Policy</a></div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={globalStyles.noMarginPadding}>
        <div style={combineStyles([globalStyles.widthFull, styles.contCopyright])}>
          <p style={combineStyles([globalStyles.textCenter, globalStyles.textSmall])}>Copyright @ {appName} {(new Date).getFullYear()}</p>
        </div>
      </Grid>
    </Grid>
  </Grid>
);


replaceComponent("Footer", BoxycardFooter);

export default BoxycardFooter;
