import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps({value}) {
    if (this.state.value !== value && this.props.value !== value) {
      this.setState({
        value
      });
    }
  }

  handleOnChange(event) {
    const value = event.target.value;

    this.setState({
      value,
    });
    
    this.props.onChange(value);
  }

  render() {
    const { min, max, label, name, width, step, inputOnly } = this.props;
    const input = (
      <input
        style={{ width }}
        type="range"
        value={this.state.value}
        min={min}
        max={max}
        step={step}
        name={name}
        id={name}
        onChange={this.handleOnChange.bind(this)}
      />
    );

    return inputOnly ? input : (
      <FormControl fullWidth={width === '100%'}>
        <label style={{ color: 'rgba(0, 0, 0, 0.54)' }} htmlFor={name}>{label}</label>
        {input}
      </FormControl>
    );
  }
}

Range.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputOnly: PropTypes.bool,
}

Range.defaultProps = {
  min: 0,
  max: 10,
  width: 60,
  step: 1,
}

export default Range;
