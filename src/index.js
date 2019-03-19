import FS from 'fs';
import drawCandleStick from 'draw-candlestick';
import CSV from 'csv-parse';

const NUBER_OF_CANDLES_PER_PICTURE = 12;
const BUY_SELL_TRESHOLD            = 0.00007;
const SCV_FILE_PATH                = 'DAT_ASCII_EURUSD_M1_201902-100.csv';
const LABLEL_FOR_BUY               = 'B';
const LABLEL_FOR_SELL              = 'S';
const LABLEL_FOR_HOLD              = 'H';

export default class {

    analyse_input (input) {
        var n = input.high.length;
        for(var i = 0; i < n - NUBER_OF_CANDLES_PER_PICTURE; i ++) {
            var win = input.close[i + 1] - input.close[i];
            if(win > BUY_SELL_TRESHOLD) {
                input.label[i] = LABLEL_FOR_BUY;
            } else if(win * -1 > BUY_SELL_TRESHOLD) {
                input.label[i] = LABLEL_FOR_SELL;
            } else {
                input.label[i] = LABLEL_FOR_HOLD;
            }
        }
        return
    }

    plot_input(input) {
        const N = input.high.length;
        for(var i = 0; i < N - NUBER_OF_CANDLES_PER_PICTURE; i++) {
            let ohlc = {};
            for(var x in input) { ohlc[x] = input[x].slice(i, i + NUBER_OF_CANDLES_PER_PICTURE); }
            //const plot = drawCandleStick(ohlc, this.bullishColor, this.bearishColor, this.chartWidht, this.chartHeight);
            const plot = drawCandleStick(ohlc);
            const chartFilename = 'result-' + (1000000 + i) + '-' + input.label[i] + '.png';
            FS.writeFileSync(chartFilename, plot);
        }
    }

    ticks_to_plot_input(ticks) {
        let open = [], high = [], low = [], close = [], label = [];
        for(var i in ticks) {
            var tick = ticks[i];
            open.push(tick[1]);
            high.push(tick[2]);
            low.push(tick[3]);
            close.push(tick[4]);
        }
        return {open: open, high: high, low: low, close: close, label: label};
    }

    plot_ticks(ticks) {
        var input = this.ticks_to_plot_input(ticks);
        this.analyse_input(input);
        this.plot_input(input);
    }

    run() {
        let ticks = [];
        FS  .createReadStream(SCV_FILE_PATH)
            .pipe(CSV({'delimiter':';'}))
            .on('data', (tick) => ticks.push(tick))
            .on('end', () => this.plot_ticks(ticks));
    }
}


