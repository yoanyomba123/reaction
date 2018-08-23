import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { render, ReactDOM } from "react-dom";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from "react-router-dom";
import { Globals } from "../../../../../lib/collections";
import { combineStyles } from "../../../../config/helpers";
import globalStyles from "../../../../config/globalStyles";
import colors from "../../../../config/colors";
import styles from "./styles";
import { connect } from 'react-redux'
import { updateAlert } from "../../../Actions";
import Scroll from "react-scroll";

import StickyDiv from 'react-stickydiv';
import ReactPlayer from 'react-player'
import ContainerDimensions from 'react-container-dimensions'
import Button from 'material-ui/Button';
import Ripples from 'react-ripples'

const scroll = Scroll.animateScroll;

export default class FAQs extends Component {
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
  renderBigNav() {
    return (
      <Hidden only={['xs', 'sm']}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src='images/bg/header-bg.png'
              style={{ position: 'absolute', width: '100%', height: 'auto', zIndex: 1, display: 'block', marginLeft: 'auto', marginRight: 'auto', top: 0, left: '50%', transform: 'translate(-50%, 0%)' }}/>
            <Grid container>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ zIndex: 1, padding: '1%' }}>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ zIndex: 1, padding: '1%', display: 'flex', justifyContent: 'center', alignItems: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.8%', marginBottom: '3%', width: '80%' }}>
                  <div style={{ backgroundColor: 'black', paddingTop: '3%', paddingBottom: '2%', paddingLeft: '1%', paddingRight: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <img src='images/boxycard-logo.svg' style={{ position: 'relative', width: '88%', height: 'auto', zIndex: 100 }}/>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', zIndex: 1 }}>
                <StickyDiv>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', zIndex: 1 }}>
                    <div style={{ backgroundColor: 'black', padding: '1%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '90%', maxWidth: 253 }}>
                      <div style={{ zIndex: 1, padding: '2%' }}>
                        <a href='/myaccount' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>MY ACCOUNT</a>
                      </div>
                      <div style={{ zIndex: 1, padding: '2%' }}>
                        <a href='/cart' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>CART</a>
                      </div>
                      <div style={{ zIndex: 1, padding: '2%' }}>
                        <a href='/login' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>LOGIN</a>
                      </div>
                    </div>
                  </div>
                </StickyDiv>
              </Grid>
            </Grid>

            <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <StickyDiv>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 5, width: '37%', minWidth: 460, zIndex: 100 }}>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>HOME</a>
                    </div>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/about'style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>ABOUT</a>
                    </div>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/templates' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>TEMPLATES</a>
                    </div>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/inspiration' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>INSPIRATION</a>
                    </div>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/faqs' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>FAQS</a>
                    </div>
                    <div style={{ zIndex: 1, padding: '2%' }}>
                      <a href='/contact' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>CONTACT</a>
                    </div>
                  </div>
                </div>
              </StickyDiv>
            </Grid>

          </Grid>
        </Grid>
      </Hidden>
    );
  }
  renderSmallNav() {
    return (
      <Hidden only={['md','lg','xl']}>
        <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '3%'}}>
          <div style={{backgroundColor: 'rgba(0,0,0,0.6)', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, width: '80%' }}>
            <div style={{ zIndex: 100, backgroundColor: 'black', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '1%', paddingRight: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
              <img src='images/boxycard-logo.svg' style={{ position: 'relative', width: '75%', height: 'auto', zIndex: 100 }}/>
            </div>
          </div>
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src='images/bg/header-bg.png'
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', zIndex: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto', top: 0, left: '50%', transform: 'translate(-50%, 0%)' }}/>
          </Grid>
        </Grid>
      </Hidden>

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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 500, color: 'black', paddingRight: '5%' }}>
            FREQUENTLY ASKED QUESTIONS.
            </h1>
            <div>   </div>
            <div>   </div>
            <div style ={{ fontFamily: 'Helevetica+Neue', color: 'black', width: '70%', paddingRight: '8%', textAlign: 'left', fontSize: 16, paddingTop: -1.5, paddingLeft: '10%', fontWeight: 800 }}>
                These Frequently Asked Questions are amongst the most popular of it’s kind. Answer not here? Watch this. (link to video)
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                What exactly <strong>ARE</strong> Boxy Cards? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Boxy Cards are a newest form of an ultimate conversation starter in business card form. Yet, not only a business card, but a promotional keepsake item as well. Boxy Cards are high quality, double-sided business cards, printed in full color at no extra cost. A Boxy Card uniquely folds from a 3-D like box figure to a standard size business card to fit with the rest in your wallet. They help to establish & form your brand identity while also giving you extra cool points. </p>
                <p style={{ margin: 0, marginTop: 25, fontWeight: 400 }}>
                   No design or images of your own? No problem, choose from a selection of free business card designs created by our professional team and personalize them with your own details. There&#x27;s a range of Business Card templates to choose from too, with the option of uploading your own pictures and text to start from scratch </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                So Ya Say It’s Patented? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  You better believe it, bucko! Our unique Boxy Card design is patent-pending and filed by a USPTO certified patent attorney. So don't ya dare try to rip us off or we'll have our scary lawyers come after you, ya hear?!? </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                How big are Boxy Cards? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Size matters. Sorry boys! (and girls)... When flat, Boxy Cards are the same as a standard sized business card with the width of 3.5 inches and height 2 inches so it can fit into a standard sized wallet with the rest of your average.. uhhh.. we mean great? other business cards. </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Is the paper quality? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Is the sky blue? Of course it is! We are proud to announce that our paper’s quality and print are the highest of our concerns. We expect you to demand a high quality product that represents you, and hey -- you’re actually representing us! </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Can I upload my own or do I have to use a template? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Listen here, pal. You can do whatever your heart desires. So try </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                How long till it’s delivered? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Blah Blah Blah... </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Can Ya Stack It? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Stack it, flatten it, hey... even throw it at people! What do we care? Just don't tell your next target that we told you to do it.</p>

                <p style={{ margin: 0, marginTop: 25, fontWeight: 400 }}>
                Our customers have been known to showcase their cards at Trade Show booths and their offices in "stack-worthy" form. We have yet to find the highest stacked Boxy Card pyramid -- think it could be you? [link to a bunch of pictures of Boxy Cards stacked everywhere]</p>

                <p style={{ margin: 0, marginTop: 25, fontWeight: 400 }}>
                Not only that, but rumor has it that when you give your Boxy Card out to a potential client, it's kept on their desk for weeks as a reminder. </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Which ones are popular? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Blah Blah Blah... </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Made in the USA? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  You better believe it! </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Ya pinky swear? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Blah Blah Blah... </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Is my elevator pitch that bad? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Yes! Sorry, but it’s true. </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                What is a 1st impression? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  You remember the first time you saw ones of our cards or even came to this site & fell in love? That’s the feeling. The tingling in your toes kind of feeling. </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                How do I make these things? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400 }}>
                  Click here to follow the step-by-step procedure </p>
              </div>
              <div></div>
              <p style={{ fontSize: 20, fontWeight: 800, paddingTop: 30 }}>
                Boxy, why are you so amazing and why weren’t you in my life sooner? </p>
              <div>
                <p style={{ margin: 0, marginTop: 6, fontWeight: 400, paddingBottom: 50 }}>
                  It’s all about timing and the timing is now! But I'm glad we met. </p>
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
        {this.renderSmallNav()}
        {this.renderBigNav()}
        {this.renderSmallMain()}
        {this.renderBigMain()}
      </div>
    )
  }
}



