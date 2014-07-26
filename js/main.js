var Game={
	generateNewSystem:function(){
		//make this dammit!
	},
	generateAsteroids:function(){
		var r=random.integer(1,5);			//how many
		for (var i=0;i<r;i++){
			var c=random.integer(21,169);	//color
			//generated up to canvas.width*2 away from center
			var m=random.number(0,Render.canvas.width*2);
			var d=random.number(0,Math.Tau);
			//NOTE TO SELF, IF STUFF IS NOT ORBITING 0x0, THIS WILL BE INCORRECT
			var b=new Planetoid(random.number(0.01,1.3),	//temp values, really should be like 0.5 to 40
				[c,c,c,1],'asteroid',Math.cos(d)*m,Math.sin(d)*m);
			physics.setOrbit(Game.system.bodies[0],b);
			Game.system.bodies.push(b);
			if (typeof(GUI!=='undefined')) GUI.addBody(Game.system.bodies[Game.system.bodies.length-1]);
		}
	},
	loop:function(){
		forEachCompare(Game.system.bodies,function(a,b){physics.applyGravity(a,b);});
		forEachCompare(Game.system.bodies,function(a,b){
			if (physics.radialCollision(a,b)) physics.combine(a,b);
		});
		Render.clear();
		forEach(Game.system.bodies,function(b){
			physics.updateLocation(b);
			Render.draw(b);
		});
		//player shit
		checkInput();
		playerMove();
		setTimeout(Game.loop,Render.iterationDelay);
	},
	//player:new Ship(250,0,4,8),
	//player:null,
	//ships:[],
	//system:null //immediately replaced with a call to Game.generateNewSystem()
	system:{
		ships:[],
		bodies:[]
	}
};

window.addEventListener('load',function(){
	Game.system.ships[0]=new Ship(250,0,4,8);
	Game.generateNewSystem();
});
//Game.generateNewSystem();



//OLD
//temp player object stuff
//var player=new Ship(250,0,4,8);
function playerMove(){
	forEach(Game.system.bodies,function(b){physics.applyGravity(Game.system.ships[Render.focusID],b);});
	physics.updateLocation(Game.system.ships[Render.focusID]);
	Render.context.beginPath();
	Render.context.fillStyle='rgba('+Game.system.ships[Render.focusID].color[0]+','+Game.system.ships[Render.focusID].color[1]+','+Game.system.ships[Render.focusID].color[2]+','+Game.system.ships[Render.focusID].color[3]+')';
	if (Render.focusType=='body'){
		var x=(Game.system.ships[Render.focusID].x-Game.system.bodies[Render.focusID].x)*Render.scale-Game.system.ships[Render.focusID].width/2+Render.canvas.width/2;
		var y=(Game.system.ships[Render.focusID].y-Game.system.bodies[Render.focusID].y)*Render.scale-Game.system.ships[Render.focusID].height/2+Render.canvas.height/2;
	} else if (Render.focusType=='ship'){
		//tmp just uses Game.system.ships[Render.focusID] position, later array
		var x=(Game.system.ships[Render.focusID].x-Game.system.ships[Render.focusID].x)*Render.scale-Game.system.ships[Render.focusID].width/2+Render.canvas.width/2;
		var y=(Game.system.ships[Render.focusID].y-Game.system.ships[Render.focusID].y)*Render.scale-Game.system.ships[Render.focusID].height/2+Render.canvas.height/2;
	}
	Render.context.fillRect(x-Game.system.ships[Render.focusID].width/2*Render.scale,y-Game.system.ships[Render.focusID].height/2*Render.scale,Game.system.ships[Render.focusID].width*Render.scale,Game.system.ships[Render.focusID].height*Render.scale);
}

var System=function(){
	//render settings
	//this.iterationDelay=33;
	//this.renderType='normal';
	//this.fade=false;
	//this.fadeAlpha=0.03;
	/*this.focus={
		type:'body',
		id:0
	};*/
	//this.focusType='ship';
	//this.focusID=0;
	//this.scale=0.8;

	//tmp for testing
	this.bodies=[];
	//this.bodies[0]=new Body(70,[255,0,0,0.5],'star');
	//this.bodies[1]=new Body(4,[0,255,0,0.5],'planet',200);
	//this.bodies[2]=new Body(1,[0,255,255,0.8],'asteroid thing',500);
	//physics.setOrbit(this.bodies[0],this.bodies[1]);
	this.bodies[0]=new Planetoid(200,[255,0,0,0.5],'alpha');
	this.bodies[1]=new Planetoid(10,[0,0,255,1],'bravo',200,567);
	this.bodies[2]=new Planetoid(0,[255,255,0,1],'I HAVE A NAME!!',29,300);
	physics.setOrbit(this.bodies[0],this.bodies[1]);
	physics.setOrbit(this.bodies[0],this.bodies[2]);
	//Game.player THING
	physics.setOrbit(this.bodies[0],Game.system.ships[0]);
	//tmp
	//Game.system={};
	Game.system.bodies=this.bodies;
};

window.addEventListener('load',function(){
	sys=new System();
	setTimeout(Game.loop,100);
});
var tmp=function(){
	//
	//Create the System & GUI
	/*var*/ sys=new System();
	/*var*/ //gui=new dat.GUI();

	//update dat.GUI elements every second
	/*setInterval(function(){
		for (var i in gui.__controllers){
			gui.__controllers[i].updateDisplay();
		}
	},1000);*/
	//And finally, START
	/*if (typeof(Render.context)!=='null')
		Game.loop();
	else
		setTimeout(tmp,100);*/
	Game.loop();
	//setTimeout(this.loop.call(this),this.iterationDelay);
	//setInterval(sys.loop,sys.iterationDelay);
}
//window.onload=function(){
//}
