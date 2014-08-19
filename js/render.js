console.log("Render loading.");

var Render={
	iterationDelay:1,//33,
	renderType:'normal',
	fade:true,//false,
	fadeAlpha:0.01,//0.03,
	focusType:'body',//'ship',
	focusID:0,
	scale:0.0005,//0.8,
	clear:function(){
		if (Render.fade) {
			Render.context.fillStyle='rgba(0,0,0,'+Render.fadeAlpha+')';
			Render.context.fillRect(0,0,Render.canvas.width,Render.canvas.height);
		} else {
			Render.context.clearRect(0,0,Render.canvas.width,Render.canvas.height);
		}
	},
	draw:function(b){
		if (Render.renderType=='normal'){
			if (Render.focusType=='body' && Game.system.bodies[Render.focusID]){
				var Fx=(b.x-Game.system.bodies[Render.focusID].x)*Render.scale+Render.canvas.width/2;
				var Fy=(b.y-Game.system.bodies[Render.focusID].y)*Render.scale+Render.canvas.height/2;
			} else if (Render.focusType=='ship' && Game.system.ships[Render.focusID]){
				var Fx=(b.x-Game.system.ships[Render.focusID].x)*Render.scale+Render.canvas.width/2;
				var Fy=(b.y-Game.system.ships[Render.focusID].y)*Render.scale+Render.canvas.height/2;
			} else {
				console.log("Invalid Render settings, rendering at Origin."/*,Render*/);
				//Render.focusType='body';	Render.focusID=0;
				var Fx=0;	var Fy=0;
			}
		} else if (Render.renderType=='3D'){
			//
		} else if (Render.renderType=='side'){
			Fy=Render.canvas.height/2;
		}
		if (b.type=='Planetoid' || b.type=='Asteroid' || b.type=='Planet' || b.type=='Moon' || b.type=='GasGiant'){
			Render.context.beginPath();
			Render.context.fillStyle='rgba('+b.color[0]+','+b.color[1]+','+b.color[2]+','+b.color[3]+')';
			var r=b.radius*Render.scale; if (r<0.5) r=1;
			/*Render.context.translate(Fx,Fy);
			Render.context.arc(0,0,r,0+b.rotation,Math.Tau+b.rotation);
			Render.context.translate(-Fx,-Fy);*/
			Render.context.arc(Fx,Fy,r,0,Math.Tau);
			Render.context.fill();
		} else if (b.type=='Ship'){
			Render.context.translate(Fx,Fy);
			Render.context.rotate(b.rotation);
			forEach(b.Parts,function(a){
				Render.context.beginPath();
				Render.context.fillStyle='rgba('+a.color[0]+','+a.color[1]+','+a.color[2]+','+a.color[3]+')';
				//right now assumes each object making up a Ship is a rect
				Render.context.translate(a.x*Render.scale,a.y*Render.scale);
				Render.context.rotate(a.rotation);
				Render.context.fillRect(-a.width*Render.scale/2,-a.height*Render.scale/2,
					a.width*Render.scale,a.height*Render.scale);
				Render.context.rotate(-a.rotation);
				Render.context.translate(-a.x*Render.scale,-a.y*Render.scale);
			});
			Render.context.rotate(-b.rotation);
			Render.context.translate(-Fx,-Fy);
		} else {
			console.log("Invalid type:",b);
		}
	}
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
