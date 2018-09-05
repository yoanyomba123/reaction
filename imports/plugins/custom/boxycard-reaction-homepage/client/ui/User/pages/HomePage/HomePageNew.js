import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render, ReactDOM } from "react-dom";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
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
import { Motion, spring } from 'react-motion'
import { Redirect } from 'react-router-dom'
import Typekit from 'react-typekit';
import './cube.css'
import './home.css'

const scroll = Scroll.animateScroll;

const elevatorTopDefault = 80

export default class MeteorLandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showElevatorDoor: false,
      elevatorTop: elevatorTopDefault,
      isSticky: false,
      delta: 0,
      stickyOffset: elevatorTopDefault,
      rotationAngle: 0,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleGetStarted= this.handleGetStarted.bind(this)
  }
  componentWillMount() {
    this._isMounted = true
    window.addEventListener("scroll", this.handleScroll);
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
    window.removeEventListener("scroll", this.handleScroll);
  }



  handleGetStarted(e){

    window.location="/editor"
  }



  handleScroll(e) {
    if (this._isMounted) {
      const windowHeight = window.innerHeight
      const cube = document.querySelectorAll('.cube')
      const cubeCont = document.getElementById('cubeCont')
      const cubeOffset = cubeCont.getBoundingClientRect()
      const cubeTop = cubeOffset.top
      let isScrollingUp = false;
      if (this.state.scrollY > window.pageYOffset) {
        isScrollingUp = true
      }
      /* the distance the page moved between scroll event cycles */
      const delta = window.pageYOffset - this.state.scrollY
      /* set the state of scrollY and isScrollingUp */
      this.setState({
        scrollY: window.pageYOffset,
        isScrollingUp,
      })

      // frames

      const frames = document.getElementById('cta-frames')
      const viewportFrames = frames.getBoundingClientRect()
      const framesTop = viewportFrames.top
      const heightFrames = viewportFrames.height
      const mainSides = document.querySelectorAll('.cube .side');

      // if framesTop is negative and within the height of the frames, fade color in/out
      if(framesTop < 0 && !mainSides[0].classList.contains('box-img')) {
        for (var i = 0; i < mainSides.length; ++i) {
           mainSides[i].classList.add('box-img')
        }
      }

      if(framesTop > 0 && mainSides[0].classList.contains('box-img')) {
        for (var i = 0; i < mainSides.length; ++i) {
           mainSides[i].classList.remove('box-img')
        }
      }

      // Wallet

      const card = document.getElementById('cta-card')
      const viewportCard = card.getBoundingClientRect()
      const cardTop = viewportCard.top

      const wallet = document.getElementById('cta-wallet')
      const viewportWallet = wallet.getBoundingClientRect()
      const walletBottom = viewportWallet.bottom
      const walletHeight = viewportWallet.height

      if (cardTop < 0) {
        for (var i = 0; i < cube.length; ++i) {
          cube[i].classList.add('flattened')
        }
      } else {
        for (var i = 0; i < cube.length; ++i) {
          cube[i].classList.remove('flattened')
        }
      }

      if (walletBottom < 0) {
        for (var i = 0; i < cube.length; ++i) {
          cube[i].classList.remove('flattened')
        }
      }


      /* tag with id=imgElevator */
      const imgElevator = document.getElementById('imgElevator')
      /* get dimenstion and locations of imgElevator in the viewport (or screen) */
      const viewportImgElevator = imgElevator.getBoundingClientRect()
      /* get the top location of imgElevator in the viewport */
      const imgElevatorTop = viewportImgElevator.top
      /* get the height of imgElevator */
      const heightElevator = viewportImgElevator.height
      /* element with id=letBoxyCard */
      const letBoxyCard = document.getElementById('letBoxyCard')
      const letBoxyCardPortOffset = letBoxyCard.getBoundingClientRect()
      const currentLetBoxyCardTop = letBoxyCardPortOffset.top
      /* Close the door if "imgElevator" reaches at elevatorTopDefault=80 from the top of the window */
      if (imgElevatorTop <= elevatorTopDefault && !this.state.showElevatorDoor) {
        this.setState({ showElevatorDoor: true })
      } else if (imgElevatorTop > elevatorTopDefault && this.state.showElevatorDoor) {
        this.setState({ showElevatorDoor: false })
      }
      /* if "letBoxyCard" reaches the bottom of "imgElevator", move the elevator to top */
      if (currentLetBoxyCardTop <= heightElevator + elevatorTopDefault) {
        /* start updating stickyOffset of the elevator */
        this.setState({ stickyOffset: this.state.stickyOffset - delta })
        if (this.state.showElevatorDoor) {
          /* Open the door if it's closed */
          this.setState({ showElevatorDoor: false })
        }
      } else {
        /* Else move the "imgElevator" to the original sticky location */
        this.setState({ stickyOffset: elevatorTopDefault })
      }

      if (cubeTop < 80) {
        const rotationAngleNew = this.state.rotationAngle + (0.2 * delta)
        this.setState({ rotationAngle: rotationAngleNew })
      }



      /* Find boxesImg */
      const boxesImg = document.getElementById('boxesImg')
      /* get dimenstion and locations of boxesImg in the viewport (or screen) */
      const viewportImgBoxesImg = boxesImg.getBoundingClientRect()
      /* get the top location of boxesImg in the viewport */
      const boxesImgTop = viewportImgBoxesImg.top
      console.log(boxesImgTop);
      /* get the height of boxesImg */
      const heightBoxesImg = viewportImgBoxesImg.height
      console.log(heightBoxesImg);
      if (boxesImgTop <= (windowHeight / 2) - 80 - (heightBoxesImg * 0.13)) {
        console.log('here');
        this.setState({ cubeOffset: this.state.cubeOffset - delta })
      } else {
        this.setState({ cubeOffset: 0 })
      }
    }
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
    const name = ', Andrea'
    const { rotationAngle } = this.state
    const windowHeight = window.innerHeight
    return (
      <div style={{ backgroundColor: '#eee', width: '100%' }}>
        <Grid container style={{ paddingTop: 250, position: 'relative' }}>
          <img
            src='images/bg/boxy-bg.svg'
            style={{ position: 'absolute', width: '50%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto', top: 0, left: '50%', transform: 'translate(-50%, 0%)', zIndex: 0 }}/>
          <Grid item xs={12} sm={12} md={3} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%', paddingTop: 26, zIndex: 10 }}>
            <div style={{ fontFamily: 'futura-pt', fontSize: 43, fontWeight: 500, color: 'black', paddingRight: 5 }}>
              Hey there{name}.
            </div>
            <div style={{ width: '60%', paddingRight: 5, marginTop: 14, marginBottom: 0 }}>
              <img
                src='images/graphics/cards-with-benefits.png'
                style={{ width: '100%', height: 'auto' }}/>
            </div>
            <div  id="cta-matrix">
              <div>Museum-Quality Prints</div>
              <div>Eight Faces Of Space</div>
              <div>Fits With The Rest In Your Wallet</div>
              <div>Skip A Step In Your Elevator Pitch</div>
              <div>Stack Them!</div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', zIndex: 10 }}>
            <div style={{ width: '100%', padding: 6, backgroundColor: '#f3f3f3' }}>
              <ContainerDimensions>
                { ({ width }) => {
                  return (
                    <ReactPlayer
                      width={width}
                      height={0.58 * width}
                      url='https://www.youtube.com/watch?v=mdVua-_7Ghc&t=151s'
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 0,
                            controls: 0,
                          },
                        },
                        facebook: {
                          appId: '12345'
                        },
                        vimeo: {
                        },
                      }}
                    />
                  )
                }}
              </ContainerDimensions>
            </div>

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

          <Grid item xs={12} sm={3} md={3} lg={4} xl={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingTop: 55, zIndex: 10 }}>
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

        <div id="cta-action">
          <a id="action-block">
            <i className="boxy-click-down"></i>
            <span id="action-string"></span>
            <span id="action-square"></span>
          </a>
        </div>

        <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', alignItems: 'center', width: '100%', zIndex: 50, padding: 0, margin: 0 }}>
          <StickyDiv offsetTop={this.state.cubeOffset}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-center', position: 'relative', width: '100%' }}>
              <div id='cubeCont' className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 200 }}>
                <div className="scene">
                  <div
                    className="cube"
                    style={{
                      position: 'relative',
                      width: 120,
                      height: 120,
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(-15deg) rotateY(${rotationAngle}deg)`
                    }}>
                    <div className="side front"><span className="main"><i>1</i></span></div>
                    <div className="side front-inside"><span><i>5</i></span></div>
                    <div className="side back"><span className="main"><i>2</i></span></div>
                    <div className="side back-inside"><span><i>6</i></span></div>
                    <div className="side right"><span className="main"><i>3</i></span></div>
                    <div className="side right-inside"><span><i>7</i></span></div>
                    <div className="side left"><span className="main"><i>4</i></span></div>
                    <div className="side left-inside"><span><i>8</i></span></div>
                  </div>
                </div>
              </div>
            </div>
          </StickyDiv>
        </Grid>

        <Grid id="cta-frames" container>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
            <div style={{ paddingRight: '47%', zIndex: 50 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', width: '142%', height: '11%', padding: 10, color: 'white', fontSize: '280%', fontWeight: 300, fontFamily: 'Roboto' }}>
                Museum-Quality Prints
              </div>
            </div>
            <img
              className="cta-front"
              src='images/graphics/frames2-fg.png'
              style={{ width: '110%', height: 'auto', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}/>
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
            <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, paddingRight: 160, textAlign: 'center', lineHeight: '1' }}>
              Enables pictures and text on the inside of your card to establish & form your brand identity
            </div>
          </Grid>

          <Grid container id="cta-card">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <div style={{ fontFamily: 'Helevetica+Neue', color: 'black', fontSize: 28, fontWeight: 300, textAlign: 'center', lineHeight: '1', paddingLeft: '40%', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 300 }}>
                Folds from a 3D box figure to a standard size business card
                <p style={{ margin: 0, marginTop: 84 }}>
                  As the patent-pending holder of our 3D business cards, we are proud to be the industry leader.</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 400 }}>
              <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', paddingRight: '30%', textAlign: 'center', lineHeight:'1' }}>
                3.5 x 2 inches
              </div>
            </Grid>

            <Grid container id="cta-wallet">
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <img
                  src='images/graphics/wallet-bg.png'
                  style={{ width: '118%', height: 'auto', zIndex: 10 }}/>
                <img
                  className="cta-front"
                  src='images/graphics/wallet-fg.png'
                  style={{ zIndex: 100, width: '118%', height: 'auto', position: 'absolute', top: 1.8 }}/>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', paddingRight: '20%', justifyContent: 'center', alignItems: 'center', paddingTop: 100, marginLeft: -100 }}>
                  Fits With The Rest
                  <p style={{ margin: 0, marginTop: 1 }}>
                    In Your Wallet</p>
                </div>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: 200 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <div style={{ fontFamily: 'Roboto', fontSize: 42, fontWeight: 700, color: 'black', textAlign: 'center', paddingLeft: '40%', justifyContent: 'flex-start', alignItems: 'center', lineHeight: 1 }}>
                  Skip A Step
                  <p style={{ margin: 0, marginTop: 1 }}>
                    In Your
                  </p>
                  <p style={{ margin: 0, marginTop: 1 }}>
                    Elevator Pitch
                  </p>
                </div>
              </Grid>


              <Grid id="cta-elevator-frame" item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }} onClick={() => {
                this.setState({ showElevatorDoor: !this.state.showElevatorDoor })
                console.log('click')
              }}>
                <StickyDiv offsetTop={this.state.stickyOffset} style={{ zIndex: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 110 }}>
                    <div
                      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: "14.3%", overflow: 'hidden', zIndex: 110 }}>
                      <ContainerDimensions>
                        {
                          ({ width }) => {
                            return (
                              <Motion style={{ x: spring(this.state.showElevatorDoor ? 0 : -width) }}>
                                {({ x }) => {
                                  return (
                                    <img
                                      src='images/graphics/elevator-door-left3-cropped.png'
                                      style={{ width: width, height: 3.52 * width, zIndex: 110, marginTop: 0.57 * width, WebkitTransform: `translate3d(${x}px, 0, 0)`, transform: `translate3d(${x}px, 0, 0)`, opacity: 0 }}
                                    />
                                  )
                                }}
                              </Motion>
                            )
                          }
                        }
                      </ContainerDimensions>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '14.3%', overflow: 'hidden', zIndex: 110 }}>
                      <ContainerDimensions>
                        {
                          ({ width }) => {
                            return (
                              <Motion style={{ x: spring(this.state.showElevatorDoor ? 0 : -width) }}>
                                {({ x }) => {
                                  return (
                                    <img
                                      src='images/graphics/elevator-door-right3-cropped.png'
                                      style={{ width: width, height: 3.52 * width, zIndex: 110, marginTop: 0.57 * width, WebkitTransform: `translate3d(${-x}px, 0, 0)`, transform: `translate3d(${-x}px, 0, 0)`, opacity: 0 }}
                                    />
                                  )
                                }}
                              </Motion>
                            )
                          }
                        }
                      </ContainerDimensions>
                    </div>
                    <img
                      src='images/graphics/elevator-fg2.png'
                      style={{ width: '36%', height: 'auto', position: 'absolute', zIndex: 100 }}
                    />
                    <img
                      id="imgElevator"
                      src='images/graphics/elevator-bg2.png'
                      style={{ width: '36%', height: 'auto', position: 'absolute', zIndex: -100 }}
                    />
                  </div>
                </StickyDiv>
              </Grid>
              <Grid id='cta-elevator-doors' item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative', zIndex: 100, marginTop: "-29.3%" }}>
                <div style={{ width: '50%', position: 'absolute', top: 0 }}>
                  <StickyDiv offsetTop={this.state.stickyOffset} style={{ zIndex: 0, width: '50%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 110 }}>
                      <div
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: "14.3%", overflow: 'hidden', zIndex: 110 }}>
                        <ContainerDimensions>
                          {
                            ({ width }) => {
                              return (
                                <Motion style={{ x: spring(this.state.showElevatorDoor ? 0 : -width) }}>
                                  {({ x }) => {
                                    return (
                                      <img
                                        src='images/graphics/elevator-door-left3-cropped.png'
                                        style={{ width: width, height: 3.52 * width, zIndex: 110, marginTop: 0.57 * width, WebkitTransform: `translate3d(${x}px, 0, 0)`, transform: `translate3d(${x}px, 0, 0)` }}
                                      />
                                    )
                                  }}
                                </Motion>
                              )
                            }
                          }
                        </ContainerDimensions>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '14.3%', overflow: 'hidden', zIndex: 110 }}>
                        <ContainerDimensions>
                          {
                            ({ width }) => {
                              return (
                                <Motion style={{ x: spring(this.state.showElevatorDoor ? 0 : -width) }}>
                                  {({ x }) => {
                                    return (
                                      <img
                                        src='images/graphics/elevator-door-right3-cropped.png'
                                        style={{ width: width, height: 3.52 * width, zIndex: 110, marginTop: 0.57 * width, WebkitTransform: `translate3d(${-x}px, 0, 0)`, transform: `translate3d(${-x}px, 0, 0)` }}
                                      />
                                    )
                                  }}
                                </Motion>
                              )
                            }
                          }
                        </ContainerDimensions>
                      </div>
                    </div>
                  </StickyDiv>
                </div>
              </Grid>
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
                  <div id="letBoxyCard">
                    {'"'}Let Boxy Card
                  </div>
                  <div style={{ margin: 0, marginTop: 1 }}>
                    Speak For You{'"'}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid id="cta-lobby"  container style={{ paddingTop: 600 }}>
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
            <Grid container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <img
                id="boxesImg"
                src='images/graphics/lobby2-bg.png'
                style={{ width: '65%', height: 'auto', zIndex: 10 }}/>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 50, position: 'relative' }}>
                <Button style={styles.button}
                onClick={this.handleGetStarted}
                 >
                  START DESIGNING YOUR BOXY CARD NOW
                </Button>
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
        {this.renderBigMain()}
        <Typekit kitId="igo7pcj" />
      </div>
    )
  }
}




