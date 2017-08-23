(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'axios', 'prop-types'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('axios'), require('prop-types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assign, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.axios, global.propTypes);
        global.index = mod.exports;
    }
})(this, function (exports, _assign, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _axios, _propTypes) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _assign2 = _interopRequireDefault(_assign);

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

    var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

    var _inherits3 = _interopRequireDefault(_inherits2);

    var _react2 = _interopRequireDefault(_react);

    var _axios2 = _interopRequireDefault(_axios);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ClubReadyCheckinComponent = function (_React$Component) {
        (0, _inherits3.default)(ClubReadyCheckinComponent, _React$Component);

        function ClubReadyCheckinComponent(props) {
            var _this2 = this;

            (0, _classCallCheck3.default)(this, ClubReadyCheckinComponent);

            var _this = (0, _possibleConstructorReturn3.default)(this, (ClubReadyCheckinComponent.__proto__ || (0, _getPrototypeOf2.default)(ClubReadyCheckinComponent)).call(this, props));

            _this.checkin = function () {
                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
                    var foundUser, barcode, validationPassed, findUserResponse, found, userResponse, checkinResponse;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    event.preventDefault();
                                    foundUser = {};
                                    barcode = event.target['clubready-checkin-barcode'].value;

                                    event.target['clubready-checkin-barcode'].value = '';
                                    validationPassed = _this.props.validation ? _this.props.validation(barcode) : true;

                                    if (!validationPassed) {
                                        _context.next = 33;
                                        break;
                                    }

                                    _context.next = 8;
                                    return _axios2.default.get('http://www.clubready.com:80/api/current/users/find?ApiKey=' + _this.state.token + '&&&StoreId=' + _this.state.store + '&&Barcode=' + barcode + '&&&');

                                case 8:
                                    findUserResponse = _context.sent;
                                    found = false;

                                    findUserResponse.data.users.forEach(function (user) {
                                        if (user.Barcode === barcode) {
                                            found = true;
                                            foundUser = user;
                                        }
                                    });
                                    console.log(findUserResponse);

                                    if (found) {
                                        _context.next = 19;
                                        break;
                                    }

                                    console.log('Using Phone');
                                    _context.next = 16;
                                    return _axios2.default.get('http://www.clubready.com:80/api/current/users/find?ApiKey=' + _this.state.token + '&&&StoreId=' + _this.state.store + '&&Phone=' + barcode + '&&&');

                                case 16:
                                    findUserResponse = _context.sent;

                                    console.log(findUserResponse);
                                    findUserResponse.data.users.forEach(function (user) {
                                        if (user.Phone === barcode) {
                                            found = true;
                                            foundUser = user;
                                        }
                                    });

                                case 19:
                                    if (!found) {
                                        _context.next = 30;
                                        break;
                                    }

                                    _context.next = 22;
                                    return _axios2.default.get('http://www.clubready.com:80/api/current/users/{UserId}?ApiKey=' + _this.state.token + '&UserId=' + foundUser.UserId + '&StoreId=' + _this.state.store + '&&FullDetail=true');

                                case 22:
                                    userResponse = _context.sent;

                                    foundUser = userResponse.data;
                                    _context.next = 26;
                                    return _axios2.default.post('http://www.clubready.com:80/api/current/users/checkin?ApiKey=' + _this.state.token + '&Barcode=' + userResponse.data.Barcode + '&StoreId=' + _this.state.store + '&');

                                case 26:
                                    checkinResponse = _context.sent;

                                    _this.props.returnHandler({ userData: foundUser, checkin: checkinResponse.data, validation: true });
                                    _context.next = 31;
                                    break;

                                case 30:
                                    _this.props.returnHandler({ userData: 'No User Found', checkin: false, validation: true });

                                case 31:
                                    _context.next = 34;
                                    break;

                                case 33:
                                    _this.props.returnHandler({ userData: 'Validation Failed', checkin: false, validation: false });

                                case 34:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this2);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();

            _this.state = {
                token: props.token,
                store: props.store
            };
            return _this;
        }

        (0, _createClass3.default)(ClubReadyCheckinComponent, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'form',
                    { onSubmit: this.checkin },
                    _react2.default.createElement('input', {
                        style: (0, _assign2.default)({}, this.props.inputStyle),
                        name: 'clubready-checkin-barcode',
                        type: 'number'
                    }),
                    this.props.useButton ? _react2.default.createElement(
                        'button',
                        { type: 'submit', style: this.props.buttonStyle },
                        this.props.buttonText
                    ) : ''
                );
            }
        }]);
        return ClubReadyCheckinComponent;
    }(_react2.default.Component);

    exports.default = ClubReadyCheckinComponent;

    ClubReadyCheckinComponent.propTypes = {
        token: _propTypes2.default.string.isRequired,
        returnHandler: _propTypes2.default.func.isRequired,
        store: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
        validation: _propTypes2.default.func,
        inputStyle: _propTypes2.default.object,
        useButton: _propTypes2.default.bool,
        buttonStyle: _propTypes2.default.object
    };
});