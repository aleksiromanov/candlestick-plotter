# candlestick-plotter

## Development

Transpile the source and make the package available for import

```
make install
```

Test with a sample data (requires ImageMagick's *convert*)

```
make test
```

Cleanup the working directories

```
make clean
```

## Usage (nodejs)

Install packages:

```
mkdir test
cd test
npm init --yes
npm install -S git+https://git@github.com/aleksiromanov/candlestick-plotter.git
npm install --save-dev @babel/preset-env
npm install --save-dev babel-cli
```

Write the source, e.g.:

```
$ cat index.js 
import cp from 'candlestick-plotter';
new cp().run('ohlc.csv');
```

Get the data, e.g.:

```
$ head ohlc.csv 
20190201 000000;1.144200;1.144280;1.144180;1.144180;0
20190201 000100;1.144180;1.144250;1.144140;1.144140;0
20190201 000200;1.144140;1.144150;1.144090;1.144100;0
20190201 000300;1.144100;1.144110;1.144090;1.144110;0
20190201 000400;1.144110;1.144140;1.144090;1.144100;0
20190201 000500;1.144100;1.144100;1.144030;1.144070;0
20190201 000600;1.144070;1.144070;1.143980;1.143990;0
20190201 000700;1.143990;1.144070;1.143970;1.144020;0
20190201 000800;1.144030;1.144060;1.144030;1.144050;0
20190201 000900;1.144060;1.144060;1.144010;1.144030;0
```

Transpile the code on the fly and run to generate candlestick OHLC charts (requires the *babel-cli* javascript transpiler):

```
$ babel index.js | node
```

View the charts (requires the *feh* image viewer installed):

```
$ feh  --fullscreen --draw-actions --slideshow-delay 0.1 --cycle-once -bg-scale *.png
```

