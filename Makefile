
BACKGROUND_COLOR := white
OUTPUT_FOLDER    := white
BUY_FOLDER       := B
SELL_FOLDER      := S
HOLD_FOLDER      := H
SRC_FOLDER       := src
DIST_FOLDER      := ./


all: install run convert

install :
	npx babel $(SRC_FOLDER) --out-dir $(DIST_FOLDER)

test :
	nodejs test/index.js

convert :
	for i in result-*-*.png; do convert $${i} -background $(BACKGROUND_COLOR) -flatten $(OUTPUT_FOLDER)/$${i}; done
	for i in $(BUY_FOLDER) ${SELL_FOLDER} ${HOLD_FOLDER} ; do cp $(OUTPUT_FOLDER)/result-*-$${i}.png $${i} ; done

display :
	feh  --fullscreen --draw-actions --slideshow-delay 0.1 --cycle-once -bg-scale $(OUTPUT_FOLDER)/*.png

clean :
	rm -f result*.png
	rm -f $(OUTPUT_FOLDER)/*.png
	rm -f $(BUY_FOLDER)/*.png
	rm -f $(SELL_FOLDER)/*.png
	rm -f $(HOLD_FOLDER)/*.png

