$(function(){

	var socket = io();
	var wordData;
	
	socket.on('data', function(wordData){
		$('#data').text("");
		$('#data').text(JSON.stringify(wordData.tweet));			
  	});

	var hFreq = [1, 1];
	socket.on('timedData', function(wordData){
		//console.log(hFreq);
		hFreq.pop();
		hFreq.unshift(wordData.wordsFreq['happy']);
		var i = 0;
		interval(function(){
			var xShift = lerp(hFreq[1], hFreq[0], i);
			i++;
			pattern = Trianglify({
				height: 600,
				width: 1000,
				variance: .5 + ((Math.random()-0.5)/5),
				cell_size: 100,
				seed: 'gn26p',
				color_function: function(x, y) {
					//console.log(y)
					//return 'hsl(' + Math.floor((x*50)+(xShift*10)) + ','+ Math.floor(x/20) +'%,60%)'
					return 'hsl(' + Math.floor((x*20)+(xShift*10)) + ',' + Math.floor((1-y)*40) + '%,'+ (6+(y*50)) + '%)'
				}
			});
			
			$("canvas").remove();
			$("body").append(pattern.canvas());
			
		}, 50, 20);
	});



	function lerp(a,b,t){
		//console.log(t)
		var interp = a + ((t * .1) * (b - a));
		return interp
	};

	function interval(func, wait, times){
	    var interv = function(w, t){
	        return function(){
	            if(typeof t === "undefined" || t-- > 0){
	                setTimeout(interv, w);
	                try{
	                    func.call(null);
	                }
	                catch(e){
	                    t = 0;
	                    throw e.toString();
	                }
	            }
	        };
	    }(wait, times);

	    setTimeout(interv, wait);
	};

});
