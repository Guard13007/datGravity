console.log("GUI loading.");

var GUI={
	load:function(){
		//check if everything else loaded, else wait 10th of a second
		if (typeof(dat)==='undefined' || typeof(Game)==='undefined' || typeof(Render)==='undefined' || typeof(sys)==='undefined') {
			console.log("GUI not ready.");
			setTimeout(GUI.load,100);
			return;
		}
		//set up the dat.GUI
		gui={};
		gui.main=new dat.GUI();

		//Functions
		gui.functions=gui.main.addFolder('Functions');
		gui.functions.add(Game,'generateNewSystem');
		gui.functions.add(Game,'generateAsteroids');

		//Render Settings
		gui.render=gui.main.addFolder('Render Settings');
		gui.render.add(Render,'iterationDelay',{Max:1,fps_60:16,fps_30:33,fps_10:100,Min:2000});
		gui.render.add(Render,'renderType',{normal:'normal',pseudo_3D:'3D',sideView:'side'});
		gui.render.add(Render,'fade');
		gui.render.add(Render,'fadeAlpha',0.01,1).step(0.01);
		gui.render.add(Render,'focusType',['body','ship']);
		gui.render.add(Render,'focusID');
		gui.render.add(Render,'scale',0.01,10);

		//Physics Settings
		gui.physics=gui.main.addFolder('Physics Settings');
		gui.physics.add(physics,'G',0.1,1).step(0.1);
		gui.physics.add(physics,'timeStep',0.1,1).step(0.1);
		console.log("GUI loaded.");

		//this needs to be redone somehow to account for bodies being removed or added or replaced
		//I HATE THE WAY THIS WORKS
		//Bodies
		gui.bodies=gui.main.addFolder('Bodies');
		gui.bodyArray=[];
		gui.bodyVelocities=[];
		forEach(sys.bodies,function(b){
			gui.bodyArray.push(gui.bodies.addFolder(b.name));
			gui.bodyArray[gui.bodyArray.length-1].add(b,'name');
			gui.bodyArray[gui.bodyArray.length-1].addColor(b,'color');
			gui.bodyArray[gui.bodyArray.length-1].add(b,'mass');
			gui.bodyArray[gui.bodyArray.length-1].add(b,'radius');
			gui.bodyArray[gui.bodyArray.length-1].add(b,'x');
			gui.bodyArray[gui.bodyArray.length-1].add(b,'y');
			gui.bodyVelocities.push(gui.bodyArray[gui.bodyArray.length-1].addFolder('Velocity'));
			gui.bodyVelocities[gui.bodyVelocities.length-1].add(b.v,'x');
			gui.bodyVelocities[gui.bodyVelocities.length-1].add(b.v,'y');
		});

		//gui.main.remember(Game,Render,physics,FUCK THIS WON'T WORK);
		/*gui.remember(Game);
		gui.remember(Render);
		gui.remember(physics);
		//gui.remember(sys.bodies);
		forEach(sys.bodies,function(b){
			gui.remember(b);
			gui.remember(b.v);
		});/**/
	},
	addBody:function(b){
		//do stuff!
	}
};
GUI.load();
