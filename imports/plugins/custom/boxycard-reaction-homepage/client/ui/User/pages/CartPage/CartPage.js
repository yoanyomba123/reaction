import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { render, ReactDOM } from "react-dom";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from "react-router-dom";
import { Globals, Cart } from "../../../../api/collections";
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
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import Popover from 'material-ui/Popover';
import Ripples from 'react-ripples'
import Divider from 'material-ui/Divider';
import SummaryRow from "../../components/SummaryRow"

const scroll = Scroll.animateScroll


class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    scroll.scrollTo(0, {
      duration: 0,
      delay: 0,
      smooth: true,
    })
  }

  renderMain() {
    const { cartItem } = this.props
    return (
      <Grid container style={combineStyles([globalStyles.noMarginPadding, { padding: "5%", backgroundColor: '#fff' }])}>
        <Grid item xs={12} sm={8} md={8} lg={8} style={combineStyles([globalStyles.noMarginPadding])}>
          {this.renderCartItemColumn(cartItem)}
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} style={combineStyles([globalStyles.noMarginPadding, { paddingTop: 20, paddingBottom: 20, paddingLeft: "2.5%", paddingRight: "2.5%" }])}>
          {this.renderSummary(cartItem)}
        </Grid>
      </Grid>
    )
  }
  renderCartItemColumn(cartItem) {
    const { userId } = this.props
    if (userId && cartItem) {
      return (
        <div style={combineStyles([globalStyles.cont100])}>
          {this.renderCartItem(cartItem)}
        </div>
      )
    }
    return (
      <div style={combineStyles([globalStyles.cont100, { paddingRight: "2%" }])}>
        <Hidden only={['xs']}>
          <Grid container style={combineStyles([globalStyles.noMarginPadding, { paddingBottom: "2.5%" }])}>
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <p style={combineStyles([globalStyles.textBig])}>{userId ? "Your cart is empty!" : 'Please, login!'}</p>
            </div>
          </Grid>
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <Grid container style={combineStyles([globalStyles.noMarginPadding, globalStyles.center, { padding: "2.5%" }])}>
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <p style={combineStyles([globalStyles.textBig])}>{userId ? "Your cart is empty!" : 'Please, login!'}</p>
            </div>
          </Grid>
        </Hidden>
      </div>
    )
  }
  renderCartItem(cartItem) {
    const { imgURI, templateId, removedLogo } = cartItem
    return (
      <Grid container style={combineStyles([{ paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 20 }, globalStyles.center, globalStyles.column])}>
        <Grid item xs={12} sm={10} md={10} lg={10} style={combineStyles([{ padding: '2%', margin: 0, cursor: 'pointer' }])}>
          <p style={combineStyles([globalStyles.text24, globalStyles.textBold5])}>
            ADD THAT FINAL TOUCH!
          </p>
          <p style={combineStyles([globalStyles.text18, globalStyles.textBold5])}>
            High quality, double-sided business cards, printed in full color at no extra cost
          </p>
          <div style={{ paddingLeft: '10%' }}>
            <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
              All Boxy Cards come equipped with:
            </p>
            <div style={{ paddingLeft: '3%' }}>
              <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
                - Flat size dimensions: 3.5" x 2" (Standard size business card)
              </p>
              <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
                - Boxy size dimensions: 1.75" x 2"
              </p>
              <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
                - Paper weight: 14-point paper stock
              </p>
              <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
                - Color: 4/4 offset
              </p>
              <p style={combineStyles([globalStyles.text16, { marginBottom: 5, marginTop: 5 }])}>
                - Scored Fold & Glued
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={8} style={combineStyles([{ padding: '2%', margin: 0, cursor: 'pointer', backgroundColor: colors.veryLightGrey, borderColor: colors.grey, borderWidth: 1, borderStyle: 'solid' }])}>
          <div style={combineStyles([globalStyles.cont100, { paddingLeft: 20 }])}>
            <p style={combineStyles([globalStyles.text16, globalStyles.textBold5])}>
              Which paper & finish would you like?
            </p>
          </div>
          <Grid item xs={12} sm={12} md={12} lg={12} style={combineStyles([{ padding: '2%', paddingTop: 0, margin: 0, cursor: 'pointer' }, globalStyles.center])}>
            {this.renderPaperType({ paperName: 'ORIGINAL BOXY', imgURI: 'https://media.printed.com/assets/images/content/static/ordering-help/paper-types-card-stocks/lux_paper_type.jpg?v=20180221135426', message: 'message' }) }
            {this.renderPaperType({ paperName: 'MATTE BOXY', imgURI: 'https://media.printed.com/assets/images/content/static/ordering-help/paper-types-card-stocks/lux_paper_type.jpg?v=20180221135426', message: 'message' }) }
            {this.renderPaperType({ paperName: 'GLOSSY BOXY', imgURI: 'https://media.printed.com/assets/images/content/static/ordering-help/paper-types-card-stocks/lux_paper_type.jpg?v=20180221135426', message: 'message' }) }
          </Grid>
          <div style={combineStyles([globalStyles.cont100, globalStyles.row, { paddingTop: 5, paddingBottom: 5 }])}>
            <div style={combineStyles([globalStyles.cont50, { paddingLeft: 20 }, globalStyles.center, { justifyContent: 'flex-start' }])}>
              <span style={combineStyles([globalStyles.text16, globalStyles.textBold5, globalStyles.textLeft])}>
                How many cards would you like?
              </span>
            </div>
            <div style={combineStyles([globalStyles.cont50, globalStyles.center, { justifyContent: 'flex-end' }])}>
              <span style={combineStyles([globalStyles.text12, globalStyles.textRight])}>
                Please call (800) 333-3333 for higher quantities.
              </span>
            </div>
          </div>
          <Grid item xs={12} sm={12} md={12} lg={12} style={combineStyles([{ paddingTop: 0, margin: 0, cursor: 'pointer', borderColor: colors.grey, borderWidth: 1, borderStyle: 'solid' }])}>
            {this.renderCount({ count: 500, pricePerCard: 0.63 })}
            {this.renderCount({ count: 600, pricePerCard: 0.54 })}
            {this.renderCount({ count: 700, pricePerCard: 0.45 })}
            {this.renderCount({ count: 800, pricePerCard: 0.32 })}
            {this.renderCount({ count: 900, pricePerCard: 0.20 })}
            {this.renderCount({ count: 1000, pricePerCard: 0.18 })}
            {this.renderCount({ count: 1200, pricePerCard: 0.16 })}
            {this.renderCount({ count: 1600, pricePerCard: 0.12 })}
            {this.renderCount({ count: 2000, pricePerCard: 0.10 })}
          </Grid>
        </Grid>
      </Grid>
    )
  }
  /*
  <Grid item xs={12} sm={4} md={4} lg={4} style={{ padding: '2%', margin: 0, cursor: 'pointer' }}>
    <div style={{ width: "100%" }} onClick={() => {
      const { history } = this.props
      history.push("/editor/" + templateId)
    }}>
      <ContainerDimensions>
        { ({ width }) => (
          <div style={combineStyles([globalStyles.flex, globalStyles.column, { width: width, alignItems: "center" }])}>
            <img src={imgURI} style={{ maxWidth: width, maxHeight: width }}/>
          </div>
        ) }
      </ContainerDimensions>
    </div>
  </Grid>
  */
  renderPaperType({ paperName, imgURI, message }) {
    return (
      <Grid item xs={4} sm={4} md={4} lg={4} style={combineStyles([{ margin: 0, cursor: 'pointer' }, globalStyles.center])}>
        <Tooltip title={message}>
          <div style={combineStyles([globalStyles.cont90, globalStyles.center, globalStyles.column])}>
            <img src={imgURI} style={{ width: '100%', height: 80 }}/>
            <div style={combineStyles([globalStyles.cont100, globalStyles.center, { backgroundColor: '#000' }])} onClick={() => {
              this.setState({ paperName })
            }}>
              <Checkbox
                checked={this.state.paperName === paperName}
                value={paperName}
                style={{ color: '#fff' }}
              />
              <p style={combineStyles([globalStyles.text14, globalStyles.textWhite, globalStyles.noMargin])}>
                {paperName}
              </p>
            </div>
          </div>
        </Tooltip>
      </Grid>
    )
  }
  /*
  <Popover
    open={true}
    anchorEl={this.state.anchorEl}
    onRequestClose={() => {
    }}
  >
    <div>
      hasdajhsdbaj
    </div>
  </Popover>
  */
  renderCount({ count, pricePerCard }) {
    return (
      <div style={combineStyles([globalStyles.cont100, globalStyles.center, { borderBottomColor: colors.grey, borderBottomStyle: 'solid', borderBottomWidth: 1 }])}>
        <div style={combineStyles([globalStyles.cont60, globalStyles.center, { justifyContent: 'flex-start', paddingLeft: 10 }])} onClick={() => {
          this.setState({ count, pricePerCard })
        }}>
          <Checkbox
            checked={(this.state.count === count)}
          />
          <p style={combineStyles([globalStyles.text14, globalStyles.textBold5, globalStyles.noMargin])}>
            {count} cards
          </p>
        </div>
        <div style={combineStyles([globalStyles.cont40, globalStyles.center, { paddingRight: 10, justifyContent: 'flex-end' }])} onClick={() => {
          this.setState({ count, pricePerCard })
        }}>
          <p style={combineStyles([globalStyles.text14, globalStyles.textBold5, globalStyles.textRight, globalStyles.noMargin])}>
            ${pricePerCard} per card
          </p>
        </div>
      </div>
    )
  }
  renderSummary(cartItem) {
    const { imgURI, templateId, removedLogo } = cartItem
    const { userId } = this.props
    const { paperName } = this.state
    const count = this.state.count || 0
    const pricePerCard = this.state.pricePerCard || 0
    const subTotal = count * pricePerCard
    const tax = 0.0875 * subTotal
    const total = subTotal + tax
    return (
      <div style={{ width: "100%", height: "100%", padding: "5%", marginTop: "5%", backgroundColor: colors.veryLightGrey, boxShadow: '0px 0px 5px #a2a2a2' }}>
        <div style={combineStyles([globalStyles.widthFull, globalStyles.center, { padding: "5%" }])}>
          <p style={combineStyles([globalStyles.textMid, globalStyles.textBold5])}>Order Summary</p>
        </div>
        <Divider />
        <div style={{ width: "90%", padding: "5%" }}>
          <img src={imgURI} style={{ width: '100%', height: 'auto' }}/>
          <div style={combineStyles([globalStyles.cont100, { marginTop: 10 }])}>
            <p style={combineStyles([globalStyles.text14, globalStyles.textBold5, globalStyles.noMargin])}>
              {paperName || ''}
            </p>
            <p style={combineStyles([globalStyles.text14, globalStyles.textBold5, globalStyles.noMargin])}>
              {count} cards
            </p>
            <SummaryRow text1="Subtotal:" text2={`$${subTotal.toFixed(2)}`} />
            <SummaryRow text1="Tax:" text2={`$${tax.toFixed(2)}`} />
            <Divider />
            <SummaryRow text1="Total:" text2={`$${total.toFixed(2)}`} />
          </div>
        </div>
        {
          userId && cartItem ?
            <div style={{ width: "100%", marginTop: "10%", marginBottom: '10%' }}>
              <Button
                style={{ width: '100%', backgroundColor: colors.brandColor }}
                onClick={() => {
                  const { paperName, count } = this.state
                  if (paperName) {
                    if (count) {
                      this.props.history.push("/shop/checkout/")
                    } else {
                      this.props.doUpdateAlert('Please, choose a  count!')
                    }
                  } else {
                    this.props.doUpdateAlert('Please, choose a paper type!')
                  }
                }}
              >
                <div style={combineStyles([{ width: '100%', height: "100%", backgroundColor: colors.brandColor }, globalStyles.center])}>
                  <p style={combineStyles([globalStyles.textWhite, globalStyles.textSmall])}>
                    Add to cart
                  </p>
                </div>
              </Button>
            </div>
            :
            null
        }
        <div style={{ width: "100%", marginTop: "10%", marginBottom: '10%' }}>
          <Button
            style={combineStyles([{ width: '100%', backgroundColor: "white" }, globalStyles.borderGrey])}
            onClick={() => {
              this.props.history.push("/editor/")
            }}
          >
            <div style={combineStyles([{ width: '100%', height: "100%", padding: "2.5%" }, globalStyles.center])}>
              <p style={combineStyles([globalStyles.textSmall, globalStyles.textBold5])}>
                Continue Editing
              </p>
            </div>
          </Button>
        </div>
      </div>
    )
  }
  renderSumRow(text1, text2, highLighted) {
    return (
      <div style={combineStyles([{width: "100%", height: "100%", paddingTop: '2.5%', paddingBottom: '2.5%'}, globalStyles.flex, globalStyles.row])}>
        <div style={{width: "70%"}}>
          <p style={combineStyles([{textAlign: "left"}, globalStyles.textSmall, globalStyles.textGrey, globalStyles.noMargin, highLighted ? {color: colors.brandColor}: {}])}>{text1}</p>
        </div>
        <div style={{width: "30%"}}>
          <p style={combineStyles([{textAlign: "right"}, globalStyles.textSmall, globalStyles.textGrey, globalStyles.textNormal, globalStyles.noMargin, highLighted ? {color: colors.brandColor}: {}])}>{text2}</p>
        </div>
      </div>
    )
  }

  render() {
    const { history } = this.props
    return (
      <div>
        {this.renderMain()}
      </div>
    )
  }
}

const MeteorLandingPage = createContainer(() => {
  const cartItem = {
    userId: '',
    templateId: 'temp1',
    createdAt: new Date(),
    removedLogo: false,
    imgURI: 'https://marketplace.canva.com/MAB-wrVVWE8/4/0/thumbnail_large/canva-purple-graffiti-artist-business-card-MAB-wrVVWE8.jpg',
  }
  return {
    loggingIn: Meteor.loggingIn(),
    userId: 'user1',
    cartItem: cartItem,
  }
}, CartPage)


const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateAlert: (alertMessage) => {
      dispatch(updateAlert(alertMessage))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeteorLandingPage);
