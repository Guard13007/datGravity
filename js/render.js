var Render={
	iterationDelay:33,
	renderType:'normal',
	fade:false,
	fadeAlpha:0.03,
	focusType:'ship',
	focusID:0,
	scale:0.8
};

//this should be handled differently
window.onresize=function(){
	sys.canvas.width=window.innerWidth;
	sys.canvas.height=window.innerHeight;
}
