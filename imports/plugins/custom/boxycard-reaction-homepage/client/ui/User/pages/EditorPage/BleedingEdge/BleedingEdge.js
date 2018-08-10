import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class BleedingEdge extends PureComponent {
  render() {
    const { bleedingEdge, canvasHeight, canvasWidth, isEditorMode } = this.props;
    const blueMaskParts = [{
      // left
      width: bleedingEdge,
      height: (canvasHeight - (bleedingEdge * 2)),
      left: 0,
      top: bleedingEdge,
    },
    {
      // right
      width: bleedingEdge - (isEditorMode ? 1 : 2) - 1,
      height: (canvasHeight - (bleedingEdge * 2)),
      right: 0,
      top: bleedingEdge,
    },
    {
      // top
      width: canvasWidth - 2,// + 6,
      height: bleedingEdge,
      left: 0,
      top: 0,
    },
    {
      // bottom
      width: canvasWidth - 2,// + 6,
      height: bleedingEdge - 1.5,
      left: 0,
      bottom: 0,
    }];
    let maskStyle = { backgroundColor: '#74BDDD', opacity: 0.5, position: 'absolute' };

    if (!isEditorMode) {
      maskStyle = { ...maskStyle, backgroundColor: '#fff', opacity: 1 };
    }

    return (
      <div style={{ width: canvasWidth - 2, border: isEditorMode ? '2px solid' : '2px solid #fff', height: canvasHeight - 2, position: 'absolute', zIndex: 9, pointerEvents: 'none', marginTop: 0 }}>
        {blueMaskParts.map(({ width, height, top, right, bottom, left }, index) => (
          <div key={index} style={{ ...maskStyle, width, height, top, right, left, bottom }} />
        ))}
        <div style={{ width: canvasWidth - (bleedingEdge * 2) /*+ 6*/, height: canvasHeight - (bleedingEdge * 2) /*+ 2*/, padding: bleedingEdge }}>
          <div id="bleed-area" style={{ width: 'calc(100% - 2px)', height: canvasHeight - (bleedingEdge * 2) - 2, border: `1px ${isEditorMode ? 'dashed' : 'solid'} #333333` }}>
            {[1, 2, 3].map(key => <div key={key} style={{ display: 'inline-block', height: canvasHeight - (bleedingEdge * 2), borderRight: '1px dashed #DBDBDB', marginLeft: -1, width: ((canvasWidth - (bleedingEdge * 2)) / 4)}} />)}
          </div>
        </div>
      </div>
    );
  }
}

BleedingEdge.propTypes = {
  bleedingEdge: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  isEditorMode: PropTypes.bool.isRequired,
}
