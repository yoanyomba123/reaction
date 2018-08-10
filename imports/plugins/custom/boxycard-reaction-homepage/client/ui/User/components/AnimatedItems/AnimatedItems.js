import './AnimatedItems.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

class AnimatedItems extends Component {
    state = { items: [] };

    componentDidMount () {
        this.addItem();
    }

    componentWillUnmount () {
        this.setState({
            items: []
        });
    }

    componentWillReceiveProps (newProps) {
        if (newProps.items.length && this.props.animateOnUpdate && this.state.items.length) {
            const areEqual = !newProps.items.some((item, index) => item !== this.props.items[index]) && newProps.items.length === this.props.items.length;

            if (!areEqual) {
                this.setState({
                    items: []
                }, () => this.addItem());
            }
        }
    }

    addItem (index = 0) {
        const {items} = this.state;

        if (items.length < this.props.items.length) {
            this.setState({
                items: [...items, this.props.items[index]]
            }, () => {
                setTimeout(() => this.addItem(index + 1), this.props.interval);
            });
        }
    }

    render() {
        const {items, itemRenderer, transition, interval, ...props} = this.props;

        return (
            <CSSTransitionGroup
                transitionName={`animated-items-${transition}`}
                transitionAppear={false}
                transitionLeave={false}
                transitionEnterTimeout={500}
                transitionEnter={true}
                {...props}
            >
                {itemRenderer ? this.state.items.map(itemRenderer) : this.state.items.map((item, index) => <span key={index}>{item}</span>)}
            </CSSTransitionGroup>
        );
    }
}

AnimatedItems.propTypes = {
    items: PropTypes.array.isRequired,
    itemRenderer: PropTypes.func,
    animateOnUpdate: PropTypes.bool,
    interval: PropTypes.number,
    transition: PropTypes.oneOf([
        'zoom', 'fade-in'
    ])
}

AnimatedItems.defaultProps = {
    interval: 200,
    transition: 'zoom'
}

export default AnimatedItems;