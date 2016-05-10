'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalWrapper = function (_React$Component) {
    _inherits(ModalWrapper, _React$Component);

    function ModalWrapper(props) {
        _classCallCheck(this, ModalWrapper);

        // pre-binding

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModalWrapper).call(this, props));

        _this._handleClick = _this._handleClick.bind(_this);
        _this._handleKeyDown = _this._handleKeyDown.bind(_this);
        return _this;
    }

    _createClass(ModalWrapper, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._toggleEvents();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevProps.open === this.props.open) return false;
            if (!this.props.onWindowClick) return false;
            this._toggleEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            this._toggleEvents();
            if (!this.props.open) return null;
            return _react2.default.createElement(_Modal2.default, _extends({}, this.props, { data: this.props.data }));
        }
    }, {
        key: '_toggleEvents',
        value: function _toggleEvents() {
            var _this2 = this;

            if (this.props.open) {
                setTimeout(function () {
                    var modal = document.querySelector('.modal');
                    if (modal) {
                        modal.addEventListener('click', _this2._handleClick);
                        window.addEventListener('keydown', _this2._handleKeyDown);
                    }
                }, 0);
            } else {
                var modal = document.querySelector('.modal');
                if (modal) {
                    modal.removeEventListener('click', this._handleClick);
                    window.addEventListener('keydown', this._handleKeyDown);
                }
            }
        }
    }, {
        key: '_handleClick',
        value: function _handleClick(e) {
            var aTrigger = this._closest(e.target, 'tag', 'a');

            if (e.target.getAttribute('data-modal') === 'close') this.props.onWindowClick();
            if (aTrigger && aTrigger.getAttribute('data-modal') === 'keepopen') return false;
            if (aTrigger) this.props.onWindowClick();
        }
    }, {
        key: '_handleKeyDown',
        value: function _handleKeyDown(e) {
            if (e.keyCode === 27) this.close();
        }
    }, {
        key: '_closest',
        value: function _closest(el, findBy, findValue) {
            if (!el) return false;

            var value = void 0;

            if (el.tagName.toLowerCase() === 'body') return null;

            if (findBy === 'class') value = el.className;
            if (findBy === 'id') value = el.id;
            if (findBy === 'tag') value = el.tagName.toLowerCase();

            if (value === findValue) return el; // found
            return this._closest(el.parentNode, findBy, findValue); // not found, recurse
        }
    }]);

    return ModalWrapper;
}(_react2.default.Component);

ModalWrapper.propTypes = {
    id: _react2.default.PropTypes.string.isRequired,
    options: _react2.default.PropTypes.object
};

ModalWrapper.defaultProps = {
    id: null,
    options: null
};

exports.default = ModalWrapper;
