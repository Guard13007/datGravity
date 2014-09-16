console.log("Custom physics loading.");
if (typeof(physics)==='undefined') {
	console.log("Error loading physics.");
	alert("Error loading physics. Contact Guard13007."); //this is in case this is somehow loaded before Jenjens / Jenjens-alias
}

//Redefine constants
physics.G=5;//0.4;
physics.timeStep=5;//0.1;

//Define new constants
physics.PlanetoidDensity=2.7;

//redefine for physics.setOrbit() as this is much closer to accurate
physics.setOrbit=function(parent,child,retrograde){
	var Nx=false;	var Ny=false;	//flags for negatives
	var Dx=parent.x-child.x;		//get distance
	var Dy=parent.y-child.y;
	if (Dx<0){Nx=true;Dx=-Dx;}		//fix signs for calculations
	if (Dy<0){Ny=true;Dy=-Dy;}
	var distance=Math.sqrt(Dx*Dx+Dy*Dy);
	var velocity=Math.sqrt(physics.G*(parent.mass+child.mass)/distance);
	var Ax=Dx*velocity/(Dx+Dy);		//split velocity into x/y
	var Ay=velocity-Ax;
	if (!retrograde){				//make orbits counterclockwise
		if (Nx) Ax=-Ax;
		if (Ny) Ay=-Ay;}
	child.v.x=-Ay+parent.v.x;		//apply at right angle to balance against gravity
	child.v.y=Ax+parent.v.y;
};

//combine bodies
physics.combine=function(a,b){
	if (b.mass>a.mass){					//keep values of bigger
		a.name=b.name;
		a.color=b.color;
	}
	//fix focus if needed (this works because a < b always)
	if (Render.focusType=='body' && Render.focusID==Game.system.bodies.indexOf(b))
		Render.focusID=Game.system.bodies.indexOf(a);

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

console.log("Custom physics loaded.");
