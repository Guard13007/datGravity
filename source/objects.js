console.log("Constructors (objects.js) loading.");
if (typeof(physics)==='undefined') {
	console.log("Error loading constructors, physics not loaded.");
	alert("Error loading physics. Contact Guard13007."); //this is in case this is somehow loaded before Jenjens / Jenjens-alias
}

var Body=function(x,y,rotationSpeed,name){
	// a Body is any object in space
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

Body.prototype.getVelocity=function(){
	//
};
Body.prototype.getOriginDistance=function(){
	//
};

var Planetoid=function(radius,x,y,color,rotationSpeed,name){
	// a Planetoid is a circle
	Body.call(this,x,y,rotationSpeed,name);
	this.type="Planetoid";

	radius? this.radius=radius : this.radius=1;
	this.mass=Math.pow(this.radius,physics.PlanetoidDensity);
	color? this.color=color : this.color=[255,255,255,1];
};

var Asteroid=function(x,y,rotationSpeed,name){
	// an Asteroid is a small grey Body
	var c=random.integer(21,169);
	Planetoid.call(this,random.number(0.5,40),x,y,[c,c,c,1],rotationSpeed,name);
	this.type="Asteroid";
};

var Moon=function(x,y,rotationSpeed,name){
	// a Moon orbits a Planet or GasGiant
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(81,149),x,y,color,rotationSpeed,name);
	this.type="Moon";
};

var Planet=function(x,y,rotationSpeed,name){
	// a Planet is a medium Body
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(289,404),x,y,color,rotationSpeed,name);
	this.type="Planet";
};

var GasGiant=function(x,y,rotationSpeed,name){
	// a GasGiant is huge, but not a star
	var color=[255,255,255,1]; //temporary
	Planetoid.call(this,random.number(666,1313),x,y,color,rotationSpeed,name);
	this.type="GasGiant";
};

var Star=function(x,y,rotationSpeed,name){
	// a Star is a giant ball of nuclear fusion
	var red,green,blue;
	var c=random.integer(0,32);
	if(c<=16){			//red
		// r 228+, g/b <= 10
		red=random.integer(228,255);
		green=random.integer(0,10);
		blue=random.integer(0,10);
	}else if (c>=17 && c<=24){	//yellow
		// r/g equal (+/-3), 228+, b <= 10
		red=random.integer(228,255);
		green=red+random.integer(-3,3);
		if (green>255) green=255;
		blue=random.integer(0,10);
	}else if (c>=25 && c<=27){	//blue
		// r/g <= 10, b 200+
		red=random.integer(0,10);
		green=random.integer(0,10);
		blue=random.integer(200,255);
	}else if (c>=28 && c<=31){	//orange
		// r 200+, g 165+, b <= 10
		red=random.integer(200,255);
		green=random.integer(165,255);
		blue=random.integer(0,10);
	}else if (c==32){	//aqua
		// r <= 10, g/b equal 228+ (+/-3)
		red=random.integer(0,10);
		green=random.integer(228,255);
		blue=green+random.integer(-3,3);
		if (blue>255) blue=255;
	}
	var color=[red,green,blue,1];
	Planetoid.call(this,random.number(6000,13000),x,y,color,rotationSpeed,name);
	this.type="Star";
};

var Ship=function(Vessel,x,y,rotation,rotationSpeed,name){
	// a Ship can be player controlled
	Body.call(this,x,y,rotationSpeed,name);
	this.type="Ship";

	this.Parts=Vessel.Parts;
	this.mass=Vessel.mass;
	this.centerOfMass=Vessel.centerOfMass;

	rotation? this.rotation=rotation : this.rotation=0;
};

Ship.prototype.updateMass=function(){
	var M=0;
	forEach(this.Parts,function(b){
		M+=b.mass;
	});
	if (isNaN(M)) M=0;
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

console.log("Constructors (objects.js) loaded.");
