console.log("Constructors (objects.js) loading.");
if (typeof(physics)==='undefined') {
	console.log("Error loading constructors, physics not loaded.");
	alert("Error loading physics. Contact Guard13007."); //this is in case this is somehow loaded before Jenjens / Jenjens-alias
}

var Body=function(color,name,x,y,rotationSpeed){
	this.v=new physics.vector;
	this.type="Body (generic)";

	color? this.color=color : this.color=[1,1,1,1];
	name? this.name=name : this.name='unnamed body';

	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;
	rotationSpeed? this.rotationSpeed=rotationSpeed : this.rotationSpeed=0;
	this.rotation=0;
};

var Planetoid=function(radius,color,name,x,y,rotationSpeed){
	Body.call(this,color,name,x,y,rotationSpeed);
	this.type="Planetoid";

	radius? this.radius=radius : this.radius=1;
	this.mass=Math.pow(this.radius,2.7);
};

var Ship=function(name,Parts,x,y,rotation){
	Body.call(this,[1,1,1,1],name,x,y);
	this.type="Ship";

	Parts? this.Parts=Parts : this.Parts=[]; //should throw error? log error?
	rotation? this.rotation=rotation : this.rotation=0;
};

var Part=function(x,y,width,height,color,name,rotation){
	//
};

var Tank=function(x,y,width,height,color,name,rotation){
	//right now just makes rectanlge "fuel tank" to be reused later
	//color is temporary value, yellow, should be shade of grey probably

	//Body.call(this,[255,255,0,1],'fuel tank',x,y);
	this.type="Tank";

	color? this.color=color : this.color=[1,1,1,1];
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
	*/
};

var Thruster=function(x,y,width,height,color,name,rotation){
	this.type="Thruster";

	color? this.color=color : this.color=[1,1,1,1];
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

	color? this.color=color : this.color=[1,1,1,1];
	name? this.name=name : this.name='unnamed engine';
	x? this.x=x : this.x=0;
	y? this.y=y : this.y=0;

	width? this.width=width : this.width=1;
	height? this.height=height : this.height=0.4;
	this.mass=0.5*this.width*this.height;
	rotation? this.rotation=rotation : this.rotation=0;
};

console.log("Constructors (objects.js) loaded.");

//REWRITING EVERYTHING WITH NO REGARD TO PREVIOUS DESIGN

/*var Body=function(x,y,rotationSpeed,name){
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
};*/

var Ship=function(Vessel,x,y,rotation,rotationSpeed,name){
	//old: name,Parts,x,y,rotation
	this.Parts=Vessel.Parts;

	Body.call(this,x,y,rotationSpeed,name);
	this.type="Ship";

	rotation? this.rotation=rotation : this.rotation=0;

	/*this.updateMass=function(){
		//needs to loop through this.Parts and update this.mass with appropriate value
	};*/

	this.updateMass(); //is called right away to set initial mass
};

Ship.prototype.updateMass=function(){
	//needs to loop through this.Parts and update this.mass with appropriate value
};

var Vessel=function(Parts,name){
	Parts? this.Parts=Parts : this.Parts=[];
	this.type="Vessel";

	name? this.name=name : this.name='unnamed'; //should this even be here?
	//isn't the name going to be defined by WHAT object we're setting here?
};

var Part=function(){
	//
};

var Tank=function(){
	//
};





// INGORE BELOW HERE FOR NOW KTHX

/*var Body=function(x,y,rotationSpeed,name){
	//
};

var Planetoid=function(radius,x,y,rotationSpeed,color,name){
	//
};

var Ship=function(Vessel,x,y,rotation,name){
	//
};

var Vessel=function(Parts,name){ //,description
	//
};

var Part=function(x,y,rotation,color){
	//
};

var Tank=function(x,y,width,height,color){ //,rotation (not included because a part by itself has no rotation? only when added to something does it get one?)
	//
};*/

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
