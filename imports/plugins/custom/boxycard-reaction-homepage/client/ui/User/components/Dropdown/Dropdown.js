import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: props.value,
    }

    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    this.setState({
      value,
    });
  }

  handleOnChange(event) {
    const value = event.target.value;

    this.setState({
      value,
    });

    this.props.onChange(value);
  }

  renderItem(option, index) {
    const { transform } = this.props;
    let value = startCase(option);

    if (transform) {
      value = transform(value);
    }

    return <MenuItem value={option} key={index}>{value}</MenuItem>;
  }

  render() {
    const { nullable, options, label, name } = this.props;

    return (
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          value={this.state.value}
          onChange={this.handleOnChange.bind(this)}
          inputProps={{
            name,
            id: name,
          }}
        >
          {nullable ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : null}
          {options.map(this.renderItem.bind(this))}
        </Select>
      </FormControl>
    );
  }
}

Dropdown.propTypes = {
  name: PropTypes.string,
  nullable: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  transform: PropTypes.func,
}

export default Dropdown;
