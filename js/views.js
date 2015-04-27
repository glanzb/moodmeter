// --- Models ---
var TriPictures = (function() {
	var TriPic = Backbone.Model.extend({
	});

var socket = io();
$(function(){
	var hFreq = [1, 1];
	var gFreq = [1, 1];

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
			var pattern = Trianglify({
				height: 600,
				width: 1000,
				variance: .5 + ((Math.random()-0.5)/10),
				cell_size: 100,
				seed: 'gn26p',
				color_function: function(x, y) {
					//console.log(y)
					//return 'hsl(' + Math.floor((x*50)+(xShift*10)) + ','+ Math.floor(x/20) +'%,60%)'
					return 'hsl(' + Math.floor((x*50)+(xShift*200)) + ',' + Math.floor((y)*(yShift*500)) + '%,'+ (40+(y*60)) + '%)'
				}
			});
			//console.log(xShift);
			$("canvas").remove();
			$("body").append(pattern.canvas());
			
		}, 50, 20);
	});



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
	                    throw e.toString();
	                }
	            }
	        };
	    }(wait, times);

	    setTimeout(interv, wait);
	};

});



	  // var arr = [];
	  //   for (elem in Trianglify.colorbrewer) {
	  //     arr.push(Trianglify.colorbrewer[elem]);
	  //   }
	  // var i = 1; 
      
   //  var pattern = Trianglify({
   //      width: 800,//window.innerWidth, //defaults to 600
   //      height: 600,//window.innerHeight, //defaults to 400
   //      cell_size: 75, // default
   //      palette: Trianglify.colorbrewer,
   //      variance: 0.75, // value between 0 and 1 (inclusive), defaults to 0.75. Specify the amount of randomness used when generating triangles.
   //      x_colors: arr[i], //'random',
   //      //y_colors: 'match_x',
   //      color_space: 'lab',
   //      color_function: false,//colorFunc, 
   //      stroke_width: 5.51,
   //      seed: null //defaults to null. Seeds the random number generator to create repeatable patterns
   //  });

   //  var pngURI = pattern.png();
   //  var data = pngURI.substr(pngURI.indexOf('base64') + 7); // this data is not that data
   //  	console.log(data);
   //  	console.log(pngURI);
   //  var svg = pattern.svg();
   //  	console.log(pngURI);

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
		socket.on('data', function(wordData){
		  //console.log(wordData);
		  $('#data').text("");

		  $('#data').text(JSON.stringify(wordData.tweet));
		  return wordData;
		  //console.log(wordData.text);
		  //drawBar(twitCount);

		});
	})
});



// --- Views ---



var DataView = Backbone.View.extend({
	tagName: 'div',
	template: '',
	// events: {'click': 'click'},
	initialize: function(opts){
		//this.template = _.template($('#tweets').html());
	},
	render: function(){

	},
	
});

var CanvasView = Backbone.View.extend({
	tagName: 'div id="trify"',

	// events: {'click': 'click'},
	initialize: function(opts){
		console.log(trianglify.pattern);
		console.log(this.el);

		var socket = io();
		var hFreq = [1, 1];
		var gFreq = [1, 1];

		socket.on('timedData', function(wordData){
			//console.log(hFreq);
			hFreq.pop();
			hFreq.unshift(wordData.wordsFreqProportions['happy_sad']);
			gFreq.pop();
			gFreq.unshift(wordData.wordsFreqProportions['good_bad']);

			var i = 0;

			interval(function(){
				var xShift = lerp(1-hFreq[1], 1-hFreq[0], i);
				var yShift = lerp(gFreq[1], gFreq[0], i);
				i++;
				pattern = Trianglify({
					height: 600,
					width: 1000,
					variance: .5 + ((Math.random()-0.5)/10),
					cell_size: 100,
					seed: 'gn26p',
					color_function: function(x, y) {
						//console.log(y)
						//return 'hsl(' + Math.floor((x*50)+(xShift*10)) + ','+ Math.floor(x/20) +'%,60%)'
						return 'hsl(' + Math.floor((x*80)+(xShift*400)) + ',' + Math.floor((y*10)+(yShift*80)) + '%,'+ (30+(y*60)) + '%)'
					}
				});
				//console.log(xShift);
				$("canvas").remove();
				$("#picture").append(pattern.canvas());
				
			}, 50, 20);
		});



		function lerp(a,b,t){
			//console.log(t)
			var interp = a + ((t * .05) * (b - a));
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
			
		},
		render: function(){
		}	
		// click: function(evt) {
		// 	this.collection.refresh(this.n);
		// }
		});

// 
var GalleryView = Backbone.View.extend({
  tagName: 'section',
	 template: template.gallery,
  initialize: function (opts) {
    this.$el.html(template.gallery);
  },
  render: function () {
		var galleryTemplate = this.collection.models.forEach(function (template.gallery) {
      outputHtml += template.gallery;
    });
//     var outputHtml = '<section>' +
        '<div class="container">' +
            '<div class="row">' +
                '<div class="col-lg-12 text-center">' +
                    '<h2>Gallery</h2>' +
                    '<hr class="down">' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
			   	'<ul>'+ galleryTemplate + '</ul>'+
			   '</div>' +
	        '</div>' +
		  '</section>'; 
    $(this.el).html(outputHtml);
  }
});



// var GalleryView = Backbone.View.extend({
// 	tagName: 'section',
// 	model:TriPictures,
// 	template: template.gallery,
// 	// events: {'click': 'click'},
// 	initialize: function(opts){
// 		this.n = opts.n;
// 		this.$el.html(template.gallery);
// 		//this.$el.appendTo(opts.$div); 
// 		//var pattern = Trianglify({color_function: colorFunc from db})
// 	},
// 	render: function(){
// 		 // or this.template
// 		// var self = this;
// 		// for (var i = 0; i<6; ++i){
// 		// 	var gallery = TriPictures[i];
// 		// 	this.$el.append(gallery.$el);
// 		// 	gallery.render();
// 		// }
// 	},
// 	// click: function(evt) {
// 	// 	this.collection.refresh(this.n);
// 	// }
// });

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
		
		this.$el.appendTo('body');	
	},
	render: function() {
		console.log('something happening');
	}

});



var page = null, trianglify = null;
function makePage() {
	trianglify = new TriPictures();
	page = new MainView({collection:trianglify});
	
	page.render();
}
$(makePage);
