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
	rotation=0;
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

console.log("Constructors (objects.js) loaded.");
