console.log("Render loading.");

var Render={
	iterationDelay:1,//33,
	renderType:'normal',
	angle3D:145,//280,
	fade:true,//false,
	fadeAlpha:0.01,//0.03,
	focusType:'body',//'ship',
	focusID:0,
	scale:0.0005,//0.8,
	minRadius:0.3,//0.5, //probably will not revert to old value
	clear:function(skipFade){
		if (skipFade || !Render.fade){
			Render.context.clearRect(0,0,Render.canvas.width,Render.canvas.height);
		} else {
			Render.context.fillStyle='rgba(0,0,0,'+Render.fadeAlpha+')';
			Render.context.fillRect(0,0,Render.canvas.width,Render.canvas.height);
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
				console.log("Invalid Render settings, rendering at Origin.");
				var Fx=0;	var Fy=0;
			}
		} else if (Render.renderType=='3D'){
			if (Render.focusType=='body' && Game.system.bodies[Render.focusID]){
				var Tx=(b.x-Game.system.bodies[Render.focusID].x)*Render.scale;
				var Ty=(b.y-Game.system.bodies[Render.focusID].y)*Render.scale;
			} else if (Render.focusType=='ship' && Game.system.ships[Render.focusID]){
				var Tx=(b.x-Game.system.bodies[Render.focusID].x)*Render.scale;
				var Ty=(b.y-Game.system.bodies[Render.focusID].y)*Render.scale;
			} else {
				console.log("Invalid Render settings, rendering at Origin.");
				var Fx=0;	var Fy=0;
			}
			//New X=x*cos(r)-y*sin(r)	New Y=x*sin(r)+y*cos(r)
			var Fx=Tx*Math.cos(Math.toRadians(Render.angle3D))-Ty*Math.sin(Math.toRadians(Render.angle3D))+Render.canvas.width/2;
			var Fy=Ty*Math.sin(Math.toRadians(Render.angle3D))+Ty*Math.cos(Math.toRadians(Render.angle3D))+Render.canvas.height/2;
		} else if (Render.renderType=='side'){
			Fx=(b.x-Game.system.bodies[Render.focusID].x)*Render.scale+Render.canvas.width/2;
			Fy=Render.canvas.height/2;
		}
		if (b.type=='Planetoid' || b.type=='Asteroid' || b.type=='Moon' || b.type=='Planet' || b.type=='GasGiant' || b.type=='Star'){
			Render.context.beginPath();
			Render.context.fillStyle='rgba('+b.color[0]+','+b.color[1]+','+b.color[2]+','+b.color[3]+')';
			var r=b.radius*Render.scale; if (r<Render.minRadius) r=Render.minRadius;
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
				//end draw/assumption for the part
			});
			Render.context.rotate(-b.rotation);
			Render.context.translate(-Fx,-Fy);
			//Render.drawShip(b);
		} else {
			console.log("Invalid Body type:",b);
		}
	},
	redraw:function(){
		Render.clear(true);
		forEach(Game.system.bodies,function(b){Render.draw(b);});
		forEach(Game.system.ships,function(b){Render.draw(b);});
	},
	drawPlanetoid:function(){
		//
	},
	drawShip:function(b){
		/*Render.context.translate(Fx,Fy);
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
			//end draw/assumption for the part
		});
		Render.context.rotate(-b.rotation);
		Render.context.translate(-Fx,-Fy);*/
	}
};

io.addEvent('load',function(){
	Render.canvas=document.getElementById('canvas');
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
	Render.context=Render.canvas.getContext('2d');
	console.log("Render loaded.");
});

io.addEvent('resize',function(){
	Render.canvas.width=window.innerWidth;
	Render.canvas.height=window.innerHeight;
});
