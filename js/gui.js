console.log("GUI loading.");

var GUI={
	load:function(){
		//check if everything else loaded, else wait 10th of a second
		if (typeof(dat)==='undefined' || typeof(Game)==='undefined' || typeof(Game.system)==='undefined' || typeof(Render)==='undefined') {
			console.log("GUI not ready.");
			setTimeout(GUI.load,100);
			return;
		}
		//set up the dat.GUI
		gui={};
		gui.main=new dat.GUI();
		gui.main.remember(Game);
		gui.main.remember(Render);
		gui.main.remember(physics);
		gui.main.add(Game.system,'focusID').name("Player Focus ID");
		//gui.main.remember(Game.system.bodies);

		//Functions
		gui.functions=gui.main.addFolder('Functions');
		var b=gui.functions.add(Game,'running');
		b.onChange(function(v){
			if (v) Game.loop();
		});
		gui.functions.add(Game,'generateNewSystem').name("New System");
		gui.functions.add(Game,'generateAsteroids').name("Random Asteroids");

		//Render Settings
		gui.render=gui.main.addFolder('Render Settings');
		gui.render.add(Render,'iterationDelay',{Max:1,'60':17,'30':33,'10':100,Min:2000}).name("FPS");
		gui.render.add(Render,'renderType',{normal:'normal','pseudo 3D':'3D','1D':'side'});
		gui.render.add(Render,'fade');
		gui.render.add(Render,'fadeAlpha',0.01,1).step(0.01);
		gui.render.add(Render,'focusType',['body','ship']);
		gui.render.add(Render,'focusID').name("Render Focus ID");
		gui.render.add(Render,'scale',0.5,10).step(0.1).name("Scale (close)");
		gui.render.add(Render,'scale',0.001,0.05).step(0.001).name("Scale (med)");
		gui.render.add(Render,'scale',0.0001,0.001).step(0.0001).name("Scale (far)");

		//Physics Settings
		gui.physics=gui.main.addFolder('Physics Settings');
		gui.physics.add(physics,'G',0.1,1).step(0.1).name("Grav Constant");
		gui.physics.add(physics,'timeStep',0.1,1).step(0.1);
		console.log("GUI loaded.");

		//this needs to be redone somehow to account for bodies being removed or added or replaced
		//I HATE THE WAY THIS WORKS
		//Bodies
		/*gui.bodies=gui.main.addFolder('Bodies');
		gui.bodyArray=[];
		gui.bodyVelocities=[];
		forEach(Game.system.bodies,function(b){
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
		});*/
	},
	addBody:function(b){
		//do stuff!
		//not even sure I'm going to use this? it is supposed to add a Body to the GUI,
		//  but we will be removing Bodies from the GUI
	}
};
GUI.load();
