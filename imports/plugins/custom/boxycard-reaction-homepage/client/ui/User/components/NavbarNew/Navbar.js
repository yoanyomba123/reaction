import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { createContainer } from "react-meteor-data";
import { Link } from "react-router-dom";
import { updateSideBarVisible, updateLoginModalVisible } from "../../../Actions";
import { connect } from "react-redux";
import globalStyles from "../../../../config/globalStyles";
import { combineStyles, isNumber } from "../../../../config/helpers";
import styles from "./styles";
import MdSearch from "react-icons/lib/md/search";
import FaClose from 'react-icons/lib/fa/close'
import FaShoppingCart from "react-icons/lib/fa/shopping-cart";
import MdMenu from "react-icons/lib/md/menu";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import Badge from "material-ui/Badge";
import Button from 'material-ui/Button';
import LoginForm from "../../../Common/components/LoginForm";
import { appName } from "../../../../config/globalConsts";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    this._isMounted = true;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <Grid
        container
        style={{ padding: 0, margin: 0 }}
        justify='center'
        align='center'
      >
        <img src="images/bg/header-home-bg.png" style={{ width: '100%', height: 'auto' }}/>
      </Grid>
    );
  }
}

const MeteorNav = createContainer(() => {
  const userId = Meteor.userId();
  return {
    userId,
  };
}, Navbar);

const mapStateToProps = (state) => {
  const { reducers } = state;
  const { sideBarVisible, loginModalVisible } = reducers;
  return { sideBarVisible, loginModalVisible };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateSideBarVisible: (sideBarVisible) => {
      dispatch(updateSideBarVisible(sideBarVisible));
    },
    doUpdateLoginModalVisible: (loginModalVisible) => {
      dispatch(updateLoginModalVisible(loginModalVisible));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeteorNav);
