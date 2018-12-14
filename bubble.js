function Bubble(x,y,r){
	this.x=x;
	this.y=y;
	this.r=r;
}
/*Bubble.prototype.distanceTo=function(bubble){
	var dx=bubble.x-this.x;
	var dy=bubble.y-this.y;
	return Math.sqrt(dx*dx+dy*dy);
}*/
Bubble.prototype.draw=function(){
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	ctx.stroke();
}
function UpdateBubbles(){
	var distance,dx,dy;
	for(var i=0;i<bubbles.length;i++){
		dx=bubbles[i].x-gc.width/2;
		dy=bubbles[i].y-gc.height/2;
		distance=Math.sqrt(dx*dx+dy*dy);
		if(distance>Math.min(gc.height,gc.width)/4){
			bubbles[i].x-=dx/distance*gravitation;
			bubbles[i].y-=dy/distance*gravitation;
		}
		for(var j=i+1;j<bubbles.length;j++){
			dx=bubbles[j].x-bubbles[i].x;
			dy=bubbles[j].y-bubbles[i].y;
			distance=Math.sqrt(dx*dx+dy*dy);
			if(distance<bubbles[i].r+bubbles[j].r){
				bubbles[i].x+=dx/distance*(distance-bubbles[i].r-bubbles[j].r)*elasticity;
				bubbles[i].y+=dy/distance*(distance-bubbles[i].r-bubbles[j].r)*elasticity;
				bubbles[j].x-=dx/distance*(distance-bubbles[i].r-bubbles[j].r)*elasticity;
				bubbles[j].y-=dy/distance*(distance-bubbles[i].r-bubbles[j].r)*elasticity;
			}
		}
	}
}
function update(){
	UpdateBubbles();
	ctx.clearRect(0,0,gc.width,gc.height);
	for(var i=0;i<bubbles.length;i++){
		bubbles[i].draw();
	}
}

var ctx=gc.getContext("2d");
var bubbles=[];
var elasticity=0.6;
var gravitation=0.2;
(function(){
	for(var i=0;i<200;i++){
		var bubble=new Bubble();
		bubble.x=Math.random()*gc.width;
		bubble.y=Math.random()*gc.height;
		bubble.r=Math.random()*28+2;
		bubbles.push(bubble);
	}
	setInterval(update,1000/60);
})();
