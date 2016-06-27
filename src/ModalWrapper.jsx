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
        // console.info('modal - componentWillUnmount');
        this._unsetClickEvent();
        if (this.props.onModalUnmount) this.props.onModalUnmount();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.info('modal - componentDidUpdate');
        if (prevProps.open === this.props.open) return false;
        if (!this.props.onWindowClick) return false;
        this._setClickEvent();
    }

    render() {
        // console.info('modal - render');
        this._setClickEvent();
        if (!this.props.open) return null;
        return <Modal {...this.props} data={this.props.data} />;
    }

    _setClickEvent() {
        // console.info('modal - _setClickEvent');
        setTimeout(() => {
            let modal = document.querySelector('.modal');
            if (modal) {
                modal.addEventListener('click', this._handleClick);
                window.addEventListener('keydown', this._handleKeyDown);
            }
        }, 0);
    }

    _unsetClickEvent() {
        // console.info('modal - _unsetClickEvent');
        let modal = document.querySelector('.modal');
        if (modal) {
            modal.removeEventListener('click', this._handleClick);
            window.addEventListener('keydown', this._handleKeyDown);
        }
    }

    _handleClick(e) {
        // console.info('modal - _handleClick');

        // data-modal === close
        if (e.target.getAttribute('data-modal') === 'close') {
            if (e.target.classList.contains('modal') && !this.props.closeOnBackdrop) return;
            this._close();
            return;
        }

        // <a> clicks
        const aTrigger = Closest(e.target, 'tag', 'a');
        if (aTrigger) {
            if (aTrigger.getAttribute('data-modal') === 'keepopen') return;

            setTimeout(() => {
                // let react behave normally and then close the modal
                this.props.onWindowClick();
            }, 0);
        }
    }

    _handleKeyDown(e) {
        // console.info('modal - _handleKeyDown');
        if (e.keyCode === 27) this._close();
    }

    _close() {
        // console.info('modal - _close');
        if (this.props.onModalClose) this.props.onModalClose();
        this.props.onWindowClick(); 
    }
}

ModalWrapper.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    open: React.PropTypes.bool,
    onModalClose: React.PropTypes.func,
    onModalUnmount: React.PropTypes.func,
    closeOnBackdrop: React.PropTypes.bool
};

ModalWrapper.defaultProps = {
    title: null,
    open: false,
    onModalClose: null,
    onModalUnmount: null
    closeOnBackdrop: true
};

export default ModalWrapper;
