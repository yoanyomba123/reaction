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
    const name = ', Andrea'
    return (
      <div style={{ backgroundColor: '#eee' }}>
        <Grid container style={{ paddingTop: 90 }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginRight: 100 }}>
            <div style={{ fontFamily: 'futura-pt', fontSize: 42, fontWeight: 500, color: 'black', paddingRight: 5, paddingLeft: 110 }}>
            It's Hip To Be Square.
            </div>
            <div></div>
            <div style ={{ fontFamily: 'Helvetica Neue', color: 'black', width: '70%', paddingRight: 5, textAlign: 'left', fontSize: 14, paddingTop: -1.5, paddingLeft: 200 }}>
                Some say the secret to a perfect elevator pitch is to practice thousands of times before you speak, others just have Boxy Cards to do all the work for them.
              <p style={{ margin: 0, marginTop: 14 }}>
                So while others are lollygagging and talking someone's ear off -- you will get straight to the point. Since cards are as commonplace as a handshake, nothing's better than knowing that your unforgettable Boxy Cards are the first step to long-term business relationships. </p>
            </div>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40%', zIndex: 10, marginLeft: 100 }}>
              <div>
                <img
                  src='images/graphics/about/about-intro.png'
                  style={{ width: '100%', height: 'auto' }}/>
              </div>
            </Grid>


<Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
              <div>
                <img
                  src='images/bg/box-shadow-left.png'
                  style={{ width: '50%', height: 'auto' }}/>
                <img
                  src='images/bg/box-shadow-right.png'
                  style={{ width: '50%', height: 'auto' }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>
                <img
                  src='images/graphics/slogan2.svg '
                  style={{ width: '70%' }}/>
              </div>
              <div style={{ fontFamily: 'Roboto', fontSize: 13, fontWeight: 500, color: '#00A7D6' }}>
                Create a customized card to go with that new job title of yours.
              </div>
            </Grid>
</Grid>
          <Grid container>
            <Grid item xs={12} sm={3} md={3} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingTop: 55 }}>
              <div style ={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 14, paddingLeft: 20, width: '60%' }}>
                We are Boxy Card. The solution to the problem you didn’t realize you had. Our patent filed business cards bring a unique way to skip a step in your elevator pitch.
              </div>
              <p style={{ margin: 0, marginTop:14, paddingLeft: 20 }}>
                So, stop practicing in the mirror,
              </p>
              <div style={{ fontWeight: 700, fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 16, width: '60%', paddingLeft: 20 }}>
                <span style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 14, width: '60%', fontWeight: 'normal', paddingRight: 1 }}>and </span>
                   LET BOXY SPEAK FOR YOU.
              </div>
              <p style={{ marginTop: 4 }}></p>
              <div style={{ width: '50%', height: 'auto', paddingLeft: 20 }}>
                <Ripples>
                  <img
                    src='/images/btn/lets-boxy-btn.png'
                    style={{ width: '100%', height: 'auto' }}/>
                </Ripples>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ paddingTop: 500 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
            <div style={{ paddingRight: '47%', zIndex: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width: '142%', height: '11%', padding: 10, color: 'white', fontSize: '280%', fontWeight: 300, fontFamily: 'Roboto' }}>
                Museum-Quality Prints
              </div>
            </div>
            <img
              src='images/graphics/frames2-fg.png'
              style={{ width: '110%', height: 'auto', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}/>
            <img
              src='images/graphics/frames3-bg.png'
              style={{ zIndex: 1, width: '107%', height: 'auto', position: 'absolute', paddingTop: '9.9%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}/>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, paddingRight: 120, textAlign: 'center', lineHeight:'1' }}>
              High quality, double-sided business cards, printed in full color at no extra cost
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', paddingLeft: '40%', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 500 }}>
              Eight Faces
              <p style={{ margin: 0, marginTop: 1 }}>
                Of Space</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 500 }}>
            <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, paddingRight: 160, textAlign: 'center', lineHeight:'1' }}>
              Enables pictures and text on the inside of your card to establish & form your brand identity
            </div>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, textAlign: 'center', lineHeight:'1', paddingLeft: '40%', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 300 }}>
                Folds from a 3D box figure to a standard size business card
                <p style={{ margin: 0, marginTop: 84 }}>
                  As the patent-pending holder of our 3D business cards, we are proud to be the industry leader.</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 550 }}>
              <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', paddingRight: '30%', textAlign: 'center', lineHeight: '1' }}>
                3.5 x 2 inches
              </div>
            </Grid>

            <Grid container style={{ paddingTop: 300 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <img
                  src='images/graphics/wallet-bg.png'
                  style={{ width: '118%', height: 'auto', zIndex: 10 }}/>
                <img
                  src='images/graphics/wallet-fg.png'
                  style={{ zIndex: 15, width: '118%', height: 'auto', position: 'absolute', top: 1.8 }}/>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', paddingRight: '20%', justifyContent: 'center', alignItems: 'center', paddingTop: 100, marginLeft: -100 }}>
                  Fits With The Rest
                  <p style={{ margin: 0, marginTop: 1 }}>
                    In Your Wallet</p>
                </div>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: 400 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', textAlign: 'center', paddingLeft: 150, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 200, lineHeight: 1, marginRight: -100 }}>
                  Skip A Step
                  <p style={{ margin: 0, marginTop: 1 }}>
                    In Your</p>
                  <p style={{ margin: 0, marginTop: 1 }}>
                      Elevator Pitch</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <img
                  src='images/graphics/elevator-door-left3.png'
                  style={{ width: '36%', height: 'auto', zIndex: 100 }}/>
                <img
                  src='images/graphics/elevator-door-right3.png'
                  style={{ width: '36%', height: 'auto', zIndex: 100 }}/>
                <img
                  src='images/graphics/elevator-fg2.png'
                  style={{ width: '36%', height: 'auto', position: 'absolute', zIndex: 50 }}/>
                <img
                  src='images/graphics/elevator-bg2.png'
                  style={{ width: '36%', height: 'auto', position: 'absolute', zIndex: 10 }}/>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 500 }}>
                <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, paddingRight: 200, textAlign: 'center', lineHeight: 1 }}>
                The ultimate conversation starter in business card form
                </div>
              </Grid>

              <Grid container style={{ paddingTop: 400 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', textAlign: 'center', paddingRight: '45%', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 200, lineHeight: 1 }}>
                    {'"'}Let Boxy Card
                    <p style={{ margin: 0, marginTop: 1 }}>
                      Speak For You{'"'}</p>
                  </div>
                </Grid>
              </Grid>





              <Grid container style={{ paddingTop: 500 }}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                  <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', lineHeight: 1, paddingLeft: '40%' }}>
                    Stack Them!
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} ></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, paddingRight: '40%', textAlign: 'center', lineHeight: 1 }}>
                    Each Boxy Card stands upright on its own on any flat surface
                  </div>
                </Grid>
              </Grid>


              <Grid container style={{ paddingBottom: 0 }}>>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                  <img
                    src='images/graphics/lobby2-bg.png'
                    style={{ width: '65%', height: 'auto' }}/>
                </Grid>
              </Grid>






            </Grid>
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





