import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MdZoomIn from 'react-icons/lib/md/zoom-in';
import MdZoomOut from 'react-icons/lib/md/zoom-out';
import MdResetZoom from 'react-icons/lib/md/youtube-searched-for';

class ZoomableZone extends Component {
    state = { zoom: 1 };

    handleOnZoomIn () {
        const {zoom} = this.state;

        if (zoom < this.props.max)
            this.setState({
                zoom: zoom + 0.1
            });
    }

    handleOnZoomOut () {
        const {zoom} = this.state;

        if (zoom > this.props.min)
            this.setState({
                zoom: zoom - 0.1
            });
    }

    handleOnResetZoom () {
        const {zoom} = this.state;

        if (zoom > this.props.min)
            this.setState({
                zoom: 1
            });
    }

    render() {
        const {zoom} = this.state;
        const {width, height, min, max} = this.props;

        return (
            <section>
                <div style={{width, height, overflow: 'auto'}}>
                    <div style={{transform: `scale(${zoom})`, transformOrigin: '0 0'}}>
                        {this.props.children}
                    </div>
                </div>
                <div style={styles.controls}>
                    <IconButton disabled={zoom === max} onClick={this.handleOnZoomIn.bind(this)}>
                        <MdZoomIn />
                    </IconButton>
                    <IconButton disabled={zoom === 1} onClick={this.handleOnResetZoom.bind(this)}>
                        <MdResetZoom />
                    </IconButton>
                    <IconButton disabled={zoom === min} onClick={this.handleOnZoomOut.bind(this)}>
                        <MdZoomOut />
                    </IconButton>
                    <span style={styles.zoom}>
                        {parseInt(zoom * 100)}%
                    </span>
                </div>
            </section>
        );
    }
}

const styles = {
    controls: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
        //left: 0,
        //bottom: 0
    },
    zoom: {
        display: 'inline',
        verticalAlign: 'middle',
        color: '#484848'
    }
}

ZoomableZone.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
}

ZoomableZone.defaultProps = {
    min: 1,
    max: 5
}

export default ZoomableZone;