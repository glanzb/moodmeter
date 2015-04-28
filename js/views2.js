// --- Models ---
/*var TriPictures = (function() {
	var TriPic = Backbone.Model.extend({
	});




	  var arr = [];
	    for (elem in Trianglify.colorbrewer) {
	      arr.push(Trianglify.colorbrewer[elem]);
	    }
	  var i = 1; 
      
    var pattern = Trianglify({
        width: 800,//window.innerWidth, //defaults to 600
        height: 600,//window.innerHeight, //defaults to 400
        cell_size: 75, // default
        palette: Trianglify.colorbrewer,
        variance: 0.75, // value between 0 and 1 (inclusive), defaults to 0.75. Specify the amount of randomness used when generating triangles.
        x_colors: arr[i], //'random',
        //y_colors: 'match_x',
        color_space: 'lab',
        color_function: false,//colorFunc, 
        stroke_width: 5.51,
        seed: null //defaults to null. Seeds the random number generator to create repeatable patterns
    });

    var pngURI = pattern.png();
    var data = pngURI.substr(pngURI.indexOf('base64') + 7); // this data is not that data
    	console.log(data);
    	console.log(pngURI);
    var svg = pattern.svg();
    	console.log(pngURI);

    function makePic(pattern){
     	return {
     		pattern:pattern
     	}
    };

	var TriPictures = Backbone.Collection.extend({
		model:TriPic,
		initialize: function() {
			this.pattern=pattern // pattern accesible
		// 	document.getElementById('main').appendChild(pattern.canvas(document.getElementById('picture')));
		// },
		// refresh: function(){
			//var model = this.pattern
			//model.set()
		}
	});

	return TriPictures;
})(); //end IIFE


var Data = Backbone.Model.extend({});
var data = new Data({

	initialize: $(function(){
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
		  //console.log(wordData.text);
		  //drawBar(twitCount);
		});
	})
});*/


// --- Views ---
// var NavView = Backbone.View.extend({
// 	tagName: 'div',
// 	template: template.nav,
// 	// events: {'click': 'click'},
// 	initialize: function(opts){
// 		this.n = opts.n;
// 		this.$el.html(template.nav);
// 		//this.$el.appendTo(opts.$div); 
// 	},
// 	render: function(){

// 	},
// 	// click: function(evt) {
// 	// 	this.collection.refresh(this.n);
// 	// }
// });

var socket = io();
var wordData;

$(function(){	
	socket.on('data', function(wordData){
		$('#data').text("");
		$('#data').text(JSON.stringify(wordData.tweet));			
	});
});		
	
window.setInterval(function(){
	$.get("http://localhost:3000/api", function(data){
		console.log("help");
		console.log(data);
	})

}, 4000)	


var DataView = Backbone.View.extend({
	tagName: 'div',
	template: '',
	id: '#data',
	// events: {'click': 'click'},
	initialize: function(opts){
		
		// this.$el.addClass('#data .setup');
		// this.$el.appendTo('#picture');
		// this.render();
		console.log('DataViewInit');	
		//this.template = _.template($('#tweets').html());
	},


	render: function(){
		console.log('DataViewRender');

		return this;
	},
	
});


var CanvasView = Backbone.View.extend({
	tagName: 'div',

	triangles: function(){

		$(function(){
			var hFreq = [1, 1];
			var gFreq = [1, 1];
			var colorFuncString;

			socket.on('timedData', function(wordData){
				//console.log(hFreq);
				hFreq.pop();
				hFreq.unshift(wordData.wordsFreqProportions['happy_sad']);
				gFreq.pop();
				gFreq.unshift(wordData.wordsFreqProportions['good_bad']);

				var i = 0;

				interval(function(){
					var xShift = lerp(hFreq[1], hFreq[0], i);
					var yShift = lerp(gFreq[1], gFreq[0], i);
					i++;
					pattern = Trianglify({
						height: 400,
						width: 1000,
						variance: .5 + ((Math.random()-0.5)/10),
						cell_size: 100,  //Math.ceil(Math.random()*100),
						seed: 'gn26p',
						color_function: function(x, y) {
							//console.log(y)
							//return 'hsl(' + Math.floor((x*50)+(xShift*10)) + ','+ Math.floor(x/20) +'%,60%)'
							colorFuncString = 'hsl(' + Math.floor((x*50)+(xShift*200)) + ',' + Math.floor((y)*(yShift*500)) + '%,'+ (40+(y*60)) + '%)'
							return colorFuncString
						}
						
					});
					//console.log(xShift);
					$("canvas").remove();
					$("#picture").append(pattern.canvas());
					
				}, 50, 20);

				//////////////////////////////////
				//poster
				//////////////////////////////////

				$.post("http://localhost:3000/api", {time: Date.now(), colorFn: colorFuncString}, function(data){
					if(data === 'done'){
						alert('post')
					};
				});

			})



			function lerp(a,b,t){
				//console.log(t)
				var interp = a + ((t * .15) * (b - a));
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
			                    //throw e.toString();
			                }
			            }
			        };
			    }(wait, times);

			    setTimeout(interv, wait);
			};

		});
	},


	// events: {'click': 'click'},
	initialize: function(opts){
		//this.$el.addClass('#picture .setup');
		this.triangles();
		this.render();
		this.$el.appendTo('#picture');

		//this.n = opts.n;		
		//document.getElementById('main').appendChild(trianglify.pattern.canvas(this.el));
		
		//trianglify.pattern.canvas(this.el);
	},
	render: function(){		
			
		return this;
	},	


			// click: function(evt) {
			// 	this.collection.refresh(this.n);
			// }
});


// var 

var GalleryView = Backbone.View.extend({
	tagName: 'section',
	//model:TriPictures,
	template: template.gallery,
	// events: {'click': 'click'},
	initialize: function(opts){
		this.n = opts.n;
		this.$el.html(template.gallery);
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){
		 // or this.template
		// var self = this;
		// for (var i = 0; i<6; ++i){
		// 	var gallery = TriPictures[i];
		// 	this.$el.append(gallery.$el);
		// 	gallery.render();
		// }
	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

var AboutView = Backbone.View.extend({
	tagName: 'section',
	template: template.about,
	// events: {'click': 'click'},
	
	initialize: function(opts){
		this.n = opts.n;
		this.$el.html(template.about);
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){

	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

var MainView = Backbone.View.extend({
	el: '#main',
	initialize: function() {
		//this.collection.on('change:pattern',this.render,this);
		this.blocks = []; // subviews
		var self = this;		


		var makeSubView = function(id,type){
		
			var opts = {
				collection: self.collection,
				//className: 'container',
				id: id
			}
		
			var newView = new type(opts); // blockview type
			self.blocks.push(newView);
			newView.$el.appendTo(self.$el)
		};


		// makeSubView('nav',NavView);
		
		makeSubView('picture',CanvasView);
		makeSubView('data',DataView);
		makeSubView('gallery',GalleryView);
		makeSubView('about', AboutView);
		
		//this.$el.appendTo('body');	
	},
	render: function() {
		console.log('something happening');

		return this;
	}

});



var page = null, trianglify = null;
function makePage() {
	//trianglify = new TriPictures();
	page = new MainView(); //MainView({collection:trianglify});
	page.render();
		

}
$(makePage);
