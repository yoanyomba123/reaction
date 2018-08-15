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

export default class Inspiration extends Component {
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingLeft: '30%' }}>
            <h1 style={{ fontFamily: 'futura-pt', fontSize: 42, fontWeight: 500, color: 'black', paddingRight: '5%' }}>
            GET INSPIRED.
            </h1>
            <div>   </div>
            <div>   </div>
            <div style ={{ fontFamily: 'Helevetica+Neue', color: 'black', width: '70%', paddingRight: '8%', textAlign: 'left', fontSize: 16, paddingTop: -1.5, fontWeight: 800, paddingBottom: 30 }}>
                Explore examples of creative Boxy Cards designed and printed by you. Create yours now. (link to templates page)
              <div></div>

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



