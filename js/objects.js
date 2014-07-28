console.log("Constructors (objects.js) loading.");
if (typeof(physics)==='undefined') {
	console.log("Error loading constructors, physics not loaded.");
	alert("Error loading physics. Contact Guard13007."); //this is in case this is somehow loaded before Jenjens / Jenjens-alias
}

var Body=function(x,y,rotationSpeed,name){
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;
	rotationSpeed? this.rotationSpeed=rotationSpeed : this.rotationSpeed=0;
	this.rotation=0;

	this.v=new physics.vector();

	//these properties are placeholder and should never be 'seen'
	this.type="Body";
	name? this.name=name : this.name='unnamed';
	this.mass=0;
};

var Planetoid=function(radius,x,y,color,rotationSpeed,name){
	//old: radius,color,name,x,y,rotationSpeed
	Body.call(this,x,y,rotationSpeed,name);
	this.type="Planetoid";

	radius? this.radius=radius : this.radius=1;
	this.mass=Math.pow(this.radius,physics.PlanetoidDensity);
	color? this.color=color : this.color=[255,255,255,1];
};

var Asteroid=function(x,y,rotationSpeed,name){
	var c=random.integer(21,169);
	Planetoid.call(this,random.number(0.5,40),x,y,[c,c,c,1],rotationSpeed,name);
	this.type="Asteroid";
};

var Planet=function(x,y,rotationSpeed,name){
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(289,404),x,y,color,rotationSpeed,name);
	this.type="Planet";
};

var Moon=function(x,y,rotationSpeed,name){
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(81,149),x,y,color,rotationSpeed,name);
	this.type="Moon";
};

var GasGiant=function(x,y,rotationSpeed,name){
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(666,1313),x,y,color,rotationSpeed,name);
	this.type="GasGiant";
};

var Ship=function(Vessel,x,y,rotation,rotationSpeed,name){
	//old: name,Parts,x,y,rotation
	Body.call(this,x,y,rotationSpeed,name);
	this.type="Ship";

	this.Parts=Vessel.Parts;
	this.mass=Vessel.mass;
	this.centerOfMass=Vessel.centerOfMass;

	rotation? this.rotation=rotation : this.rotation=0;

	/*this.updateMass=function(){
		//needs to loop through this.Parts and update this.mass with appropriate value
	};*/

	/*this.mass=0;
	this.updateMass(); //is called right away to set initial mass*/
};

Ship.prototype.updateMass=function(){
	var M=0;
	forEach(this.Parts,function(b){
		M+=b.mass;
	});
	this.mass=M;
};

Ship.prototype.updateCenterOfMass=function(){
	var Lx=0;	var Ly=0;	var totalMass=0;
	forEach(this.Parts,function(b){
		Lx+=b.x*b.mass;	Ly+=b.y*b.mass;
		totalMass+=b.mass;
	});
	this.centerOfMass={
		x:Lx/totalMass,
		y:Ly/totalMass
	};
	if (isNaN(this.centerOfMass.x)) this.centerOfMass.x=0;
	if (isNaN(this.centerOfMass.y)) this.centerOfMass.y=0;
};

var Vessel=function(Parts,name){
	Parts? this.Parts=Parts : this.Parts=[];
	this.type="Vessel";

	name? this.name=name : this.name='unnamed';

	//defaults
	this.mass=0;
	this.centerOfMass={
		x:0,
		y:0
	};
};

Vessel.prototype.updateMass=Ship.prototype.updateMass;
Vessel.prototype.updateCenterOfMass=Ship.prototype.updateCenterOfMass;

var Part=function(mass,color,name){
	//parts don't have x/y/rotation because a part is a definition for use in a Vessel,
	// when a Vessel is created, a Part may be placed with a rotation and location
	this.type="Part";
	mass? this.mass=mass : this.mass=0; //this should never receive 0

	color? this.color=color : this.color=[255,255,255,1];
	name? this.name=name : this.name="unnamed";
};

var Tank=function(width,height,color,name){
	width? this.width=width : this.width=1;
	height? this.height=height : this.height=1;

	Part.call(this,0.141*this.width*this.height/10,color,name);
	this.type="Tank";

	this.massCapacity=0.141*this.width*this.height*0.9;
};
//console.log(new Tank(10,10,[255,0,0,1],"Red Hundred"));

var Fuel=function(density){
	//this is so dumb, it should just be a defined object
	density? this.density=density : this.density=1;
};

liquidOxygen=new Fuel(0.141);

//TEMPORARY
/*tmp=new Vessel([
	new Tank(10,10,[255,0,0,1],"Red Hundred"),
	new Tank(10,10,[0,0,255,1],"Blue Hundred")],
	"Test le Vessel");
tmp.Parts[0].x=10;
tmp.Parts[1].x=-10;
tmp2=new Ship(tmp,100,100,Math.PI,0,"Test le Ship");
tmp2.updateMass();
tmp2.updateCenterOfMass();
console.log(tmp2);*/
//END TEMP

/*var Tank=function(x,y,width,height,color,name,rotation){
	//right now just makes rectanlge "fuel tank" to be reused later
	//color is temporary value, yellow, should be shade of grey probably

	//Body.call(this,[255,255,0,1],'fuel tank',x,y);
	this.type="Tank";

	color? this.color=color : this.color=[255,255,255,1];
	name? this.name=name : this.name='unnamed tank';
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;

	width? this.width=width : this.width=1;
	height? this.height=height : this.height=1;
	this.mass=0.141*this.width*this.height; //density of liq oxy is 1.141g/cm^3
	rotation? this.rotation=rotation : this.rotation=0;

	/* determine fuel mass based on current tank size/mass and plan accordingly in the future
		4.512 * 0.9 = 4.0608
		4.512 * 0.1 = 0.4512
	*./
};

var Thruster=function(x,y,width,height,color,name,rotation){
	this.type="Thruster";

	color? this.color=color : this.color=[255,255,255,1];
	name? this.name=name : this.name='unnamed thruster';
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;

	width? this.width=width : this.width=0.2;
	height? this.height=height : this.height=0.1;
	this.mass=0.3*this.width*this.height;
	rotation? this.rotation=rotation : this.rotation=0;
};

var Engine=function(x,y,width,height,color,name,rotation){
	this.type="Engine";

	color? this.color=color : this.color=[255,255,255,1];
	name? this.name=name : this.name='unnamed engine';
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;

	width? this.width=width : this.width=1;
	height? this.height=height : this.height=0.4;
	this.mass=0.5*this.width*this.height;
	rotation? this.rotation=rotation : this.rotation=0;
};*/

console.log("Constructors (objects.js) loaded.");

/*
	Body(color,name,x,y,rotationSpeed)
	Planetoid(radius,color,name,x,y,rotationSpeed)
	Ship(name,Vessel,x,y,rotation)
	Part(width,height,color,name)
	Body{
		Planetoid - created with stats to be placed in orbit
		Ship - created with stats to be placed on the surface of a base (current: create in an orbit)
		Vessel - a ship without a position or physics, a design to be used later
	}
	Part{
		created for use in later designs, shouldn't have placement,
		 should be used to create the objects for later use
		Tank - should be relatively low mass, a thin shell filled with a specific type of fuel or fuels
		Thruster - should medium low mass, a thruster that fires to maneuver..this is probably stupid
		 because I don't know how to do proper physics to adjust velocity/rotation based on placement
		 of thruster
		Engine - medium mass, fires based on throttle
	}
*/
