"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

console.log(process.env);
var app = (0, _express["default"])(); // get all todos

app.get('/test', function (req, res) {
  res.json({
    result: 'Hello, World!'
  });
});
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("server running on port ".concat(PORT));
});