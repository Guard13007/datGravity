//Redefine constants
physics.G=0.4;
physics.timeStep=0.1;

//combine bodies
physics.combine=function(a,b){
	if (b.mass>a.mass){					//keep values of bigger
		a.name=b.name;
		a.color=b.color;
	}
	//fix focus if needed (this works because a < b always)
	if (Render.focusType=='body' && Render.focusID==Game.system.bodies.indexOf(b))
		Game.system.focusID=Game.system.bodies.indexOf(a);

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
	Game.system.bodies.splice(Game.system.bodies.indexOf(b),1);
};