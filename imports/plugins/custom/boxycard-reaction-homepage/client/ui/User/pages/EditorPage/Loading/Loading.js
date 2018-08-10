import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

class Loading extends Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                left: 0,
                top: 0
            }}>
                <CircularProgress size={100} />
            </div>
        );
    }
}

export default Loading;