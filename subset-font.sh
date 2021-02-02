#!/bin/sh

# Requirements: 
# pip install fonttools
# npm install ttf2eot -g

# CSS classes - Unicode character mappings:
# icon-opennewwindow U+F332
# icon-fullstar U+F2e0
# icon-maximize U+f30f


pyftsubset ./node_modules/webhostinghub-glyphs/libs/webhostinghub-glyphs/WebHostingHub-Glyphs.ttf --unicodes="U+F332,U+f2e0,U+f30f"  --output-file="src/whhg-font/font/subset2.ttf"
ttf2eot src/whhg-font/font/subset2.ttf src/whhg-font/font/subset2.eot