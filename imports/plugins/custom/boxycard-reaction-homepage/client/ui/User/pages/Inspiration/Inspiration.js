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
import "./styles.css";

export default class Inspiration extends Component {

  render() {
    return (
      <div id="inspiration-page">
        <Grid container style={{ paddingTop: 30 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingLeft: '20%' }}>
            <h1 style={{ fontFamily: 'Futura', fontSize: 42, fontWeight: 500, color: 'black', paddingRight: '5%' }}>
            GET INSPIRED.
            </h1>
            <div style ={{ fontFamily: 'Helevetica+Neue', color: 'black', width: '70%', paddingRight: '8%', textAlign: 'left', fontSize: 16, paddingTop: -1.5, fontWeight: 800, paddingBottom: 30 }}>
              Explore examples of creative Boxy Cards designed and printed by you.
              <br />
              <a href="/templates">Create yours now.</a>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}



