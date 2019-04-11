"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Test the root app path', function () {
  test('It should response the GET method', function (done) {
    (0, _supertest["default"])(_app["default"]).get('/articles').then(function (response) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});