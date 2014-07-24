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
		player.v.y-=1;
	if (keysHeld[65]) //A
		player.v.x-=1;
	if (keysHeld[83]) //S
		player.v.y+=1;
	if (keysHeld[68]) //D
		player.v.x+=1;
	if (keysHeld[38]) //Up Arrow
		player.v.y-=1;
	if (keysHeld[37]) //Left Arrow
		player.v.x-=1;
	if (keysHeld[40]) //Down Arrow
		player.v.y+=1;
	if (keysHeld[39]) //Right Arrow
		player.v.x+=1;
}
