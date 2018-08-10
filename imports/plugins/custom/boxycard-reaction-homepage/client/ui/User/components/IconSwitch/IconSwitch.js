import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

class IconSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: props.isActive,
    }
  }

  handleOnClick() {
    const isActive = !this.state.isActive;

    if (!this.props.isStatic) {
      this.setState({
        isActive,
      });
    }

    this.props.onChange(isActive)
  }

  render() {
    const { disabled, children, rotate, isStatic, isActive, ...props } = this.props;
    const opacity = disabled ? 0.5 : 1;

    return (
      <IconButton
        onClick={this.handleOnClick.bind(this)}
        color={this.state.isActive ? 'secondary' : undefined}
        style={rotate ? {
          transform: `rotate(${rotate}deg)`,
          opacity,
        } : {
          opacity,
        }}
        disabled={disabled}
        {...props}
      >
        {children}
      </IconButton>
    );
  }
}

IconSwitch.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  isStatic: PropTypes.bool,
  rotate: PropTypes.number,
  disabled: PropTypes.bool,
}

export default IconSwitch;
