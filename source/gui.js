console.log("GUI loading.");

// This system is a temporary GUI intended for use during development only.
// In the finished version any dat.GUI objects should be from other files and have nothing to do with this file.
// This file and what it does is completely optional.
var gui={
	inspectorEnabled:false
};
var GUI={
	load:function(){
		//check if everything else loaded, else wait 10th of a second
		if (typeof(dat)==='undefined' || typeof(Game)==='undefined' || typeof(Game.system)==='undefined' || typeof(Render)==='undefined') {
			console.log("GUI not ready.");
			setTimeout(GUI.load,100);
			return;
		}
		//set up the dat.GUI
		gui.main=new dat.GUI();
		gui.main.remember(Game);
		gui.main.remember(Render);
		gui.main.remember(physics);
		gui.main.add(Game.system,'focusID').name("Player Focus ID");

		//Functions
		gui.functions=gui.main.addFolder('Functions');
		gui.functions.add(Game,'running').onChange(function(v){if(v)Game.loop();});
		gui.functions.add(Game,'generateNewSystem').name("New System").onChange(function(){Render.redraw();});
		gui.functions.add(Game,'generateAsteroids').name("Random Asteroids");
		gui.functions.add(gui,'inspectorEnabled').onChange(function(){
			if(gui.inspectorEnabled)
				GUI.activateInspector();
			else
				gui.inspector.destroy();
		});
		//gui.functions.add(Render,'redraw');

		//Render Settings
		gui.render=gui.main.addFolder('Render Settings');
		gui.render.add(Render,'iterationDelay',{Max:1,'60':17,'30':33,'10':100,Min:2000}).name("FPS");
		gui.render.add(Render,'renderType',{normal:'normal','pseudo 3D':'3D','1D':'side'}).onChange(function(){Render.redraw();});
		gui.render.add(Render,'angle3D',0,360).step(1).name("3D Angle").onChange(function(){Render.redraw();});
		gui.render.add(Render,'fade');
		gui.render.add(Render,'fadeAlpha',0.01,1).step(0.01);
		gui.render.add(Render,'focusType',['body','ship']).onChange(function(){Render.redraw();});
		gui.render.add(Render,'focusID').name("Render Focus ID").onChange(function(){Render.redraw();});
		gui.render.add(Render,'scale',0.5,10).step(0.1).name("Scale (close)").onChange(function(){Render.redraw();});
		gui.render.add(Render,'scale',0.001,0.05).step(0.001).name("Scale (med)").onChange(function(){Render.redraw();});
		gui.render.add(Render,'scale',0.0001,0.001).step(0.0001).name("Scale (far)").onChange(function(){Render.redraw();});
		gui.render.add(Render,'minRadius',0.1,1).step(0.1);//.onChange(function(){Render.redraw();});

		//Physics Settings
		gui.physics=gui.main.addFolder('Physics Settings');
		gui.physics.add(physics,'G',0.1,5).step(0.1).name("Grav Constant");
		gui.physics.add(physics,'timeStep',0.1,5).step(0.1);
		console.log("GUI loaded.");
	},
	activateInspector:function(){
		gui.inspector=new dat.GUI();
		io.addEvent('mousedown',function(e){
			var x=io.getMouseX(e);
			var y=io.getMouseY(e);
		});
		//Render.canvas / Render.context
		//add something so when a body is clicked it is added to the inspector

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
	}
};
GUI.load();
