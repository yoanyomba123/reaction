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
        {this.renderSmallMain()}
        {this.renderBigMain()}
      </div>
    )
  }
}



