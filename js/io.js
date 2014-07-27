console.log("IO loading.");

var keysHeld=[];

addEventHandler(window,'keydown',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=true;
	console.log(code); //temporary
});
addEventHandler(window,'keyup',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=false;
});

function checkInput(){
	if (keysHeld[87]) //W
		Game.system.ships[Game.system.focusID].v.y-=1;
	if (keysHeld[65]) //A
		Game.system.ships[Game.system.focusID].v.x-=1;
	if (keysHeld[83]) //S
		Game.system.ships[Game.system.focusID].v.y+=1;
	if (keysHeld[68]) //D
		Game.system.ships[Game.system.focusID].v.x+=1;
	if (keysHeld[38]) //Up Arrow
		Game.system.ships[Game.system.focusID].v.y-=1;
	if (keysHeld[37]) //Left Arrow
		Game.system.ships[Game.system.focusID].v.x-=1;
	if (keysHeld[40]) //Down Arrow
		Game.system.ships[Game.system.focusID].v.y+=1;
	if (keysHeld[39]) //Right Arrow
		Game.system.ships[Game.system.focusID].v.x+=1;
}

console.log("IO loaded.");
