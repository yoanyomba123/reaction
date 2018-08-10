import './ColorPicker.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import COLORS from './colors';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: props.value,
    }

    this.open = this.open.bind(this);
  }

  open(left, top) {
    this.setState({
      isOpen: true
    })

    setTimeout(() => {
      if (left && top) {
        document.querySelector('.bc-color-picker').style.left = left + 'px';
        document.querySelector('.bc-color-picker').style.top = top + 'px';
      }
    }, 50);
  }

  handleOnChange(event) {
    const value = event.target.value;

    this.setState({
      value,
    });

    this.props.onChange(value);
  }

  renderColorBox(backgroundColor, multiplier = 1) {
    const colorInfo = COLORS.find(color => color.rgb === backgroundColor);

    return (
      <span>
        <span style={{ paddingLeft: 10, width: 15 * multiplier, height: 15 * multiplier, backgroundColor, borderRadius: 3 }} />
        {colorInfo && multiplier === 1 ? (
          <span>
            <strong style={{ paddingRight: 5, paddingLeft: 5 }}>C:</strong> {colorInfo.cymk.c}
            <strong style={{ paddingRight: 5, paddingLeft: 5 }}>Y:</strong> {colorInfo.cymk.y}
            <strong style={{ paddingRight: 5, paddingLeft: 5 }}>M:</strong> {colorInfo.cymk.m}
            <strong style={{ paddingRight: 5, paddingLeft: 5 }}>K:</strong> {colorInfo.cymk.k}
          </span>
        ) : null}
      </span>
    );
  }

  handleOnToggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { label, name, trigger } = this.props;
    const options = COLORS.map(color => color.rgb);
    const select = (
      <Select
        value={this.state.value}
        renderValue={this.renderColorBox.bind(this)}
        onChange={this.handleOnChange.bind(this)}
        inputProps={{
          name,
          id: name
        }}
        MenuProps={{
          classes: { paper: 'bc-color-picker' }
        }}
        open={this.state.isOpen}
        onClose={this.handleOnToggleModal.bind(this)}
        onOpen={this.handleOnToggleModal.bind(this)}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index} classes={{ root: 'bc-color-picker-item' }}>
            {this.renderColorBox(option, 2)}
          </MenuItem>
        ))}
      </Select>
    );

    return trigger ? (
        <div style={{ margin: 0, padding: 0, width: '100%' }}>
          {trigger}
          <span style={{display: 'none'}}>
            {select}
          </span>
        </div>
     ) : (
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {select}
      </FormControl>
    );
  }
}

ColorPicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  trigger: PropTypes.node
}

export default ColorPicker;
