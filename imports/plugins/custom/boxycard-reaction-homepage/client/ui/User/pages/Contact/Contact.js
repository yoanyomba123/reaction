import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render, ReactDOM } from "react-dom";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from "react-router-dom";
import { Globals } from "../../../../../lib/collections";
import { combineStyles } from "../../../../config/helpers";
import globalStyles from "../../../../config/globalStyles";
import colors from "../../../../config/colors";
import styles from "./styles";
import { updateAlert } from "../../../Actions";
import Scroll from "react-scroll";

import StickyDiv from 'react-stickydiv';
import ReactPlayer from 'react-player'
import ContainerDimensions from 'react-container-dimensions'
import Button from 'material-ui/Button';
import Ripples from 'react-ripples'

const scroll = Scroll.animateScroll;

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    this._isMounted = true
  }
  componentDidMount() {
    scroll.scrollTo(0, {
      duration: 0,
      delay: 0,
      smooth: true,
    });
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  renderMain() {
    return (
      <Grid container style={globalStyles.noMarginPadding}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={combineStyles([
            styles.contAnswer,
            { paddingTop: 15, paddingBottom: 15 },
          ])}
        >
          <div style={{ height: 1000 }} onClick={() => {
            this.props.doUpdateAlert("hi hi")
          }}>

          </div>
        </Grid>
      </Grid>
    )
  }

  renderSmallMain() {
    return(
      <div></div>
    )
  }

  renderBigMain() {
    return (
      <div style={{ backgroundColor: '#eee' }}>
        <Grid container style={{ paddingTop: 30 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingLeft: '30%' }}>
            <h1 style={{ fontFamily: 'Futura', fontSize: 42, fontWeight: 500, color: 'black', paddingRight: '5%' }}>
            CONTACT BOXY.
            </h1>
            <div>   </div>
            <div>   </div>
            <div style ={{ fontFamily: 'Helevetica+Neue', color: 'black', width: '70%', paddingRight: '8%', textAlign: 'left', fontSize: 16, paddingTop: -1.5, fontWeight: 800, paddingBottom: 30 }}>
                See FAQs page to get your questions answered. Still need help? Get in touch with us:
              <div></div>
              <div>
                <p style={{ margin: 0, marginTop: 30, fontWeight: 800, fontSize: 20 }}>
                Email: <strong>hello@BoxyCard.com </strong></p>
              </div>
              <div>
                <p style={{ margin: 0, marginTop: 30, fontWeight: 400 }}>
                Ideal for technical issues
                Particularly for artwork problems and returns/refunds
                We'll get back to you by the end of the next working day (but often much quicker)</p>
                <div>
                  <p style={{ margin: 0, marginTop: 30 }}>
                Phone: (646) 838-BOXY (2699) </p>
                </div>
                <div></div>
                <div>
                  <p style={{ margin: 0, marginTop: 30, fontWeight: 400 }}>
              Ideal for quick questions
              Particularly for product information and turnaround time
              Not ideal for technical problems
              Available 9am-5pm (EST) | Mon-Fri | excl. Public Holidays </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderSmallMain()}
        {this.renderBigMain()}
      </div>
    )
  }
}




