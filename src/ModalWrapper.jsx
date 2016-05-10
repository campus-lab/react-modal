'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

class ModalWrapper extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        // pre-binding
        this._handleClick = this._handleClick.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentWillUnmount() {
        this._toggleEvents();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open === this.props.open) return false;
        if (!this.props.onWindowClick) return false;
        this._toggleEvents();
    }

    render() {
        this._toggleEvents();
        if (!this.props.open) return null;
        return <Modal {...this.props} data={this.props.data} />;
    }

    _toggleEvents() {
        if (this.props.open) {
            setTimeout(() => {
                let modal = document.querySelector('.modal');
                if (modal) {
                    modal.addEventListener('click', this._handleClick);
                    window.addEventListener('keydown', this._handleKeyDown);
                }
            }, 0);
        } else {
            let modal = document.querySelector('.modal');
            if (modal) {
                modal.removeEventListener('click', this._handleClick);
                window.addEventListener('keydown', this._handleKeyDown);
            }
        }
    }

    _handleClick(e) {
        const aTrigger = this._closest(e.target, 'tag', 'a');

        if (e.target.getAttribute('data-modal') === 'close') this.props.onWindowClick();
        if (aTrigger && aTrigger.getAttribute('data-modal') === 'keepopen') return false;
        if (aTrigger) this.props.onWindowClick();
    }

    _handleKeyDown(e) {
        if (e.keyCode === 27) this.close();
    }

    _closest(el, findBy, findValue) {
        if (!el) return false;

        let value;

        if (el.tagName.toLowerCase() === 'body') return null;

        if (findBy === 'class') value = el.className;
        if (findBy === 'id') value = el.id;
        if (findBy === 'tag') value = el.tagName.toLowerCase();

        if (value === findValue) return el; // found
        return this._closest(el.parentNode, findBy, findValue); // not found, recurse
    }
}

ModalWrapper.propTypes = {
    id: React.PropTypes.string.isRequired,
    options: React.PropTypes.object
};

ModalWrapper.defaultProps = {
    id: null,
    options: null
};

export default ModalWrapper;
