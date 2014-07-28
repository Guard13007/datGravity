var Game={
	generateNewSystem:function(){
		//Game.system.ships=[]
		Game.system=new System(random.integer(13,31)); //system generation should be written so that 23 bodies will average a gas giant, six planets, five moons, and eleven asteroids
		/*Game.system.ships[0]=new Ship("test",
			[new Tank(-2,-4,4,8,[255,255,0,1]),new Tank(-4,-2,8,4,[255,0,0,0.8])],
			250,0);//new Ship(250,0,4,8);*/
		//temporary while objects are remade:
		Game.system.ships[0]={
			Parts:[
				{
					color:[255,255,0,1],
					height:8,
					mass:4.512,
					name:"tank",
					rotation:0.1,
					type:"Tank",
					width:4,
					x:-1,
					y:0
				},
				{
					color:[255,0,0,0.8],
					height:4,
					mass:4.512,
					name:"tank",
					rotation:Math.Tau/4-0.1,
					type:"Tank",
					width:8,
					x:1,
					y:0
				}
			],
			name:"test",
			rotation:0,
			rotationSpeed:0,
			type:"Ship",
			v:new physics.vector(),
			x:250,
			y:0
		};
		//console.log(Game.system.ships[0]);
		physics.setOrbit(Game.system.bodies[0],Game.system.ships[0]);
	},
	generateAsteroids:function(){
		var r=random.integer(1,5);			//how many
		for (var i=0;i<r;i++){
			var c=random.integer(21,169);	//color
			//generated up to canvas.width*2 away from center
			var m=random.number(0,Render.canvas.width*2);
			var d=random.number(0,Math.Tau);
			//NOTE TO SELF, IF STUFF IS NOT ORBITING 0x0, THIS WILL BE INCORRECT
			var b=new Planetoid(random.number(0.5,40),Math.cos(d)*m,Math.sin(d)*m,
				[c,c,c,1],0,"asteroid");
			physics.setOrbit(Game.system.bodies[0],b);
			Game.system.bodies.push(b);
			if (typeof(GUI!=='undefined')) GUI.addBody(Game.system.bodies[Game.system.bodies.length-1]);
		}
	},
	loop:function(){
		//PHYSICS
		forEachCompare(Game.system.bodies,function(a,b){
			if (physics.radialCollision(a,b)) physics.combine(a,b);
		});
		forEachCompare(Game.system.bodies,function(a,b){physics.applyGravity(a,b);});
		forEachCompare(Game.system.ships,function(a,b){physics.applyGravity(a,b);});
		forEach(Game.system.bodies,function(A){
			forEach(Game.system.ships,function(B){
				physics.applyGravity(A,B);
			});
		});/**/
		/*for (var i=0;i<Game.system.bodies.length;i++)
			for (var j=0;i<Game.system.ships.length;i++)
				physics.applyGravity(Game.system.bodies[i],Game.system.ships[j]);*/
		//RENDER
		Render.clear();
		/**/if (Images.loaded===true) Render.context.drawImage(Images.fx.rcs,100,100); //tmp for test purpose
		forEach(Game.system.bodies,function(b){
			physics.updateLocation(b);
			Render.draw(b);
		});
		checkInput(); //needs to be moved / rewritten?
		forEach(Game.system.ships,function(b){
			physics.updateLocation(b);
			Render.draw(b);
		});
		setTimeout(Game.loop,Render.iterationDelay);
	}
};

addEventHandler(window,'load',load);/*function(){
	Game.generateNewSystem();
	setTimeout(Game.loop,100); //this has a timer because of loading errors, I need to figure out and fix this
});*/

function load(){
	if (typeof(Game)==='undefined' || typeof(Render)==='undefined' || typeof(Render.canvas)==='undefined') {
		console.log("Not ready. (function: load)");
		setTimeout(load,100);
		return;
	}
	Game.generateNewSystem();
	Game.loop();
}

