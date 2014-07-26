console.log("IO loading.");

var keysHeld=[];

//addEventListener doesn't work in IE
window.addEventListener('keydown',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=true;
	console.log(code); //temporary
},false);
window.addEventListener('keyup',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=false;
},false);

function checkInput(){
	if (keysHeld[87]) //W
		Game.system.ships[Render.focusID].v.y-=1;
	if (keysHeld[65]) //A
		Game.system.ships[Render.focusID].v.x-=1;
	if (keysHeld[83]) //S
		Game.system.ships[Render.focusID].v.y+=1;
	if (keysHeld[68]) //D
		Game.system.ships[Render.focusID].v.x+=1;
	if (keysHeld[38]) //Up Arrow
		Game.system.ships[Render.focusID].v.y-=1;
	if (keysHeld[37]) //Left Arrow
		Game.system.ships[Render.focusID].v.x-=1;
	if (keysHeld[40]) //Down Arrow
		Game.system.ships[Render.focusID].v.y+=1;
	if (keysHeld[39]) //Right Arrow
		Game.system.ships[Render.focusID].v.x+=1;
}

console.log("IO loaded.");
