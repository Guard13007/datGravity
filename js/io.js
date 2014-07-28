console.log("IO loading.");

io.addEvent('keydown',function(e){
	io.keyDown(e);
	console.log(e.keyCode); //lazy way of doing this
});
io.addEvent('keyup',io.keyUp);

function checkInput(){
	//MASSIVELY NEEDS REWRITE, probably needs to be more incorporated
	// with Game.loop() instead of its own function
	if (io.keysHeld[87]) //W
		Game.system.ships[Game.system.focusID].v.y-=1;
	if (io.keysHeld[65]) //A
		Game.system.ships[Game.system.focusID].v.x-=1;
	if (io.keysHeld[83]) //S
		Game.system.ships[Game.system.focusID].v.y+=1;
	if (io.keysHeld[68]) //D
		Game.system.ships[Game.system.focusID].v.x+=1;
	if (io.keysHeld[38]) //Up Arrow
		Game.system.ships[Game.system.focusID].v.y-=1;
	if (io.keysHeld[37]) //Left Arrow
		Game.system.ships[Game.system.focusID].v.x-=1;
	if (io.keysHeld[40]) //Down Arrow
		Game.system.ships[Game.system.focusID].v.y+=1;
	if (io.keysHeld[39]) //Right Arrow
		Game.system.ships[Game.system.focusID].v.x+=1;
}

console.log("IO loaded.");
