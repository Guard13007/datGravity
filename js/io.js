var keysHeld=[];

window.addEventListener('keydown',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=true;
	console.log(code);
},false);
window.addEventListener('keyup',function(event){
	var code=event.keyCode? event.keyCode : event.charCode;
	keysHeld[code]=false;
},false);

window.onresize=function(){
	sys.canvas.width=window.innerWidth;
	sys.canvas.height=window.innerHeight;
};
