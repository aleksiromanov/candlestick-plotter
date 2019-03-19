'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _drawCandlestick = require('draw-candlestick');

var _drawCandlestick2 = _interopRequireDefault(_drawCandlestick);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NUBER_OF_CANDLES_PER_PICTURE = 12;
var BUY_SELL_TRESHOLD = 0.00007;
var LABLEL_FOR_BUY = 'B';
var LABLEL_FOR_SELL = 'S';
var LABLEL_FOR_HOLD = 'H';

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'analyse_input',
        value: function analyse_input(input) {
            var n = input.high.length;
            for (var i = 0; i < n - NUBER_OF_CANDLES_PER_PICTURE; i++) {
                var win = input.close[i + 1] - input.close[i];
                if (win > BUY_SELL_TRESHOLD) {
                    input.label[i] = LABLEL_FOR_BUY;
                } else if (win * -1 > BUY_SELL_TRESHOLD) {
                    input.label[i] = LABLEL_FOR_SELL;
                } else {
                    input.label[i] = LABLEL_FOR_HOLD;
                }
            }
            return;
        }
    }, {
        key: 'plot_input',
        value: function plot_input(input) {
            var N = input.high.length;
            for (var i = 0; i < N - NUBER_OF_CANDLES_PER_PICTURE; i++) {
                var ohlc = {};
                for (var x in input) {
                    ohlc[x] = input[x].slice(i, i + NUBER_OF_CANDLES_PER_PICTURE);
                }
                //const plot = drawCandleStick(ohlc, this.bullishColor, this.bearishColor, this.chartWidht, this.chartHeight);
                var plot = (0, _drawCandlestick2.default)(ohlc);
                var chartFilename = 'result-' + (1000000 + i) + '-' + input.label[i] + '.png';
                _fs2.default.writeFileSync(chartFilename, plot);
            }
        }
    }, {
        key: 'ticks_to_plot_input',
        value: function ticks_to_plot_input(ticks) {
            var open = [],
                high = [],
                low = [],
                close = [],
                label = [];
            for (var i in ticks) {
                var tick = ticks[i];
                open.push(tick[1]);
                high.push(tick[2]);
                low.push(tick[3]);
                close.push(tick[4]);
            }
            return { open: open, high: high, low: low, close: close, label: label };
        }
    }, {
        key: 'plot_ticks',
        value: function plot_ticks(ticks) {
            var input = this.ticks_to_plot_input(ticks);
            this.analyse_input(input);
            this.plot_input(input);
        }
    }, {
        key: 'run',
        value: function run(csvFilePath) {
            var _this = this;

            var ticks = [];
            _fs2.default.createReadStream(csvFilePath).pipe((0, _csvParse2.default)({ 'delimiter': ';' })).on('data', function (tick) {
                return ticks.push(tick);
            }).on('end', function () {
                return _this.plot_ticks(ticks);
            });
        }
    }]);

    return _class;
}();

exports.default = _class;