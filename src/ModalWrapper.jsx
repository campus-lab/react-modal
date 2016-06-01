'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Closest from '@aneves/js-closest';

class ModalWrapper extends React.Component {
    constructor(props) {
        super(props);

        // pre-binding
        this._handleClick = this._handleClick.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentWillUnmount() {
        this._unsetClickEvent();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open === this.props.open) return false;
        if (!this.props.onWindowClick) return false;
        this._setClickEvent();
    }

    render() {
        this._setClickEvent();
        if (!this.props.open) return null;
        return <Modal {...this.props} data={this.props.data} />;
    }

    _setClickEvent() {
        // console.info('flyout - _setClickEvent');
        setTimeout(() => {
            let modal = document.querySelector('.modal');
            if (modal) {
                modal.addEventListener('click', this._handleClick);
                window.addEventListener('keydown', this._handleKeyDown);
            }
        }, 0);
    }

    _unsetClickEvent() {
        // console.info('flyout - _unsetClickEvent');
        let modal = document.querySelector('.modal');
        if (modal) {
            modal.removeEventListener('click', this._handleClick);
            window.addEventListener('keydown', this._handleKeyDown);
        }
    }

    _handleClick(e) {
        const aTrigger = Closest(e.target, 'tag', 'a');

        if (e.target.getAttribute('data-modal') === 'close') this.props.onWindowClick();
        if (aTrigger && aTrigger.getAttribute('data-modal') === 'keepopen') return false;
        if (aTrigger) this.props.onWindowClick();
    }

    _handleKeyDown(e) {
        if (e.keyCode === 27) this.close();
    }
}

ModalWrapper.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    open: React.PropTypes.bool
};

ModalWrapper.defaultProps = {
    title: '',
    open: false
};

export default ModalWrapper;
