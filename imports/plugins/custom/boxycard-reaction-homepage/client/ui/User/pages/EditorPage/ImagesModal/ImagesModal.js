import './ImagesModal.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import MdSearch from 'react-icons/lib/md/search';

import globalStyles from '../../../../../config/globalStyles';
import AnimatedItems from '../../../components/AnimatedItems/AnimatedItems';

const sources = {
  images: ['clipart/svg/cute_bird_one.svg', 'clipart/svg/cute_bird_two.svg', 'clipart/svg/yoga.svg'],
  backgrounds: ['background/svg/blue.svg', 'background/svg/moon.svg', 'background/svg/heart.svg']
};

class ImagesModal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: props.open,
      term: ''
    }

    this.handleOnClose = this.handleOnClose.bind(this);
    // this.open = this.open.bind(this);
  }

  open() {
    this.setState({
      open: true
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.open !== newProps.open) {
      debugger
      this.setState({
        open: newProps.open
      });
    }
  }

  handleOnClose () {
    this.setState({
      open: false
    });
  }

  handleOnClick (imgName) {
    debugger
    this.props.onClick(imgName);

    this.handleOnClose();
  }

  renderImage(imgName) {
    debugger
    return (
      <div
        className='image-modal-item'
        style={{...globalStyles.flex, ...globalStyles.center, height: 120, marginLeft: 5, marginRight: 5}}
        onClick={() => this.handleOnClick(imgName)}
      >
        <img src={'/images/assets/' + imgName} style={{ height: 100, width: 'auto' }} />
      </div>
    );
  }

  render() {
    const {term} = this.state;
    let items = sources[this.props.kind];

    if (term)
      items = items.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) !== -1);

    return (
      <Dialog
        open={!!this.state.open}
        onRequestClose={this.handleOnClose}
        >
        <DialogTitle>
          {this.props.kind === 'images' ? 'Image Library' : 'Background Library'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Search...</InputLabel>
            <Input
            id="adornment-password"
            type="text"
            value={this.state.name}
            onChange={e => {
              this.setState({
                term: e.target.value
              });
            }}
            endAdornment={
              <InputAdornment position="end">
              <MdSearch />
              </InputAdornment>
            }
            fullWidth
            />
          </FormControl>
          <div style={{height: '20px'}} />
          <div style={{...globalStyles.flex, ...globalStyles.row, flexWrap: 'wrap'}}>
            {items.map(function(imgName, index) {
              {return this.renderImage(imgName)}
            }.bind(this))}
          </div>
    </DialogContent>

    <DialogActions>
      <Button
      onClick={this.handleOnClose}
      color="primary"
      autoFocus
      >
        Close
      </Button>
      </DialogActions>
    </Dialog>
    );
  }
}

ImagesModal.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  kind: PropTypes.oneOf(['images', 'backgrounds'])
}

ImagesModal.defaultProps = {
  open: false,
  kind: 'images'
}

export default ImagesModal;
