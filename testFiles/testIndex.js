var pattern = null;

$(function(){

	var socket = io();
      // $('form').submit(function(){
      //   socket.emit('input', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });


	var colorFunc = function(x, y) {
    		return 'hsl('+Math.floor(Math.abs(x*y)*360)+',70%,60%)';
	};
	

	socket.on('data', function(wordData){

		if(wordData.total % 5 === 0){
			//console.log(wordData);
			$('#data').text("");
			$('#data').text(JSON.stringify(wordData));
			var hFreq = wordData.wordsFreq['happy'];
			pattern = Trianglify({
				height: 600,
				width: 600,
				cell_size: 50,
				seed: 'gn26p',
				color_function: function(x, y) {
								return 'hsl(' + Math.floor((x)*(hFreq*10)) + ',70%,60%)';
								}
			});

			
			//console.log(hFreq);
			// pattern.cell_size = Math.floor(Math.random()*100);
			//console.log('pattern.cell_size: '+ pattern.cell_size);
			pattern.color_function = function(x, y) {
			return 'hsl(' + Math.floor(Math.abs(x*y)*(hFreq*20)) + 
				',70%,60%)';
			};
			$("svg").remove();
			$("body").append(pattern.svg());
		}
  	});

});
