console.log("Render loading.");

var Render={
	iterationDelay:33,
	renderType:'normal',
	fade:false,
	fadeAlpha:0.03,
	focusType:'ship',
	focusID:0,
	scale:0.8,
	clear:function(){
		if (Render.fade) {
			Render.context.fillStyle='rgba(0,0,0,'+Render.fadeAlpha+')';
			Render.context.fillRect(0,0,Render.canvas.width,Render.canvas.height);
		} else {
			Render.context.clearRect(0,0,Render.canvas.width,Render.canvas.height);
		}
	},
	draw:function(b){
		Render.context.beginPath();
		if (Render.focusType=='body'){
			var x=(b.x-Game.system.bodies[Render.focusID].x)*Render.scale+Render.canvas.width/2;
			var y=(b.y-Game.system.bodies[Render.focusID].y)*Render.scale+Render.canvas.height/2;
		} else if (Render.focusType=='ship'){
			//tmp just Game.player object, later will select from array with ID
			var x=(b.x-Game.system.ships[Render.focusID].x)*Render.scale+Render.canvas.width/2;
			var y=(b.y-Game.system.ships[Render.focusID].y)*Render.scale+Render.canvas.height/2;
		}
		var r=b.radius*Render.scale; if (r<0.5) r=1;
		Render.context.arc(x,y,r,0,Math.Tau);
		Render.context.fillStyle='rgba('+b.color[0]+','+b.color[1]+','+b.color[2]+','+b.color[3]+')';
		Render.context.fill();
	},
	canvas:null, //set on load
	context:null //set on load
};

addEventHandler(window,'load',function(){
	Render.canvas=document.getElementById('canvas');
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
	Render.context=Render.canvas.getContext('2d');
	console.log("Render loaded.");
});

addEventHandler(window,'resize',function(){
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
});
