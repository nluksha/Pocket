"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].set('port', process.env.PORT || 3000);

_app["default"].listen(_app["default"].get('port'), function () {
  // eslint-disable-next-line no-console
  console.log("Express localhost:".concat(_app["default"].get('port')));
});