
# Customize
BACKGROUND_COLOR := white
TEST_FOLDER      := test
SRC_FOLDER       := src
DIST_FOLDER      := ./

all: install run convert

install :
	npx babel $(SRC_FOLDER) --out-dir $(DIST_FOLDER)

.PHONY: test
test :
	(cd $(TEST_FOLDER) && babel index.js | node)
	(cd $(TEST_FOLDER) && mkdir -p converted B S H)
	(cd $(TEST_FOLDER) && for i in *.png; do convert $${i} -background $(BACKGROUND_COLOR) -flatten converted/$${i}; done)
	(cd $(TEST_FOLDER) && for i in B S H; do cp converted/*-$${i}.png $${i}/ ; done)

display :
	(cd $(TEST_FOLDER) && feh  --fullscreen --draw-actions --slideshow-delay 0.1 --cycle-once -bg-scale converted/*.png)

clean :
	rm -f \
	    $(TEST_FOLDER)/*.png \
	    $(TEST_FOLDER)/*/*.png \
	    $(DIST_FOLDER)/index.js

