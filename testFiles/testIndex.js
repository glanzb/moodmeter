$(function(){

var socket = io();
      // $('form').submit(function(){
      //   socket.emit('input', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });

socket.on('data', function(wordData){
  //console.log(wordData);
  $('#data').text("");
  $('#data').text(JSON.stringify(wordData));
  return wordData;
  //drawBar(twitCount);
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