var System=function(count){
	//properties
	this.focusID=0;
	this.ships=[];
	this.bodies=[];
	//create star
	this.bodies.push(
		new Planetoid(random.number(6000,13000),0,0,new StarColor(),0,"star")
	);
	//create count-1 bodies orbiting star
	var p;
	for (var i=1;i<count;i++){
		//TEMPORARY COMPLETE SHIT RANDOM PLACEMENT:
		var m=random.number(this.bodies[0].radius*1.1,Render.canvas.width*1000);
		var d=random.number(0,Math.Tau);
		var x=Math.cos(d)*m;	var y=Math.sin(d)*m;
		/*
		//generated up to canvas.width*2 away from center
			var m=random.number(0,Render.canvas.width*2);
			var d=random.number(0,Math.Tau);
			//NOTE TO SELF, IF STUFF IS NOT ORBITING 0x0, THIS WILL BE INCORRECT
			var b=new Planetoid(random.number(0.5,40),Math.cos(d)*m,Math.sin(d)*m,

		*/
		var r=random.integer(0,3); //determine type of body
		switch(r){
			case 0: //planet
				p=new Planet(x,y,0,"planet");
				break;
			case 1: //moon
				p=new Moon(x,y,0,"moon");
				break;
			case 2: //asteroid
				p=new Asteroid(x,y,0,"asteroid");
				break;
			case 3: //gas giant
				p=new GasGiant(x,y,0,"giant");
				break;
			/*case 0: //planet
				p=new Planetoid(random.number(289,404),x,y,new PlanetColor(),0,"planet");
				break;
			case 1: //moon
				p=new Planetoid(random.number(81,149),x,y,new MoonColor(),0,"moon");
				break;
			case 2: //asteroid
				var c=random.integer(21,169)
				p=new Planetoid(random.number(0.5,40),x,y,[c,c,c,1],0,"asteroid");
				break;
			case 3: //gas giant
				p=new Planetoid(random.number(666,1313),x,y,new GasGiantColor(),0,"giant");
				break;*/
		}
		//var p=new Planetoid();
		physics.setOrbit(this.bodies[0],p);
		this.bodies.push(p);
	}
	//radius,x,y,color,rotationSpeed,name

	//tmp for testing
	/*this.bodies[0]=new Planetoid(200,0,0,[255,0,0,0.5]);
	this.bodies[1]=new Planetoid(10,200,567,[0,0,255,1]);
	this.bodies[2]=new Planetoid(0,29,300,[255,255,0,1]);
	physics.setOrbit(this.bodies[0],this.bodies[1]);
	physics.setOrbit(this.bodies[0],this.bodies[2]);*/
};

function StarColor(){
	//make a Star() constructor and place this in that
	var red,green,blue;
	var color=random.integer(0,9);
	switch(color){
		case 0: //red
		case 1: case 2: case 3:
			//228+, g/b under 10
			red=random.integer(228,255);
			green=random.integer(0,10);
			blue=random.integer(0,10);
			break;
		case 4: //yellow
		case 5:
			// red and green equal +/- 3, 228 and up
			// no blue (under 10)
			red=random.integer(228,255);
			green=red+random.integer(-3,3);
			if (green>255) green=255;
			blue=random.integer(0,10);
			break;
		case 6: //blue
			//red/green 40-, blue 200+
			red=random.integer(0,10);
			green=random.integer(0,10);
			blue=random.integer(200,255);
			break;
		case 7: //orange
		case 8:
			//red 200 and up
			//green can only be 165 and up
			//NO BLUE (blue under 10)
			red=random.integer(200,255);
			green=random.integer(165,255);
			blue=random.integer(0,10);
			break;
		case 9: //aqua
			//NO RED
			//green/blue same color 228+
			red=random.integer(0,10);
			green=random.integer(228,255);
			blue=green+random.integer(-3,3);
			if (blue>255) blue=255;
			break;
	}
	this[0]=red;
	this[1]=green;
	this[2]=blue;
	this[3]=1;
	return [red,green,blue,1];
}
/*function PlanetColor(){
	//
}
function MoonColor(){
	//
}
function GasGiantColor(){
	//
}*/
