'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ModalCore extends React.Component {
    constructor(props) {
        super(props);

        this.body = document.querySelector('body');
        this.mutation = null;
        this.classes = {
            body: 'has-modal'
        }
    }

    componentDidMount() {
        // console.info('modal - componentDidMount');
        this._scrollPositionSave();
        this._bodyClassSet();
        window.addEventListener('resize', this._handleResize);
        this._handleResize();
        this._mutationObserve();
    }

    componentWillUnmount() {
        // console.info('modal - componentWillUnmount');
        this._bodyClassUnset();
        this._scrollPositionLoad();
        this._mutationDisconnect();
        window.removeEventListener('resize', this._handleResize);
    }

    render() {
        // console.info('modal - render');
        let title;
        if (this.props.title) {
            title = <div className="modal__header"><h2 className="modal__title">{this.props.title}</h2></div>
        }

        return (
            <div className={`modal ${this.props.id}`} data-modal="close">
                <div className="modal__wrapper">
                    {title}
                    <div className="modal__body">
                        {React.cloneElement(this.props.children, {data: this.props})}
                    </div>
                    <i className="modal__close" data-modal="close" aria-label="close">&#215;</i>
                </div>
            </div>
        );
    }

    _mutationObserve() {
        // console.info('modal - _mutationObserve');
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        const modal = document.querySelector('.modal');

        this.mutation = new MutationObserver((mutations) => {
            this._mutationObserved();
        });

        this.mutation.observe(modal, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }

    _mutationObserved() {
        // console.info('modal - _mutationObserved');
        this._handleResize();
    }

    _mutationDisconnect() {
        // console.info('modal - _mutationDisconnect');
        if (this.mutation) this.mutation.disconnect();
    }

    _handleResize() {
        // console.info('modal - _handleResize');
        let windowHeight = window.innerHeight;
        let modal = document.querySelector('.modal');
        let modalWrapper = document.querySelector('.modal .modal__wrapper');
        let modalHeight = parseInt(modalWrapper.offsetHeight);
        let offset = 100;

        if (windowHeight - offset < modalHeight) {
            if (modal.style.alignItems !== 'flex-start') modal.style.alignItems = 'flex-start';
        } else {
            if (modal.style.alignItems !== 'center') modal.style.alignItems = 'center';
        }
    }

    _bodyClassSet() {
        // console.info('modal - _bodyClassSet');
        this.body.classList.add(this.classes.body);
    }

    _bodyClassUnset() {
        // console.info('modal - _bodyClassUnset');
        this.body.classList.remove(this.classes.body);
    }

    _scrollPositionSave() {
        // console.info('modal - _scrollPositionSave');
        this.body.setAttribute('data-modalBodyScrollPosition', window.pageYOffset);
    }

    _scrollPositionLoad() {
        // console.info('modal - _loadScrollPosition');
        window.scrollTo(window.pageYOffset, this.body.getAttribute('data-modalBodyScrollPosition'));
    }
};

export default ModalCore;
