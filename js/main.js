var Game={
	start:function(){
		Game.gui.destroy();
		Game.generateNewSystem();
		Game.temporaryShittyShip();
		Game.loop();
	},
	running:true,
	gui:null,
	generateNewSystem:function(){
		Render.clear(true);
		Game.system=new System(random.integer(13,31));
		//system generation should be written so that 23 bodies will average
		//        a gas giant, six planets, five moons, and eleven asteroids
	},
	temporaryShittyShip:function(){
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
			//generated up to canvas.width*2/Render.scale away from center
			var m=random.number(0,Render.canvas.width*2/Render.scale);
			var d=random.number(0,Math.Tau);
			//NOTE TO SELF, IF STUFF IS NOT ORBITING 0x0, THIS WILL BE INCORRECT
			var b=new Planetoid(random.number(0.5,40),Math.cos(d)*m,Math.sin(d)*m,
				[c,c,c,1],0,"asteroid");
			physics.setOrbit(Game.system.bodies[0],b);
			Game.system.bodies.push(b);
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
		/**/if (Images.loaded===true) Render.context.drawImage(Images.fx.rcs,100,100); //tmp for test purpose*/
		forEach(Game.system.bodies,function(b){
			physics.updateLocation(b);
			Render.draw(b);
		});
		checkInput(); //needs to be moved / rewritten?
		forEach(Game.system.ships,function(b){
			physics.updateLocation(b);
			Render.draw(b);
		});
		if (Game.running) setTimeout(Game.loop,Render.iterationDelay);
	}
};

function load(){
	if (typeof(Game)==='undefined' || typeof(Render)==='undefined' || typeof(Render.canvas)==='undefined') {
		console.log("Not ready. (function: load)");
		setTimeout(load,100);
		return;
	}
	console.log("Game loaded. (function: load)");
	Game.gui=new dat.GUI();
	Game.gui.add(Game,'start').name("Start Simulation");
}
io.addEvent('load',load);

var System=function(count){
	//properties
	this.focusID=0;
	this.ships=[];
	this.bodies=[];
	//create star
	this.bodies.push(new Star(0,0,0,"star"));
	//create count-1 bodies orbiting star
	var p;
	for (var i=1;i<count;i++){
		//TEMPORARY COMPLETE SHIT RANDOM PLACEMENT:
		// edited to be slightly better based on Render.scale
		// note that this method actually prevents spawning Planetoids in the Star
		var m=random.number(this.bodies[0].radius*1.1,Render.canvas.width/Render.scale);
		var d=random.number(0,Math.Tau);
		var x=Math.cos(d)*m;	var y=Math.sin(d)*m;
		//IMPROVE DISTRIBUTION
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
		}
		physics.setOrbit(this.bodies[0],p);
		this.bodies.push(p);
	}
};
