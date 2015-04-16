$(function(){

var socket = io();
      // $('form').submit(function(){
      //   socket.emit('input', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });

socket.on('sadTweet', function(twitCount){
  console.log("sad: " + twitCount)
  $('#sad').text("sadCount: " + twitCount.toString());
  //drawBar(twitCount);
});

socket.on('joyTweet', function(twitCount){
  console.log("joy: " + twitCount)
  $('#joy').text("joyCount: " + twitCount.toString());
});

socket.on('jealousTweet', function(twitCount){
  console.log("mad: " + twitCount)
  $('#jealous').text("madCount: " + twitCount.toString());
});

function drawBar(where, width){
	var svg = d3.select("svg");
	var rect = svg.select("rect")
		.data([width])
		.attr("x", 0)
		.attr("y", 100)
		.attr("width", function(d,i){return (d/100)*1000})
		.attr("height", 20)
		.style("fill", "darkblue")
}

});