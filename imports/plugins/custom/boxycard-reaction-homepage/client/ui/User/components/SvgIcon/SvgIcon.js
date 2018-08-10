import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASE_PATH = '/images/assets/icons';

class SvgIcon extends Component {
  getFilePath() {
    switch (this.props.name) {
      case 'center-to-side': return '/images/editorImages/btn_center_page.png'; // TODO get svg
      case 'rotate': return `${BASE_PATH}/rotate.svg`;
      case 'flip-horizontal': return `${BASE_PATH}/flip-horizontal.svg`;
      case 'flip-vertical': return `${BASE_PATH}/flip-vertical.svg`;
      case 'bring-forward': return `${BASE_PATH}/bring-forward.svg`;
      case 'send-backwards': return `${BASE_PATH}/send-backwards.svg`;
      case 'duplicate': return `${BASE_PATH}/duplicate.svg`;
      case 'opacity': return `${BASE_PATH}/opacity.svg`;
      case 'remove': return `${BASE_PATH}/remove.svg`;
      case 'undo': return `${BASE_PATH}/undo.svg`;
      case 'crop': return `${BASE_PATH}/crop.svg`;
      case 'stroke': return `${BASE_PATH}/stroke.svg`;
      case 'smile': return `${BASE_PATH}/smile.svg`;
      case 'qr': return `${BASE_PATH}/qr.svg`;
      case 'upload': return `${BASE_PATH}/upload.svg`;
      case 'library': return `${BASE_PATH}/library.svg`;
      case 'back': return `${BASE_PATH}/back.svg`;
      case 'camera': return `${BASE_PATH}/camera.svg`;
      case 'text': return `${BASE_PATH}/text.svg`;
      case 'background': return `${BASE_PATH}/background.svg`;
      case 'hire': return `${BASE_PATH}/hire.svg`;
      case 'shadow': return `${BASE_PATH}/shadow.svg`;
      case 'cover': return `${BASE_PATH}/cover.svg`;
      case 'filters': return `${BASE_PATH}/filters.svg`;
      default: return '';
    }
  }

  render() {
    const { size } = this.props;

    return (
      <img
        style={{
          fill: 'currentcolor',
          height: `${size}em`,
          width: `${size}em`,
          verticalAlign: 'middle',
        }}
        src={this.getFilePath()}
      />
    );
  }
}

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
}

SvgIcon.defaultProps = {
  size: 0.8,
}

export default SvgIcon;
