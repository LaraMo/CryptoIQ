"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));





var _gamegen = _interopRequireDefault(require("./gamegen"));
var _storyline = _interopRequireDefault(require("./storyline"));



















var _setup = _interopRequireDefault(require("./db/setup"));(0, _morgan["default"])('tiny');_dotenv["default"].config({ path: __dirname + '/.env' });var app = (0, _express["default"])(); //Enables body parser for json payload
app.use(_express["default"].json());app.use((0, _cors["default"])());app.options('*', (0, _cors["default"])()); //Enable CORS
app.use(function (req, res, next) {res.header("Access-Control-Allow-Origin", "*");res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");next();});app.use('/game-generate', _gamegen["default"]);app.use('/storyline', _storyline["default"]);var PORT = process.env.PORT || 9000;(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (
            _setup["default"]);case 3:
          app.listen(PORT, function () {
            console.log("server running on port ".concat(PORT));
          });_context.next = 9;break;case 6:_context.prev = 6;_context.t0 = _context["catch"](0);

          console.error(_context.t0);case 9:case "end":return _context.stop();}}}, _callee, null, [[0, 6]]);}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJwYXRoIiwiX19kaXJuYW1lIiwiYXBwIiwidXNlIiwiZXhwcmVzcyIsImpzb24iLCJvcHRpb25zIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsImdhbWVnZW5Sb3V0ZXIiLCJzdG9yeWxpbmVSb3V0ZXIiLCJQT1JUIiwicHJvY2VzcyIsImVudiIsImRiX3NldHVwIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoidVJBQUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSwyREF4QkEsd0JBQU8sTUFBUCxFQUNBQSxtQkFBT0MsTUFBUCxDQUFjLEVBQUNDLElBQUksRUFBRUMsU0FBUyxHQUFHLE9BQW5CLEVBQWQsRUFLQSxJQUFNQyxHQUFHLEdBQUcsMEJBQVosQyxDQUVBO0FBQ0FBLEdBQUcsQ0FBQ0MsR0FBSixDQUFRQyxvQkFBUUMsSUFBUixFQUFSLEVBQ0FILEdBQUcsQ0FBQ0MsR0FBSixDQUFRLHVCQUFSLEVBQ0FELEdBQUcsQ0FBQ0ksT0FBSixDQUFZLEdBQVosRUFBaUIsdUJBQWpCLEUsQ0FDQTtBQUNBSixHQUFHLENBQUNDLEdBQUosQ0FBUSxVQUFVSSxHQUFWLEVBQWVDLEdBQWYsRUFBb0JDLElBQXBCLEVBQTBCLENBQzlCRCxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQyxFQUNBRixHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnREFBM0MsRUFDQUQsSUFBSSxHQUNQLENBSkQsRUFNQVAsR0FBRyxDQUFDQyxHQUFKLENBQVEsZ0JBQVIsRUFBMEJRLG1CQUExQixFQUNBVCxHQUFHLENBQUNDLEdBQUosQ0FBUSxZQUFSLEVBQXNCUyxxQkFBdEIsRUFFQSxJQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaLElBQW9CLElBQWpDLENBR0EsOEVBQUM7QUFFYUcsNkJBRmI7QUFHT2QsVUFBQUEsR0FBRyxDQUFDZSxNQUFKLENBQVdKLElBQVgsRUFBaUIsWUFBTTtBQUNuQkssWUFBQUEsT0FBTyxDQUFDQyxHQUFSLGtDQUFzQ04sSUFBdEM7QUFDSCxXQUZELEVBSFA7O0FBT09LLFVBQUFBLE9BQU8sQ0FBQ0UsS0FBUixjQVBQLHdFQUFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuXG5cbm1vcmdhbigndGlueScpO1xuZG90ZW52LmNvbmZpZyh7cGF0aDogX19kaXJuYW1lICsgJy8uZW52J30pO1xuXG5pbXBvcnQgZ2FtZWdlblJvdXRlciBmcm9tICcuL2dhbWVnZW4nO1xuaW1wb3J0IHN0b3J5bGluZVJvdXRlciBmcm9tICcuL3N0b3J5bGluZSc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy9FbmFibGVzIGJvZHkgcGFyc2VyIGZvciBqc29uIHBheWxvYWRcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG5hcHAudXNlKGNvcnMoKSlcbmFwcC5vcHRpb25zKCcqJywgY29ycygpKVxuLy9FbmFibGUgQ09SU1xuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHRcIik7XG4gICAgbmV4dCgpO1xufSk7XG5cbmFwcC51c2UoJy9nYW1lLWdlbmVyYXRlJywgZ2FtZWdlblJvdXRlcik7XG5hcHAudXNlKCcvc3RvcnlsaW5lJywgc3RvcnlsaW5lUm91dGVyKTsgXG5cbmNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDkwMDA7XG5cbmltcG9ydCBkYl9zZXR1cCBmcm9tICcuL2RiL3NldHVwJztcbihhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZGJfc2V0dXBcbiAgICAgICAgYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2VydmVyIHJ1bm5pbmcgb24gcG9ydCAke1BPUlR9YClcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG59KSgpO1xuIl19