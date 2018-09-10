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
import { updateAlert } from "../../../Actions";
import Scroll from "react-scroll";

import StickyDiv from 'react-stickydiv';
import ReactPlayer from 'react-player'
import ContainerDimensions from 'react-container-dimensions'
import Button from 'material-ui/Button';
import Ripples from 'react-ripples'
import Divider from 'material-ui/Divider';

const scroll = Scroll.animateScroll;

class LandingPage extends Component {
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
    return (
      <div></div>
    )
  }
  renderLink(link, text, pathname) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <a href={link} style={{ fontFamily: 'Futura', fontSize: 16, color: 'white', textAlign: 'left', textTransform: 'initial', textDecoration: 'none' }}>
          <Button
            style={{ width: "100%", height: '100%', backgroundColor: pathname === link ? '#0ea6db' : '#3b3b3b', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 5, paddingRight: 15, paddingBottom: 6, paddingLeft: 15 }}
          >
            <p style={{ fontFamily: 'Futura', fontSize: 16, color: pathname === link ? 'white' : '#aaaaaa', textAlign: 'left', textTransform: 'initial', textDecoration: 'none' }}>
              {text}
            </p>
          </Button>
        </a>
      </div>
    )
  }
  renderBigMain() {
    //TODO:: Template selection
    // const history = this.props.history
    // const location = history.location
    // const pathname = location.pathname

     const pathname= 'http://www.google.com'
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Futura', fontSize: 23, color: 'white', backgroundColor: '#3B3B3B', textAlign: 'left', width: '100%', paddingLeft: '2%', paddingTop: '2%' }}>
          <div style={{ paddingLeft: 15 }}>
            CATEGORIES
          </div>
          {this.renderLink('/templates/advertising-marketing', 'Advertising & Marketing', pathname)}
          <Divider />
          {this.renderLink('/templates/business-networking-referral', 'Business & Networking / Referral', pathname)}
          <Divider />
          {this.renderLink('/templates/design', 'Design', pathname)}
          <Divider />
          {this.renderLink('/templates/architecture-interior-design', 'Architecture & Interior Design', pathname)}
          <Divider />
          {this.renderLink('/templates/photography-film-fashion-events', 'Photography & Film / Fashion / Events', pathname)}
          <Divider />
          {this.renderLink('/templates/real-estate-hotels', 'Real Estate / Hotels', pathname)}
          <Divider />
          {this.renderLink('/templates/food-beverage-product', 'Food & Beverage / Product', pathname)}
          <Divider />
          {this.renderLink('/templates/beauty-health-fitness-spa', 'Beauty / Health / Fitness / Spa', pathname)}
          <Divider />
          {this.renderLink('/templates/medical-dental-veterinary-lawyers', 'Medical, Dental, Veterinary / Lawyers', pathname)}
          <Divider />
          {this.renderLink('/templates/education-childcare', 'Education / Childcare', pathname)}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Helevetica+Neue', color: '#3b3b3b', fontSize: 28, paddingRight: 160, textAlign: 'center', lineHeight: '1' }}>
            Enables pictures and text on the inside of your card to establish & form your brand identity
          </div>
        </Grid>
      </Grid>
    )
  }

  render() {
    const history = this.props.history
    console.log(history);
    return (
      <div>
        {this.renderSmallMain()}
        {this.renderBigMain()}
      </div>
    )
  }
}



 export const Templates  = createContainer(() => {
  return {

  };
}, LandingPage);

