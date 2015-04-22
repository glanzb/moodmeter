$(function(){

	var socket = io();
      // $('form').submit(function(){
      //   socket.emit('input', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });
	
	var pattern = Trianglify({
  	height: 300,
 	width: 300,
  	cell_size: 40});

	document.body.appendChild(pattern.canvas());

	socket.on('data', function(wordData){
  //
  		//console.log(wordData);
  		$('#data').text("");
  		$('#data').text(JSON.stringify(wordData));
  		pattern.
	});


});
