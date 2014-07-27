console.log("Images loading.");

var Images={
	fx:{
		rcs:new Image()
	}
};
Images.fx.rcs.src="img/fx/rcs.png"; //16x10 sideways, right side source

// Check 10 times a second to see if all images are loaded.
Images.loaded=setInterval(function(){
	var loaded=true;
	for (x in Images) {
		for (y in Images[x])
			if (!Images[x][y].complete) loaded=false;
	}
	if (loaded) {
		// Once loaded, Images.loaded==true and this stops looping.
		clearInterval(Images.loaded);
		Images.loaded=true;
		console.log("Images loaded.");
		return;
	}
	console.log("Images not ready.");
},100);
