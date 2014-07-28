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
			var b=new Planetoid(random.number(0.01,1.3),	//temp values, really should be like 0.5 to 40
				[c,c,c,1],'asteroid',Math.cos(d)*m,Math.sin(d)*m);
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

addEventHandler(window,'load',function(){
	Game.generateNewSystem();
	setTimeout(Game.loop,100); //this has a timer because of loading errors, I need to figure out and fix this
});

var System=function(count){
	this.focusID=0;
	this.ships=[];
	this.bodies=[];
	//supposed to create a number of bodies based on a value passed to it

	//tmp for testing
	this.bodies[0]=new Planetoid(200,0,0,[255,0,0,0.5]);
	this.bodies[1]=new Planetoid(10,200,567,[0,0,255,1]);
	this.bodies[2]=new Planetoid(0,29,300,[255,255,0,1]);
	physics.setOrbit(this.bodies[0],this.bodies[1]);
	physics.setOrbit(this.bodies[0],this.bodies[2]);
};
