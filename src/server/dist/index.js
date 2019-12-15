"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _gamegen = _interopRequireDefault(require("./gamegen"));

var _storyline = _interopRequireDefault(require("./storyline"));

var _setup = _interopRequireDefault(require("./db/setup"));

// console.log(process.env)
(0, _morgan["default"])('tiny');

_dotenv["default"].config();

var app = (0, _express["default"])(); //Enables body parser for json payload

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])()); //Enable CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/test', function (req, res) {
  res.json({
    result: 'Hello, World!'
  });
});
app.use('/game-generate', _gamegen["default"]);
app.use('/storyline', _storyline["default"]); //todo

var PORT = process.env.PORT;
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _setup["default"];

        case 3:
          app.listen(PORT, function () {
            console.log("server running on port ".concat(PORT));
          });
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))();