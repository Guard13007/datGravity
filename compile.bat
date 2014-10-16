@ECHO OFF
echo Removing old img folder...
rmdir /S /Q "%cd%/img"

echo Copying new img folder...
xcopy /S /V /I /Q /Y "%cd%/source/img" "%cd%/img"

echo Uglifying JS...
IF EXIST node_modules/.bin/uglifyjs (
	cmd /c ""%cd%/node_modules/.bin/uglifyjs" source/js/lib/dat.gui.min.js source/js/lib/Jenjens.js source/js/lib/Jenjens-alias.js source/js/gui.js source/js/images.js source/js/io.js source/js/main.js source/js/objects.js source/js/physics.js source/js/render.js source/js/Vessels.js --screw-ie8 --compress,sequences,properties,conditionals,comparisons,evaluate,booleans,loops,if_return,join_vars,cascade,warnings,negate_iife,pure_getters --unsafe --mangle --output JS.js -v"
) ELSE (
	cmd /c uglifyjs source/js/lib/dat.gui.min.js source/js/lib/Jenjens.js source/js/lib/Jenjens-alias.js source/js/gui.js source/js/images.js source/js/io.js source/js/main.js source/js/objects.js source/js/physics.js source/js/render.js source/js/Vessels.js --screw-ie8 --compress,sequences,properties,conditionals,comparisons,evaluate,booleans,loops,if_return,join_vars,cascade,warnings,negate_iife,pure_getters --unsafe --mangle --output JS.js -v
)

echo Documenting source...
IF EXIST node_modules/.bin/jsdoc (
	cmd /c ""%cd%/node_modules/.bin/jsdoc" source -d docs -r"
) ELSE (
	cmd /c jsdoc source -d docs -r
)

echo Finished.
