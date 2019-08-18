"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _morgan["default"])('tiny');
var app = (0, _express["default"])();
app.get('/test', function (req, res) {
  res.json({
    result: 'Hello, World!'
  });
});
app.use('/game-generate', function () {
  return require('./gamegen');
});
app.use('/storyline', function () {
  return require('./storyline');
});
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("server running on port ".concat(PORT));
});