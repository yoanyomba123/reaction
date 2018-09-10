import React, { Component } from "react";
import { Components } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { createContainer } from "react-meteor-data";
import { Link } from "react-router-dom";
import { updateSideBarVisible, updateLoginModalVisible } from "../../../Actions";
import { connect } from "react-redux";
import globalStyles from "../../../../config/globalStyles";
import { combineStyles, isNumber } from "../../../../config/helpers";
import styles from "./styles";
import "./index.css";
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
import LoginForm from "../LoginForm";
import { appName } from "../../../../config/globalConsts";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { getRawComponent, replaceComponent } from "@reactioncommerce/reaction-components";
const NavBar = getRawComponent("NavBar");

class Navbar extends NavBar {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0,
      value: "",
      suggestions: [],
      modalVisible: false,
      loadingBtn: false,
      showAlert: false,
      alertMessage: "",
      zipCode: "",
      zipCodeAllowed: false,
      checkedZipCode: false,
      joinedWaitList: false,
      email: "",
      scrollY: 0,
      isScrollingUp: true,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setSideBarVisible = this.setSideBarVisible.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleOnKeyDownJoin = this.handleOnKeyDownJoin.bind(this);
  }

  handleError(alertMessage) {
    this.setState({ alertMessage, showAlert: !this.state.showAlert });
  }
  handleOnKeyDownJoin(event) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      this.joinWaitList();
    }
  }
  joinWaitList() {
    const { zipCodeAllowed, email, zipCode } = this.state;
    if (isNumber(zipCode) && zipCode.length === 5) {
      if (!zipCodeAllowed) {
        Meteor.call("joinWaitList", { email, zipCode }, (err, res) => {
          if (res && this._isMounted) {
            this.setState({ joinedWaitList: !this.state.joinedWaitList });
          }
        });
      }
    } else {
      this.handleError("Please, enter a valid US zip code!");
    }
  }

  setModalVisible() {
    const { doUpdateLoginModalVisible, loginModalVisible } = this.props;
    doUpdateLoginModalVisible(!loginModalVisible);
  }

  renderMessage() {
    return (
      <Grid
        item
        sm={4}
        md={4}
        lg={4}
        style={combineStyles([styles.contName, globalStyles.center])}
      >
        <p
          style={combineStyles([
            globalStyles.textCenter,
            globalStyles.textMid,
            globalStyles.textBold5,
          ])}
        >
          Free delivery + Pick up returns
        </p>
      </Grid>
    );
  }

  renderCartMobile() {
    const { userId } = this.props;
    return (
      <Grid
        item
        xs={2}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.center,
        ])}
        onClick={() => {
          if (userId) {
            this.props.history.push("/shop/cart/");
          } else {
            this.setModalVisible();
          }
        }}
      >
        <div>
          { userId ?
            <Badge badgeContent={0} color="primary">
              <FaShoppingCart size={23} style={styles.iconCart} />
            </Badge>
            :
            <FaShoppingCart size={25} style={styles.iconCart} />
          }
        </div>
      </Grid>
    );
  }

  renderModalLogin() {
    const { userId, loginModalVisible } = this.props;
    const { signUp } = this.state;
    if (!userId) {
      return (
        <div>
          <Hidden only='xs'>
            <Dialog open={loginModalVisible} onRequestClose={this.setModalVisible}>
              <DialogContent style={{ minWidth: 400 }}>
                <LoginForm signUp={signUp} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.setModalVisible} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Hidden>
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <Dialog fullScreen open={loginModalVisible} onRequestClose={this.setModalVisible}>
              <DialogTitle onClick={this.setModalVisible}><FaClose /></DialogTitle>
              <DialogContent>
                <LoginForm signUp={signUp} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.setModalVisible} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Hidden>
        </div>

      )
    }
    return null;
  }


  renderSearchMobile() {
    return (
      <Grid
        item
        xs={2}
        style={combineStyles([
          globalStyles.center,
          globalStyles.noMarginPadding,
          { justifyContent: "flex-end" },
        ])}
      >
        <IconButton
          disableRipple={true}
          onClick={() => {
            this.setSideBarVisible();
            const { history } = this.props;
            const isProductsPage =
              history.location.pathname.indexOf("products") > -1;
            if (!isProductsPage) {
              this.props.history.push("/shop/products");
            }
          }}
        >
          <MdSearch size={25} />
        </IconButton>
      </Grid>
    );
  }

  setSideBarVisible() {
    const { doUpdateSideBarVisible, sideBarVisible } = this.props;
    doUpdateSideBarVisible(!sideBarVisible);
  }

  renderLeftBtn() {
    const { history } = this.props;
    return (
      <Grid
        item
        xs={2}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.center,
        ])}
      >
        {this.renderHamburgerButton()}
      </Grid>
    );
  }

  renderSmallScreen() {
    return (
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <Grid
          container
          style={combineStyles([styles.contGridMenu, globalStyles.center])}
        >
          {this.renderLeftBtn()}
          <Grid
            item
            xs={6}
            style={combineStyles([
              globalStyles.center,
              globalStyles.noMarginPadding,
              { height: '100%' }
            ])}
          >
            <Link to="/">
              <div
                style={combineStyles([
                  globalStyles.center,
                  { height: "100%", cursor: "pointer" },
                ])}
                onClick={() => {
                  //this.props.history.push("/");
                }}
              >
                <p
                  style={combineStyles([
                    globalStyles.textBig,
                    globalStyles.textMavenPro,
                    globalStyles.textCenter,
                    globalStyles.textMavenPro,
                    globalStyles.textBlack,
                    globalStyles.textBold6,
                    { paddingLeft: 8 },
                  ])}
                >
                  {appName}
                </p>
              </div>
            </Link>
          </Grid>
          {this.props.visibility.cartContainer && this.renderCartContainerAndPanel()}
        </Grid>
      </Hidden>
    )
  }

  renderBigNav() {
    return (
      <Hidden only={['xs', 'sm']}>
        <Grid container spacing={24} style={{ position: 'absolute' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ zIndex: 1, padding: '1%' }}>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ zIndex: 1, padding: '1%', display: 'flex', justifyContent: 'center', alignItems: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center',  marginBottom: '3%', width: '80%' }}>
                  <div style={{ backgroundColor: 'black', padding: '3% 1%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <img src='images/boxycard-logo.svg' style={{ position: 'relative', width: '88%', height: 'auto', zIndex: 100 }}/>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', zIndex: 1, width: '100%' }}>
                  <div style={{ backgroundColor: 'black', padding: '3%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 5, width: '90%', maxWidth: 200 }}>
                    <div style={{ zIndex: 1 }}>
                      <a href='/cart' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>CART</a>
                    </div>

                    <Components.BoxyMainDropdown />
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', borderRadius: 5, width: '37%', minWidth: 460, zIndex: 100, padding: '3%' }}>
                  <div style={{ zIndex: 1 }}>
                    <a href='/' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>HOME</a>
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <a href='/about'style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>ABOUT</a>
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <a href='/templates' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>TEMPLATES</a>
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <a href='/inspiration' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>INSPIRATION</a>
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <a href='/faqs' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>FAQS</a>
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <a href='/contact' style={{ fontFamily: 'Roboto', color: 'white', letterSpacing: 1, fontSize: 13 }}>CONTACT</a>
                  </div>
                </div>
              </div>
            </Grid>

          </Grid>
        </Grid>
      </Hidden>
    );
  }
  renderSmallNav() {
    return (
      <Hidden only={['md','lg','xl']}>
        <Grid container style={{ position: 'absolute', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
          <div style={{backgroundColor: 'rgba(0,0,0,0.6)', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, width: '80%' }}>
            <div style={{ zIndex: 100, backgroundColor: 'black', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '1%', paddingRight: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
              <img src='images/boxycard-logo.svg' style={{ position: 'relative', width: '75%', height: 'auto', zIndex: 100 }}/>
            </div>
          </div>
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src='images/bg/header-home-bg.png'
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', zIndex: 2, minHeight: 279, minWidth: 1336, display: 'block', marginLeft: 'auto', marginRight: 'auto', top: 0, left: '50%', transform: 'translate(-50%, 0%)' }}/>
          </Grid>
        </Grid>
      </Hidden>

    )
  }

  render() {
    return (
      <Grid
        container
        style={combineStyles([
          globalStyles.noMargin,
          globalStyles.noPadding,
          styles.row,
          styles.cont,
        ])}
        justify='center'
        align='center'
        position='relative'
      >
        <img
          src='images/bg/header-home-bg.png'
          style={{ position: 'relative', width: '100%', height: 'auto', zIndex: 1, minHeight: 279, minWidth: 1336, display: 'block', marginLeft: 'auto', marginRight: 'auto', top: 0, left: '50%', transform: 'translate(-50%, 0%)' }}/>
        <Drawer
          docked={false}
          width={250}
          open={this.props.sideBarVisible}
          onRequestChange={open => this.props.doUpdateSideBarVisible(open)}
        >
          <div>Drawer</div>
        </Drawer>
        {this.renderModalLogin()}
        {this.renderSmallScreen()}
        <Dialog
          open={this.state.showAlert}
          onRequestClose={() => {
            this.setState({ showAlert: !this.state.showAlert })
          }}
        >
          <DialogContent style={{ minWidth: 400 }}>
            <DialogContentText>
              {this.state.alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showAlert: !this.state.showAlert })
              }}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {this.renderSmallNav()}
        {this.renderBigNav()}
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

replaceComponent("NavBar", MeteorNav);
export default connect(mapStateToProps, mapDispatchToProps)(MeteorNav);
