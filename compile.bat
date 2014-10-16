@ECHO OFF
echo Uglifying JS...
IF EXIST node_modules/.bin/uglifyjs (
	cmd /c ""%cd%/node_modules/.bin/uglifyjs" source/lib/dat.gui.min.js source/lib/Jenjens.js source/lib/Jenjens-alias.js source/gui.js source/images.js source/io.js source/main.js source/objects.js source/physics.js source/render.js source/Vessels.js --screw-ie8 --unsafe --mangle --output JS.js -v"
) ELSE (
	cmd /c uglifyjs source/lib/dat.gui.min.js source/lib/Jenjens.js source/lib/Jenjens-alias.js source/gui.js source/images.js source/io.js source/main.js source/objects.js source/physics.js source/render.js source/Vessels.js --screw-ie8 --unsafe --mangle --output JS.js -v
)
