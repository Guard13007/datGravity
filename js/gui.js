function GUI(){
	//check if loaded, else wait 10th of a second
	if (!dat || !Game || !Render) {
		console.log("GUI not ready.");
		setTimeout(GUI,100);
		return;
	}
	//set up the GUI
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
}
