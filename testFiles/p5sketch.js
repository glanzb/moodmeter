var socket = io();

var width;
var height;

function setup() {
	//noStroke();
	width = 800;
	height = 600;
  	createCanvas(width,height);
  	strokeWeight(4);
  	background(160,160,160)
  	noLoop();
}

function draw() {
	socket.on('data', function(wordData){
		if(wordData.total%1 === 0){
			if(wordData.wordChanged == 'happy') stroke(255,255,0);
			if(wordData.wordChanged == 'sad')  stroke(20,20,255);
			if(wordData.wordChanged == 'good') stroke(255,255,255);
			if(wordData.wordChanged == 'bad')  stroke(250,0,0);
			strokeWeight(random(50)+10);
			fill(0,0,0,0);
			point(random(width), random(height),2, 2);
		}
	})
}

function one() {}