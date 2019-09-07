"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _gamegen = _interopRequireDefault(require("./gamegen"));

var _storyline = _interopRequireDefault(require("./storyline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _morgan["default"])('tiny');
var app = (0, _express["default"])();
app.get('/test', function (req, res) {
  res.json({
    result: 'Hello, World!'
  });
});
app.use('/game-generate', _gamegen["default"]);
app.use('/storyline', _storyline["default"]);
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("server running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map