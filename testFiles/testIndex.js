var pattern = null;

$(function(){

	var socket = io();
	var wordData;
	
	socket.on('data', function(wordData){
		if(wordData.total % 10 === 0){
			$('#data').text("");
			$('#data').text(JSON.stringify(wordData));			
		}
  	});

	var hFreq = [1, 1];
	socket.on('timedData', function(wordData){
		console.log(hFreq);
		hFreq.pop();
		hFreq.unshift(wordData.wordsFreq['happy']);
		var i = 0;
		interval(function(){
			var xShift = lerp(hFreq[1], hFreq[0], i);
			i++;
			//console.log(xShift);
			//console.log('xShift: '+ xShift + ' old_hFreq: '+hFreq[1]+' hFreq: '+ hFreq[0]);
			pattern = Trianglify({
				height: 600,
				width: 1000,
				cell_size: 90,
				seed: 'gn26p',
				color_function: function(x, y) {
					return 'hsl(' + Math.floor((x*150)+(xShift*2)) + ',20%,60%)'
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
