
# Customize
BACKGROUND_COLOR := white
TEST_FOLDER      := test
SRC_FOLDER       := src
DIST_FOLDER      := ./

all: install run convert

install :
	./node_modules/.bin/babel --presets es2015 --out-dir $(DIST_FOLDER) $(SRC_FOLDER)

.PHONY: test
test :
	(cd $(TEST_FOLDER) && npm init --yes)
	#(cd $(TEST_FOLDER) && npm install --save fs csv-parse)
	(cd $(TEST_FOLDER) && npm install --save-dev babel-cli babel-preset-es2015)
	(cd $(TEST_FOLDER) && node_modules/.bin/babel index.js --presets es2015 | node)
	(cd $(TEST_FOLDER) && mkdir -p converted B S H)
	(cd $(TEST_FOLDER) && for i in *.png; do convert $${i} -background $(BACKGROUND_COLOR) -flatten converted/$${i}; done)
	(cd $(TEST_FOLDER) && for i in B S H; do cp converted/*-$${i}.png $${i}/ ; done)

display :
	(cd $(TEST_FOLDER) && feh  --fullscreen --draw-actions --slideshow-delay 0.1 --cycle-once -bg-scale converted/*.png)

clean :
	rm -rf \
	    $(TEST_FOLDER)/*.png \
	    $(TEST_FOLDER)/[XBSH] \
	    $(TEST_FOLDER)/node_modules \
	    $(TEST_FOLDER)/package*

