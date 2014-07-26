/*
	Copyright 2013-2014 Paul Liverman III

	This file is part of Jenjens.

	Jenjens is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Jenjens is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with Jenjens.  If not, see <http://www.gnu.org/licenses/>.
*/
var Jenjens={
	color:{
		//FORMAT
		//	//any kind of color thingie
		//RETURNS
		//	[r,g,b]
		toRGBarray: 		function(c){
			throw "Error: Jenjens.color.toRGBarray() has not been written yet";
			//make this make [r,g,b] objects
		},
		//FORMAT
		//	[r,g,b]
		//	[r,g,b,a]
		//	{r:r,g:g,b:b}
		//	"rgb(r,g,b)"
		//	"rgba(r,g,b,a)"
		//	"#rgb" hex, short or long form
		//	CSS color name (string)
		//RETURNS
		//	7 character hex string (ex. "#123ABC")
		toHex:				function(c){
			if (c[0]!=null) return Jenjens.color.rgbComponentsToHex({r:c[0],g:c[1],b:c[2]});
			if (c.r!=null) return Jenjens.color.rgbComponentsToHex(c);
			if (c.substr(0,3)=='rgb') return Jenjens.color.rgbStringToHex(c);
			if (c.charAt(0)=='#') {
				if (c.length<7) return Jenjens.color.shortHexToHex(c);
				return c;
			}
			return Jenjens.color.nameToHex(c);
		},
		//FORMAT
		//	{r:r,g:g,b:b}
		//RETURNS
		//	7 character hex string (ex. "#123ABC")
		rgbComponentsToHex:	function(obj){
			return "#"+
			Jenjens.string.pad(obj.r.toString(16),2)+
			Jenjens.string.pad(obj.g.toString(16),2)+
			Jenjens.string.pad(obj.b.toString(16),2);
		},
		//FORMAT
		//	"rgb(r,g,b)"
		//	"rgba(r,g,b,a)"
		//RETURNS
		//	7 character hex string (ex. "#123ABC")
		rgbStringToHex:		function(str){
			throw "Error: Jenjens.color.rgbStringToHex() is broken";
			/* BEGIN OLD CODE
			//THIS FUNCTION IS REALLY WEIRDLY BUGGERED
			//console.log("str charAt(3): "+str.charAt(3));
			if (str.charAt(3=='(')){
				//console.log("str charAt(4): "+str.charAt(4));
				str=str.slice(4,str.length-1);
			} else {
				//console.log("str charAt(5): "+str.charAt(5));
				str=str.slice(5);}
			str=str.split(',');	return "#"+
			string.pad(str[0].toString(16),2)+
			string.pad(str[1].toString(16),2)+
			string.pad(str[2].toString(16),2);
			   END OLD CODE */
		},
		//FORMAT
		//	4 character hex string (ex. "#1B2")
		//RETURNS
		//	7 character hex string (ex. "#123ABC")
		shortHexToHex:		function(sHex){
			return "#"+sHex.charAt(1)+sHex.charAt(1)+
				sHex.charAt(2)+sHex.charAt(2)+
				sHex.charAt(3)+sHex.charAt(3);
		},
		//FORMAT
		//	CSS color name (string)
		//RETURNS
		//	7 character hex string (ex. "#123ABC")
		nameToHex:			function(c){
			switch(c.toLowerCase()) {
				case "aliceblue":	return "#F0F8FF";
				case "antiquewhite":return "#FAEBD7";
				case "aqua":		return "#00FFFF";
				case "aquamarine":	return "#7FFFD4";
				case "azure":		return "#F0FFFF";
				case "beige":		return "#F5F5DC";
				case "bisque":		return "#FFE4C4";
				case "black":		return "#000000";
				case "blanchedalmond":return "#FFEBCD";
				case "blue":		return "#0000FF";
				case "blueviolet":	return "#8A2BE2";
				case "brown":		return "#A52A2A";
				case "burlywood":	return "#DEB887";
				case "cadetblue":	return "#5F9EA0";
				case "chartreuse":	return "#7FFF00";
				case "chocolate":	return "#D2691E";
				case "coral":		return "#FF7F50";
				case "cornflowerblue":return "#6495ED";
				case "cornsilk":	return "#FFF8DC";
				case "crimson":		return "#DC143C";
				case "cyan":		return "#00FFFF";
				case "darkblue":	return "#00008B";
				case "darkcyan":	return "#008B8B";
				case "darkgoldenrod":return "#B8860B";
				case "darkgrey":	// not real color
				case "darkgray":	return "#A9A9A9";
				case "darkgreen":	return "#006400";
				case "darkkhaki":	return "#BDB76B";
				case "darkmagenta":	return "#8B008B";
				case "darkolivegreen":return "#556B2F";
				case "darkorange":	return "#FF8C00";
				case "darkorchid":	return "#9932CC";
				case "darkred":		return "#8B0000";
				case "darksalmon":	return "#E9967A";
				case "darkseagreen":return "#8FBC8F";
				case "darkslateblue":return "#483D8B";
				case "darkslategrey":// not real color
				case "darkslategray":return "#2F4F4F";
				case "darkturquoise":return "#00CED1";
				case "darkviolet":	return "#9400D3";
				case "deeppink":	return "#FF1493";
				case "deepskyblue":	return "#00BFFF";
				case "dimgrey":		// not real color
				case "dimgray":		return "#696969";
				case "dodgerblue":	return "#1E90FF";
				case "firebrick":	return "#B22222";
				case "floralwhite":	return "#FFFAF0";
				case "forestgreen":	return "#228B22";
				case "fuchsia":		return "#FF00FF";
				case "gainsboro":	return "#DCDCDC";
				case "ghostwhite":	return "#F8F8FF";
				case "gold":		return "#FFD700";
				case "goldenrod":	return "#DAA520";
				case "grey":		// not real color
				case "gray":		return "#808080";
				case "green":		return "#008000";
				case "greenyellow":	return "#ADFF2F";
				case "honeydew":	return "#F0FFF0";
				case "hotpink":		return "#FF69B4";
				case "indianred":	return "#CD5C5C";
				case "indigo":		return "#4B0082";
				case "ivory":		return "#FFFFF0";
				case "khaki":		return "#F0E68C";
				case "lavender":	return "#E6E6FA";
				case "lavenderblush":return "#FFF0F5";
				case "lawngreen":	return "#7CFC00";
				case "lemonchiffon":return "#FFFACD";
				case "lightblue":	return "#ADD8E6";
				case "lightcoral":	return "#F08080";
				case "lightcyan":	return "#E0FFFF";
				case "lightgoldenrodyellow":return "#FAFAD2";
				case "lightgrey":	// not real color
				case "lightgray":	return "#D3D3D3";
				case "lightgreen":	return "#90EE90";
				case "lightpink":	return "#FFB6C1";
				case "lightsalmon":	return "#FFA07A";
				case "lightseagreen":return "#20B2AA";
				case "lightskyblue":return "#87CEFA";
				case "lightslategrey":// not real color
				case "lightslategray":return "#778899";
				case "lightsteelblue":return "#B0C4DE";
				case "lightyellow":	return "#FFFFE0";
				case "lime":		return "#00FF00";
				case "limegreen":	return "#32CD32";
				case "linen":		return "#FAF0E6";
				case "magenta":		return "#FF00FF";
				case "maroon":		return "#800000";
				case "mediumaquamarine":return "#66CDAA";
				case "mediumblue":	return "#0000CD";
				case "mediumorchid":return "#BA55D3";
				case "mediumpurple":return "#9370DB";
				case "mediumseagreen":return "#3CB371";
				case "mediumslateblue":return "#7B68EE";
				case "mediumspringgreen":return "#00FA9A";
				case "mediumturquoise":return "#48D1CC";
				case "mediumvioletred":return "#C71585";
				case "midnightblue":return "#191970";
				case "mintcream":	return "#F5FFFA";
				case "mistyrose":	return "#FFE4E1";
				case "moccasin":	return "#FFE4B5";
				case "navajowhite":	return "#FFDEAD";
				case "navy":		return "#000080";
				case "oldlace":		return "#FDF5E6";
				case "olive":		return "#808000";
				case "olivedrab":	return "#6B8E23";
				case "orange":		return "#FFA500";
				case "orangered":	return "#FF4500";
				case "orchid":		return "#DA70D6";
				case "palegoldenrod":return "#EEE8AA";
				case "palegreen":	return "#98FB98";
				case "paleturquoise":return "#AFEEEE";
				case "palevioletred":return "#DB7093";
				case "papayawhip":	return "#FFEFD5";
				case "peachpuff":	return "#FFDAB9";
				case "peru":		return "#CD853F";
				case "pink":		return "#FFC0CB";
				case "plum":		return "#DDA0DD";
				case "powderblue":	return "#B0E0E6";
				case "purple":		return "#800080";
				case "red":			return "#FF0000";
				case "rosybrown":	return "#BC8F8F";
				case "royalblue":	return "#4169E1";
				case "saddlebrown":	return "#8B4513";
				case "salmon":		return "#FA8072";
				case "sandybrown":	return "#F4A460";
				case "seagreen":	return "#2E8B57";
				case "seashell":	return "#FFF5EE";
				case "sienna":		return "#A0522D";
				case "silver":		return "#C0C0C0";
				case "skyblue":		return "#87CEEB";
				case "slateblue":	return "#6A5ACD";
				case "slategrey":	// not real color
				case "slategray":	return "#708090";
				case "snow":		return "#FFFAFA";
				case "springgreen":	return "#00FF7F";
				case "steelblue":	return "#4682B4";
				case "tan":			return "#D2B48C";
				case "teal":		return "#008080";
				case "thistle":		return "#D8BFD8";
				case "tomato":		return "#FF6347";
				case "turquoise":	return "#40E0D0";
				case "violet":		return "#EE82EE";
				case "wheat":		return "#F5DEB3";
				case "white":		return "#FFFFFF";
				case "whitesmoke":	return "#F5F5F5";
				case "yellow":		return "#FFFF00";
				case "yellowgreen":	return "#9ACD32";
				default:
				console.log("Error: Invalid color name: "+c);
				return "#FFFFFF";
			}
		},
		//FORMAT
		//	ADD STUFF
		//RETURNS
		//	{r:r,g:g,b:b}
		toRGBcomponents: 	function(c){
			throw "Error: Jenjens.color.toRGBcomponents() has not been made";
			//make this take any color (like the toHex) and convert to {r:r,g:g,b:b}
		},
		//FORMAT
		//	7 character hex string (ex. "#123ABC")
		//RETURNS
		//	{r:r,g:g,b:b}
		hexToRGBcomponents:	function(hex){
			return {r:parseInt("0x"+hex.substr(1,2)),
					g:parseInt("0x"+hex.substr(3,2)),
					b:parseInt("0x"+hex.substr(5,2))};
		},
		//FORMAT
		//	7 character hex string (ex. "#123ABC")
		//	AND alpha value (between 0 and 1)
		//RETURNS
		//	{r:r,g:g,b:b,a:a}
		hexToRGBAcomponents:function(hex,a){
			return {r:parseInt("0x"+hex.substr(1,2)),
					g:parseInt("0x"+hex.substr(3,2)),
					b:parseInt("0x"+hex.substr(5,2)),
					a:a};
		},
		//FORMAT
		//	{r:r,g:g,b:b}
		//RETURNS
		//	"rgb(r,g,b)"
		parseRGBcomponents:	function(obj){return "rgb("+obj.r+','+obj.g+','+obj.b+')';},
		//FORMAT
		//	{r:r,g:g,b:b,a:a}
		//RETURNS
		//	"rgba(r,g,b,a)"
		parseRGBAcomponents:function(obj){return "rgba("+obj.r+','+obj.g+','+obj.b+','+obj.a+')';},
		//FORMAT
		//	r,g,b
		//RETURNS
		//	"rgb(r,g,b)"
		parseRGB:			function(r,g,b){return "rgb("+r+','+g+','+b+')';},
		//FORMAT
		//	r,g,b,a
		//RETURNS
		//	"rgba(r,g,b,a)"
		parseRGBA:			function(r,g,b,a){return "rgba("+r+','+g+','+b+','+a+')';}
		//hexToRGB? hexToRGBA? invertColor (r=255-r etc)?
	},
	Math:{
		Tau:Math.PI*2,
		//FORMAT
		//	two objects with {x:x,y:y} properties
		//RETURNS
		//	distance between them
		getDistance:function(A,B){
			var Dx=A.x-B.x;		var Dy=A.y-B.y;
			return Math.sqrt(Dx*Dx+Dy*Dy);
		},
		//FORMAT
		//	radians
		//RETURNS
		//	degrees
		toDegrees:	function(radians){return radians*180/Math.PI;},
		//FORMAT
		//	degrees
		//RETURNS
		//	radians
		toRadians:	function(degrees){return degrees*Math.PI/180;},
		//FORMAT
		//	x / y values OR magnitude/direction (with polar=true)
		//	also accepts a Jenjens.Math.Vector() object or Jenjens.physics.vector() object
		//RETURNS
		//	A Jenjens.Math.Vector() object
		//	Methods: toPolar(), toCartesian(), add(), subtract(),
		//	getXcomponent(), getYcomponent(), getMagnitude(), getDirection()
		Vector:		function(a,b,polar){
			//create Vector
			if (polar) {
				!a? this.magnitude=0 : this.magnitude=a;
				!b? this.direction=0 : this.direction=b;
			} else {
				!a? this.Vx=0 : this.Vx=a;
				!b? this.Vy=0 : this.Vy=b;
			}

			//if a is Vector obj, copy it
			if (a!=undefined) {
				if (a.x!=undefined) {
					this.Vx=a.x;	this.Vy=a.y;
				}
				if (a.Vx!=undefined) {
					this.Vx=a.Vx;	this.Vy=a.Vy;
				}
				if (a.magnitude!=undefined) {
					this.magnitude=a.magnitude;	this.direction=a.direction;
				}
			}

			this.toPolar=function(){
				this.magnitude=Math.sqrt(this.Vx*this.Vx+this.Vy*this.Vy);
				this.direction=Math.atan2(this.Vy,this.Vx);
				delete this.Vx;	delete this.Vy;
			};
			this.toCartesian=function(){
				this.Vx=Math.cos(this.direction)*this.magnitude;
				this.Vy=Math.sin(this.direction)*this.magnitude;
				delete this.magnitude;	delete this.direction;
			};
			this.add=function(v){
				if (this.Vx!=undefined) {
					if (v.Vx!=undefined) {
						this.Vx+=v.Vx;	this.Vy+=v.Vy;
					} else {
						this.Vx+=Math.cos(v.direction)*v.magnitude;
						this.Vy+=Math.sin(v.direction)*v.magnitude;
					}
				} else {
					if (v.Vx!=undefined) {
						this.Vx=Math.cos(this.direction)*this.magnitude+v.Vx;
						this.Vy=Math.sin(this.direction)*this.magnitude+v.Vy;
						this.toPolar();
					} else {
						this.Vx=Math.cos(this.direction)*this.magnitude+Math.cos(v.direction)*v.magnitude;
						this.Vy=Math.sin(this.direction)*this.magnitude+Math.sin(v.direction)*v.magnitude;
						this.toPolar();
					}
				}
			};
			this.subtract=function(v){
				if (v.Vx!=undefined) {
					this.add({Vx:-v.Vx,Vy:-v.Vy});
				} else {
					this.add({magnitude:-v.magnitude,direction:v.direction});
				}
			};
			this.getXcomponent=function(){
				if (this.Vx!=undefined) return this.Vx;
				return Math.cos(this.direction)*this.magnitude;
			};
			this.getYcomponent=function(){
				if (this.Vy!=undefined) return this.Vy;
				return Math.sin(this.direction)*this.magnitude;
			};
			this.getMagnitude=function(){
				if (this.magnitude!=undefined) return this.magnitude;
				return Math.sqrt(this.Vx*this.Vx+this.Vy*this.Vy);
			};
			this.getDirection=function(){
				if (this.direction!=undefined) return this.direction;
				return Math.atan2(this.Vy,this.Vx);
			};
		}
	},
	physics:{
		G:6.67384e-11,
		timeStep:1,
		//FORMAT
		//	a and b, two objects with x/y location, mass value,
		//	and v Jenjens.physics.vector() object (x/y velocity)
		//RETURNS
		//	nothing
		applyGravity:function(a,b){
			var Nx=false;	var Ny=false;	//flags for fixing direction of gravity
			var Dx=a.x-b.x;	var Dy=a.y-b.y;	//relative distance
			var Ds=Dx*Dx+Dy*Dy;				//distance squared
			if (Ds==0) return;				//if exact same spot, do nothing
			if (Dx<0) {Nx=true;Dx=-Dx;}		//fix negative distance for calculations
			if (Dy<0) {Ny=true;Dy=-Dy;}

			var g=Jenjens.physics.G*b.mass/Ds;	//gravitational acceleration
			var Ax=Dx*g/(Dx+Dy);				//split acceleration into X/Y
			var Ay=g-Ax;
			if (Nx) Ax=-Ax;	if (Ny) Ay=-Ay;		//fix acceleration direction
			a.v.x-=Ax*Jenjens.physics.timeStep;	//apply acceleration
			a.v.y-=Ay*Jenjens.physics.timeStep;

			g=Jenjens.physics.G*a.mass/Ds;		//gravitational acceleration
			Ax=Dx*g/(Dx+Dy);	Ay=g-Ax;		//split acceleration into X/Y
			if (Nx) Ax=-Ax;	if (Ny) Ay=-Ay;		//fix acceleration direction
			b.v.x+=Ax*Jenjens.physics.timeStep;	//apply acceleration
			b.v.y+=Ay*Jenjens.physics.timeStep;
		},
		//FORMAT
		//	objects with x/y locations, mass values,
		//	v Jenjens.physics.vector() object for velocity
		//RETURNS
		//	nothing, sets child in roughly circular orbit of parent,
		//	retrograde changes direction of orbit if true
		setOrbit:function(parent,child,retrograde){
			var Nx=false;	var Ny=false;	//flags for negatives
			var Dx=parent.x-child.x;		//get distance
			var Dy=parent.y-child.y;
			if (Dx<0){Nx=true;Dx=-Dx;}		//fix signs for calculations
			if (Dy<0){Ny=true;Dy=-Dy;}
			var distance=Math.sqrt(Dx*Dx+Dy*Dy);
			var velocity=Math.sqrt(Jenjens.physics.G*parent.mass/distance);
			var Ax=Dx*velocity/(Dx+Dy);		//split velocity into x/y
			var Ay=velocity-Ax;
			if (!retrograde){				//make orbits counterclockwise
				if (Nx) Ax=-Ax;
				if (Ny) Ay=-Ay;}
			child.v.x=-Ay+parent.v.x;		//apply at right angle to balance against gravity
			child.v.y=Ax+parent.v.y;
		},
		//FORMAT
		//	array of objects with x/y locations, mass values
		//RETURNS
		//	object with x/y values of center of mass of array
		calculateBarycenter:function(){
			var B={x:0,y:0}; var totalMass=0;		//position and temporary totalMass
			Jenjens.util.forEach(array,function(a){	//weight x/y against mass
				B.x+=a.mass*a.x;
				B.y+=a.mass*a.y;
				totalMass+=a.mass;
			});
			B.x/=totalMass;	B.y/=totalMass;	//fix weighted values to actual values
			return B;
		},
		//FORMAT
		//	object with x/y location, v.x/v.y velocity, rotation & rotationSpeed
		//	rotation/rotationSpeed are optional, as well as v.x/v.y
		//RETURNS
		//	nothing, but the object is adjusted by Jenjens.physics.timeStep with
		//	values specified within it, and lastX/lastY/lastRotation are set
		updateLocation:function(o){
			//save last position
			o.lastX=o.x;	o.lastY=o.y;
			//angular velocity
			if (o.rotationSpeed!=null){
				o.lastRotation=o.rotation;
				o.rotation+=o.rotationSpeed*physics.timeStep;
				if (o.rotation>0){
					while(o.rotation>Math.Tau) o.rotation-=Math.Tau;
				} else {
					while(o.rotation<-Math.Tau) o.rotation+=Math.Tau;
				}
			}
			//velocity vector
			if (o.v.x!=null){
				o.x+=o.v.x*Jenjens.physics.timeStep;
				o.y+=o.v.y*Jenjens.physics.timeStep;
			}
		},
		radialCollision:function(a,b){
			var x=a.x-b.x;	var y=a.y-b.y;
			var D=Math.sqrt(x*x+y*y);
			if (D<a.radius+b.radius) return true;
			return false;
		},
		/* MORE PHYSICS STUFF TO ADD
function getOrbitalVelocity(parent,child) {
	if (child.x!=undefined) {
		var Dx=parent.x-child.x;
		var Dy=parent.y-child.y;
		var distance=Math.sqrt(Dx*Dx+Dy*Dy);
	} else {
		var distance=child;}
	var velocity=G*parent.mass/distance;
	if (isNaN(velocity)) return 0;
	return Math.sqrt(Math.abs(velocity));}
function getSemiMajorAxis(parent,child) {
	var tmp=new Vector(child);
	tmp.subtractVector(parent);
	var velocity=tmp.getMagnitude();
	var radius=getDistance(parent,child);
	return -1/(velocity*velocity/G*parent.mass-2/radius);}
function getOrbitalParameters(parent,child) {
	//check for 90 degree angle and return NaN if not
	//90 is Tau/4, -Tau/4, (3Tau/4, -3Tau/4)
	var radius=getDistance(parent,child);
	var SMA=getSemiMajorAxis(parent,child);
	if (child.getDirection()==getDirection(parent,child)) {
		//logic to find whether we are at AP or PE
		if (SMA<radius) {
			var AP=radius; //at AP
			var PE=2*SMA-radius;
		} else {
			var PE=radius; //at PE
			var AP=2*SMA-radius;}
		//return all
		return {AP:AP,PE:PE};
	} else {
		return Number.NaN;}}

//these only work at perfect right angles during orbit
// (angle between distance and velocity)
// they also ASSUME you are at the opposite end of the orbit
// they're also identical and kind of pointless
function getApoapsis(parent,child) {return 2*getSemiMajorAxis(parent,child)-getDistance(parent,child);}
function getPeriapsis(parent,child) {return 2*getSemiMajorAxis(parent,child)-getDistance(parent,child);}
//*./
		*/
		//FORMAT
		//	x / y values or pre-existing Jenjens.physics.vector() object
		//	also accepts a Jenjens.Math.Vector() object
		//RETURNS
		//	Jenjens.physics.vector() object
		//	Methods: add(), subtract(),
		//	getXcomponent(), getYcomponent(), getMagnitude(), getDirection()
		vector:function(x,y,polar){
			if (polar) { //x is magnitude, y is direction
				this.x=Math.cos(y)*x;
				this.y=Math.sin(y)*x;
			} else {
				x? this.x=x : this.x=0;
				y? this.y=y : this.y=0;
			}
			if (x){
				if (x.x!=undefined){this.x=x.x;this.y=x.y;}
				//Jenjens.Math.Vector()
				if (x.Vx!=undefined){this.x=x.Vx;this.y=x.Vy;}
				if (x.magnitude!=undefined){this.x=x.getXcomponent();this.y=x.getYcomponent();}
			}
			//methods
			this.add=function(v){this.x+=v.x;this.y+=v.y;};
			this.subtract=function(v){this.x-=v.x;this.y-=v.y;};
			this.getXcomponent=function(){return x;};
			this.getYcomponent=function(){return y;};
			this.getMagnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y);};
			this.getDirection=function(){return Math.atan2(this.y,this.x);};
		}
	},
	string:{
		//FORMAT
		//	str			string to pad (required)
		//	len			length to pad to (required)
		//	character	character to pad with (default "0")
		//	rightPad	boolean, pad from right? (default false)
		//RETURNS
		//	padded string
		pad:	function(str,len,character,rightPad){
			if (character==undefined) character='0';
			if (len==undefined) throw "string.pad(str,len): len undefined, check your arguments";
			while (str.length<len){rightPad ? str+=character : str=character+str;}
			return str;
		}
	},
	random:{
		number:function(min,max){return Math.random()*(max-min)+min;},
		integer:function(min,max){return Math.floor(Math.random()*(max-min+1))+min;},
		color:"temp value"
		//number, integer, color, name
	},
	render:{
		canvas:[],
		context:[],
		//FORMAT
		//	id - id of canvas element on page to add to render array
		//RETURNS
		// object: {canvas,context} containing references to the objects
		addByID:function(id){
			Jenjens.render.canvas.push(document.getElementById(id));
			Jenjens.render.context.push(Jenjens.render.canvas[Jenjens.render.canvas.length-1].getContext('2d'));
			return {canvas:Jenjens.render.canvas[Jenjens.render.canvas.length-1],context:Jenjens.render.context[Jenjens.render.context.length-1]};
		}
	},
	structure:{
		//FORMAT
		//	radius,x,y,color all have defaults, color must be a CSS acceptable string
		//RETURNS
		//	Circle() object, with fill() method to draw it on a specified context,
		//	defaults to Jenjens.render.context[0]
		Circle:function(radius,x,y,color){
			!radius ? this.radius=1 : this,radius=radius;
			!x ? this.x=0 : this.x=x;
			!y ? this.y=0 : this.y=y;
			!color ? this.color=Jenjens.debug.defaultColor : this.color=color;

			this.fill=function(context){
				if (!context) context=Jenjens.render.context[0]; //default changed to zero
				context.beginPath();
				context.arc(this.x,this.y,this.radius,0,Jenjens.Math.Tau);
				context.fillStyle=this.color;
				context.fill();
			};
		}
	},
	io:{
		addEvent:	function(event,handler,element){
			if (!element) element=document;
			if (element.addEventListener)
				element.addEventListener(event,handler,false);
			else
				element.attachEvent('on'+event,handler);
		},
		keysHeld:[],
		keyDown:	function(evemt){
			var code=event.keyCode? event.keyCode : event.charCode;
			io.keysHeld[code]=true;
		},
		keyUp:		function(evemt){
			var code=event.keyCode? event.keyCode : event.charCode;
			io.keysHeld[code]=false;
		},
		getMouseX:	function(event){
			var x=0;
			if (event.clientX && document.body && document.body.scrollLeft!=null) {x=event.clientX+document.body.scrollLeft;
			} else if (event.clientX && document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.scrollLeft!=null) {
				x=event.clientX+document.documentElement.scrollLeft;
			} else if (event.pageX) {x=event.pageX;}	return x;
		},
		getMouseY:	function(event){
			var y=0;
			if (event.clientY && document.body && document.body.scrollTop!=null) {y=event.clientY+document.body.scrollTop;
			} else if (event.clientY && document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.scrollTop!=null) {
				y=event.clientY+document.documentElement.scrollTop;
			} else if (event.pageY) {y=event.pageY;}	return y;
		}
	},
	util:{
		//FORMAT
		//	array	array to apply actions to all elements
		//	action	a function with a single variable which will be the current element
		//EXAMPLE
		//	forEach(["cheese","bread"],function(b){console.log(b);});
		//	This will log each element to the console.
		forEach:		function(array,action){
			for (var i=0;i<array.length;i++)
				action(array[i]);
		},
		//STUFF ABOUT IT HERE
		//basically same, but also gives you current index number
		forEach2:		function(array,action){
			for (var i=0;i<array.length;i++)
				action(array[i],i);
		},
		//FORMAT
		//	array	array with elements to compare
		//	action	a function with two variables which will be the two elements being compared
		//EXAMPLE
		//	forEachCompare(["text here","something"],function(a,b){a>b?console.log(a):console.log(b);});
		//	This will output the larger of every two elements that can be compared to the console.
		//	Which is REALLY pointless, but shhh.
		forEachCompare:	function(array,action){
			for (var i=0;i<array.length-1;i++)
				for (var j=i+1;j<array.length;j++)
					action(array[i],array[j]);
		},
		//FORMAT
		//	function to repeat
		//	timing to use
		//RETURNS
		//	 an Interval object
		//METHODS
		//	start(),stop(),
		//	incDelay(),decDelay(),
		//	restart()
		Interval:		function(funct,timing){
			this.funct=funct;
			this.timing=timing;
			this.id=null;
			this.running=false;
			this.start=function(){
				if (!this.running){
					this.id=setInterval(this.funct,this.timing);
					this.running=true;
				}
			};
			this.stop=function(){
				if (this.running){
					clearInterval(this.id);
					this.running=false;
				}
			};
			/*this.resume=this.start;
			this.pause=this.stop;*/
			this.incDelay=function(amt){
				if (amt==undefined) amt=1;
				this.timing+=amt;	if (this.running) this.restart();
			};
			this.decDelay=function(amt){
				if (amt==undefined) amt=1;
				this.timing-=amt;	if (this.running) this.restart();
			};
			/*this.incSpeed=this.decDelay;
			this.decSpeed=this.incDelay;*/
			this.restart=function(){
				if (this.running) clearInterval(this.id);
				this.id=setInterval(this.funct,this.timing);
				this.running=true;
			};
		},
		Timer:{
			//FORMAT
			//	function AND time to execution
			//RETURNS
			//	reference ID for Timeout
			set:function(funct,time){return setTimeout(funct,time);},
			//FORMAT
			//	reference ID for Timeout to clear
			cancel:function(ref){clearTimeout(ref);}
		}
	},
	debug:{
		engineVersion:	0.08,
		defaultColor:	'#FFF',
		showClicks:		function(event){
			var x=Jenjens.io.getMouseX(event);
			var y=Jenjens.io.getMouseY(event);
			switch(event.button){
				case 0: //left, red
					Jenjens.render.context[0].fillStyle='#F00';
					break;
				case 1: //middle, green
					Jenjens.render.context[0].fillStyle='#0F0';
					break;
				case 2: //right, blue
					Jenjens.render.context[0].fillStyle='#00F';
					break;
				default: //other, white
					Jenjens.render.context[0].fillStyle='#FFF';
					console.log('Jenjens.io.debug.showClicks(): unrecognized mouse button: '+event.button,"4/5 are usually back/forward buttons.");
			}
			Jenjens.render.context[0].beginPath();
			Jenjens.render.context[0].arc(x,y,1,0,Jenjens.Math.Tau);
			Jenjens.render.context[0].fill();
		},
	}
};
//temp
/*window.onload=function(){
	Jenjens.render.canvas[0]=document.createElement('canvas');
	Jenjens.render.context[0]=Jenjens.render.canvas[0].getContext('2d');
	//document.body.appendChild(Jenjens.render.canvas[0]);
	document.getElementsByTagName('body')[0].appendChild(Jenjens.render.canvas[0]);
	Jenjens.render.canvas[0].width=window.innerWidth;
	Jenjens.render.canvas[0].height=window.innerHeight;
	Jenjens.io.addEvent('click',Jenjens.debug.showClicks);
}*/
