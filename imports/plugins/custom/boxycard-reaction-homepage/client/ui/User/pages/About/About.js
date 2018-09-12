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
import "./styles.less";
import { updateAlert } from "../../../Actions";
import Scroll from "react-scroll";
import StickyDiv from 'react-stickydiv';
import Ripples from 'react-ripples'

const scroll = Scroll.animateScroll;

export default class LandingPage extends Component {
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

  renderBigMain() {
    return (
      <div className="cms-about">
        <div id="about-graphic">
          <img src="images/graphics/about/about2-header.jpg" alt=""/>
        </div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="contentrow">
              <Grid container id="about-intro">
                <Grid item xs={12} sm={1} md={1} lg={1} xl={1}></Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <h2>It's Hip To Be Square.</h2>
                  <p>Some say the secret to a perfect elevator pitch is to practice thousands of times before you speak, others just have Boxy Cards to do all the work for them.</p>
                  <p>So while others are lollygagging and talking someone's ear off -- you will get straight to the point. Since cards are as commonplace as a handshake, nothing's better than knowing that your unforgettable Boxy Cards are the first step to long-term business relationships.</p>
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <img src="images/graphics/about/about-intro.png" alt=""/>
                </Grid>
                <Grid item xs={12} sm={1} md={1} lg={1} xl={1}></Grid>
              </Grid>

              <Grid container id="about-steps">
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <h3><span>Step 1</span><strong>Pick a Template</strong></h3>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <h3><span>Step 2</span><strong>Customize It</strong></h3>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <h3><span>Step 3</span><strong>Print Boxy</strong></h3>
                </Grid>
              </Grid>

              <div id="about-cta">
                <h3>About BOXY Benefits.</h3>
                <p>Everyone is a fan of benefits. If not, you're only kidding yourself.</p>

                <div className="btn-wrapper">
                  <a className="btn btn-boxy" href="/templates.html">
                    <span>Start Designing Your Boxy Card Now</span>
                  </a>
                </div>
              </div>

              <div id="about-tokens">
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <div className="table-text">
                      <h3>Print &amp; Paper Quality</h3>
                      <p>When it comes to quality, we don't mess around. Nothing is more of a priority to us than making sure the quality of your Boxy Cards are up to par with our standards. We are founded by award-winning designers who believe in the importance of showcasing quality portfolio pieces due an enriching blank canvas. Nothing leaves our doors until your cards are picture perfect!</p>
                      <p>Let's just say that being one pixel off drives us crazy.</p>
                      <img src="images/graphics/quality-closeup.png" alt=""/>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src="images/graphics/about/frames.png" alt=""/>
                  </Grid>
                </Grid>

                <div className="rotating-boxes">
                  <img src="images/graphics/about/rotating-boxes.png" alt=""/>
                </div>

                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src="images/graphics/about/flat-cards.png" alt=""/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <div className="table-text">
                      <h3>Eight Faces of Space</h3>
                      <p>Isn't there more to you than a 2-sided business card?<br/>Can you really say everything that you want to say?</p>
                      <p>Multi-interchangeable ways to fold your card.</p>
                    </div>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <div className="table-text">
                      <h3>Fits In Any Wallet</h3>
                      <p>___% of business cards that don't fit into a wallet get thrown out.</p>
                      <p>Boxy Cards fit in a wallet with the rest of the plain business cards that you're used to.</p>
                      <p>Same exact size as the rest -- 3.5in x 2in</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src="images/graphics/about/wallet.png" alt=""/>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src="images/graphics/about/elevator.png" alt=""id="elevator-img" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <div className="table-text">
                      <h3>Elevator Pitch</h3>
                      <p>Isn't there more to you than a 2-sided business card? Can you really say everything that you want to say?</p>
                    </div>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <div>
                      <h3>Stack Them Up</h3>
                      <p>Boxy Cards stand upright on any flat surface. So stack them up to give your trade show booth an extra perk.</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src="images/graphics/about/about-stack.png" alt=""/>
                  </Grid>
                </Grid>
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
        {this.renderBigMain()}
      </div>
    )
  }
}





