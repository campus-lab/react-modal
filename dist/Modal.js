'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalCore = function (_React$Component) {
    _inherits(ModalCore, _React$Component);

    function ModalCore(props) {
        _classCallCheck(this, ModalCore);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModalCore).call(this, props));

        _this.body = document.querySelector('body');
        _this.mutation = null;
        _this.classes = {
            body: 'has-modal'
        };
        return _this;
    }

    _createClass(ModalCore, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // console.info('modal - componentDidMount');
            this._scrollPositionSave();
            this._bodyClassSet();
            window.addEventListener('resize', this._handleResize);
            this._handleResize();
            this._mutationObserve();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // console.info('modal - componentWillUnmount');
            this._bodyClassUnset();
            this._scrollPositionLoad();
            this._mutationDisconnect();
            window.removeEventListener('resize', this._handleResize);
        }
    }, {
        key: 'render',
        value: function render() {
            // console.info('modal - render');
            var title = this.props.title ? this.props.title : this.props.data.title ? this.props.data.title : false;
            if (title) title = _react2.default.createElement(
                'div',
                { className: 'modal__header' },
                _react2.default.createElement(
                    'h2',
                    { className: 'modal__title' },
                    title
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'modal ' + this.props.id, 'data-modal': 'close' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal__wrapper' },
                    title,
                    _react2.default.createElement(
                        'div',
                        { className: 'modal__body' },
                        _react2.default.cloneElement(this.props.children, { data: this.props })
                    ),
                    _react2.default.createElement(
                        'i',
                        { className: 'modal__close', 'data-modal': 'close', 'aria-label': 'close' },
                        '×'
                    )
                )
            );
        }
    }, {
        key: '_mutationObserve',
        value: function _mutationObserve() {
            var _this2 = this;

            // console.info('modal - _mutationObserve');
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var modal = document.querySelector('.modal');

            this.mutation = new MutationObserver(function (mutations) {
                _this2._mutationObserved();
            });

            this.mutation.observe(modal, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });
        }
    }, {
        key: '_mutationObserved',
        value: function _mutationObserved() {
            // console.info('modal - _mutationObserved');
            this._handleResize();
        }
    }, {
        key: '_mutationDisconnect',
        value: function _mutationDisconnect() {
            // console.info('modal - _mutationDisconnect');
            if (this.mutation) this.mutation.disconnect();
        }
    }, {
        key: '_handleResize',
        value: function _handleResize() {
            // console.info('modal - _handleResize');
            var windowHeight = window.innerHeight;
            var modal = document.querySelector('.modal');
            var modalWrapper = document.querySelector('.modal .modal__wrapper');
            var modalHeight = parseInt(modalWrapper.offsetHeight);
            var offset = 100;

            if (windowHeight - offset < modalHeight) {
                if (modal.style.alignItems !== 'flex-start') modal.style.alignItems = 'flex-start';
            } else {
                if (modal.style.alignItems !== 'center') modal.style.alignItems = 'center';
            }
        }
    }, {
        key: '_bodyClassSet',
        value: function _bodyClassSet() {
            // console.info('modal - _bodyClassSet');
            this.body.classList.add(this.classes.body);
        }
    }, {
        key: '_bodyClassUnset',
        value: function _bodyClassUnset() {
            // console.info('modal - _bodyClassUnset');
            this.body.classList.remove(this.classes.body);
        }
    }, {
        key: '_scrollPositionSave',
        value: function _scrollPositionSave() {
            // console.info('modal - _scrollPositionSave');
            this.body.setAttribute('data-modalBodyScrollPosition', window.pageYOffset);
        }
    }, {
        key: '_scrollPositionLoad',
        value: function _scrollPositionLoad() {
            // console.info('modal - _loadScrollPosition');
            window.scrollTo(window.pageYOffset, this.body.getAttribute('data-modalBodyScrollPosition'));
        }
    }]);

    return ModalCore;
}(_react2.default.Component);

;

exports.default = ModalCore;
