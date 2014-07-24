//temp player object stuff
var player=new Ship(250,0,4,8);
function playerMove(){
	forEach(sys.bodies,function(b){physics.applyGravity(player,b);});
	physics.updateLocation(player);
	sys.context.beginPath();
	sys.context.fillStyle='rgba('+player.color[0]+','+player.color[1]+','+player.color[2]+','+player.color[3]+')';
	if (sys.focusType=='body'){
		var x=(player.x-sys.bodies[sys.focusID].x)*sys.scale-player.width/2+sys.canvas.width/2;
		var y=(player.y-sys.bodies[sys.focusID].y)*sys.scale-player.height/2+sys.canvas.height/2;
	} else if (sys.focusType=='ship'){
		//tmp just uses player position, later array
		var x=(player.x-player.x)*sys.scale-player.width/2+sys.canvas.width/2;
		var y=(player.y-player.y)*sys.scale-player.height/2+sys.canvas.height/2;
	}
	sys.context.fillRect(x-player.width/2*sys.scale,y-player.height/2*sys.scale,player.width*sys.scale,player.height*sys.scale);
}

var System=function(){
	//render settings
	this.iterationDelay=33;
	this.renderType='normal';
	this.fade=false;
	this.fadeAlpha=0.03;
	/*this.focus={
		type:'body',
		id:0
	};*/
	this.focusType='ship';
	this.focusID=0;
	this.scale=0.8;

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
	//PLAYER THING
	physics.setOrbit(this.bodies[0],player);

	//get canvas
	this.canvas=document.getElementById('canvas');
	this.canvas.width=window.innerWidth;
	this.canvas.height=window.innerHeight;
	this.context=this.canvas.getContext('2d');

	this.generateNewSystem=function(){
		//generates new bodies
	};

	this.generateAsteroids=function(){
		var r=random.integer(1,5);
		for (var i=0;i<r;i++){
			//temp values, reality should be like 0.5 to 40
			var c=random.integer(21,169);
			//generate direction and magnitude
			var d=random.number(0,Math.Tau);
			var m=random.number(0,sys.canvas.width*2);
			var b=new Planetoid(random.number(0.01,1.3),
				[c,c,c,1],'a',Math.cos(d)*m,Math.sin(d)*m);
			physics.setOrbit(sys.bodies[0],b);
			sys.bodies.push(b);
		}
	};

	this.loop=function(){
		forEachCompare(this.bodies,function(a,b){physics.applyGravity(a,b);});
		forEachCompare(this.bodies,function(a,b){
			if (physics.radialCollision(a,b)) {
				if (b.mass>a.mass){					//keep values of bigger
					a.name=b.name;
					a.color=b.color;
				}
				//fix focus if needed
				if (sys.focusType=='body' && sys.focusID==sys.bodies.indexOf(b))
					sys.focusID=sys.bodies.indexOf(a);
				var Lx=a.x*a.mass+b.x*b.mass;		//weight mass with location
				var Ly=a.y*a.mass+b.y*b.mass;
				var Fx=a.v.x*a.mass+b.v.x*b.mass;	//calculate Force
				var Fy=a.v.y*a.mass+b.v.y*b.mass;
				a.mass+=b.mass;						//add mass
				a.v.x=Fx/a.mass;					//apply force
				a.v.y=Fy/a.mass;
				a.radius=Math.pow(a.mass,1/2.7);	//calculate radius
				a.x=Lx/a.mass;						//place in correct location
				a.y=Ly/a.mass;
				sys.bodies.splice(sys.bodies.indexOf(b),1);
			}
		});
		//clear
		if (this.fade) {
			sys.context.fillStyle='rgba(0,0,0,'+this.fadeAlpha+')';
			sys.context.fillRect(0,0,sys.canvas.width,sys.canvas.height);
		} else {
			sys.context.clearRect(0,0,sys.canvas.width,sys.canvas.height);
		}
		forEach(this.bodies,function(b){
			physics.updateLocation(b);

			//draw
			sys.context.beginPath();
			if (sys.focusType=='body'){
				var x=(b.x-sys.bodies[sys.focusID].x)*sys.scale+sys.canvas.width/2;
				var y=(b.y-sys.bodies[sys.focusID].y)*sys.scale+sys.canvas.height/2;
			} else if (sys.focusType=='ship'){
				//tmp just player, later will be ships array
				var x=(b.x-player.x)*sys.scale+sys.canvas.width/2;
				var y=(b.y-player.y)*sys.scale+sys.canvas.height/2;
			}
			var r=b.radius*sys.scale; if (r<0.5) r=1;
			sys.context.arc(x,y,r,0,Math.Tau);
			sys.context.fillStyle='rgba('+b.color[0]+','+b.color[1]+','+b.color[2]+','+b.color[3]+')';
			sys.context.fill();
		});
		//PLAYER THING
		checkInput();
		playerMove();
		//setTimeout(this.loop.call(this),this.iterationDelay);
		//setTimeout(this.loop,this.iterationDelay);
		setTimeout("sys.loop.call(sys)",sys.iterationDelay);
		//setTimeout(sys.loop,sys.iterationDelay);
	}
};

window.onload=function(){
	//Create the System & GUI
	/*var*/ sys=new System();
	/*var*/ gui=new dat.GUI();
	gui.add(sys,'generateNewSystem');
	gui.add(sys,'generateAsteroids');

	//Physics Settings
	var f0=gui.addFolder('Physics Settings');
	f0.add(physics,'G',0.1,1).step(0.1);
	f0.add(physics,'timeStep',0.1,1).step(0.1);

	//Render Settings
	var f1=gui.addFolder('Render Settings');
	f1.add(sys,'iterationDelay',{Max:1,fps_60:16,fps_30:33,fps_10:100,Min:2000});
	f1.add(sys,'renderType',{normal:'normal',pseudo_3D:'3D',sideView:'side'});
	f1.add(sys,'fade');
	f1.add(sys,'fadeAlpha',0.01,1).step(0.01);
	f1.add(sys,'focusType',['body','ship']);
	f1.add(sys,'focusID');
	f1.add(sys,'scale',0.01,10);

	//Bodies
	var f2=gui.addFolder('Bodies');
	//f2=new dat.GUI();
	var a=[];
	forEach(sys.bodies,function(b){
		a.push(f2.addFolder(b.name));
		a[a.length-1].add(b,'name');
		a[a.length-1].addColor(b,'color');
		a[a.length-1].add(b,'mass');
		a[a.length-1].add(b,'radius');
		a[a.length-1].add(b,'x');
		a[a.length-1].add(b,'y');
		a.push(a[a.length-1].addFolder('Velocity'));
		a[a.length-1].add(b.v,'x');
		a[a.length-1].add(b.v,'y');
	});

	gui.remember(sys); //bugged?

	//update dat.GUI elements every second
	setInterval(function(){
		for (var i in gui.__controllers){
			gui.__controllers[i].updateDisplay();
		}
	},1000);
	//And finally, START
	sys.loop();
	//setTimeout(this.loop.call(this),this.iterationDelay);
	//setInterval(sys.loop,sys.iterationDelay);
}
