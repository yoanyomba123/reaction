import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './styles.css'
import StickyDiv from 'react-stickynode';

const rotationAngleDefault = 35

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0,
      rotationAngle: rotationAngleDefault
    }
    this._isMounted = false
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    this._isMounted = true
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(e) {
    const oldScrollY = this.state.scrollY
    const newScrollY = window.pageYOffset
    this.setState({ scrollY: newScrollY })
    const cubeCont = document.getElementById('cubeCont')
    const cubeOffset = cubeCont.getBoundingClientRect()
    const cubeTop = cubeOffset.top
    if (cubeTop < 80) {
      const delta = oldScrollY - newScrollY
      console.log(delta)
      const rotationAngleCurrent = this.state.rotationAngle
      const rotationAngleNew = rotationAngleCurrent + 0.5 * delta
      this.setState({ rotationAngle: rotationAngleNew })
    }

  }
  render() {
    const { rotationAngle } = this.state
    return (
      <div style={styles}>
        <Hello name="CodeSandbox" />
        <h2>Start editing to see some magic happen {'\u2728'}</h2>
        <StickyDiv>
          <div id='cubeCont' className="container">
            <div className="scene">
              <div
                className="cube"
                style={{
                  position: 'relative',
                  width: 200,
                  height: 200,
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(-15deg) rotateY(${rotationAngle}deg)`
                }}
              >
                <div className="side left"></div>
                <div className="side right"></div>
                <div className="side front">FRONT</div>
                <div className="side back">BACK</div>
              </div>
            </div>
          </div>
        </StickyDiv>
        <div style={{ height: 1500 }}>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
