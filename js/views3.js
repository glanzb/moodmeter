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
		galleryCollection.reset();
		galleryCollection.add(data);
		console.log(gallery);
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
						height: 600,
						width: 800,
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
					};  // end if()
				});  // end $.post

			})  //  end socket.on('timedata', ...



			function lerp(a,b,t){
				//console.log(t)
				var interp = a + ((t * .15) * (b - a));
				return interp
			};  // end lerp

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
			}; //end interval

		});
	},  // end triangles


	// events: {'click': 'click'},
	initialize: function(opts){
		//this.$el.addClass('#picture .setup');
		
		this.render();
		this.$el.appendTo('#picture');

		//this.n = opts.n;		
		//document.getElementById('main').appendChild(trianglify.pattern.canvas(this.el));
		
		//trianglify.pattern.canvas(this.el);
	},


	render: function(){		
		this.triangles();	
		return this;
	},	


			// click: function(evt) {
			// 	this.collection.refresh(this.n);
			// }
});  //end canvasView


var GalleryModel = Backbone.Model.extend({

color_function: function(x, y) {
			console.log("GalleryModel color_function");
			//console.log(y)
			//return 'hsl(' + Math.floor((x*50)+(xShift*10)) + ','+ Math.floor(x/20) +'%,60%)'
			colorFuncString = 'hsl(' + Math.floor((x*50)+(xShift*200)) + ',' + Math.floor((y)*(yShift*500)) + '%,'+ (40+(y*60)) + '%)'
			return colorFuncString;
		}, //end color_function

	defaults: {
		height: 600,
		width: 800,
		variance: .5 + ((Math.random()-0.5)/10),
		cell_size: 100,  //Math.ceil(Math.random()*100),
		seed: 'gn26p',
		
	},  // end defaults

	initialize: function(){
		this.view = new GalleryView({model:this});
	},	// end initialize
});  //end GalleryModel


var GalleryCollection = Backbone.Collection.extend({
  	model: GalleryModel,

  	// initialize: function(){
  	// 	this.on("add", function(){
  	// 		console.log("GalleryCollection extend, initialize");
  			//console.log(this.model);
  			//galleryView.render();
  		//}) //end this.on("add",...)
  		
  	//}  //end initialize
});  //end GalleryCollection
		

var galleryCollection = new GalleryCollection();




var GalleryView = Backbone.View.extend({
	
  tagName: 'section',
  collection : galleryCollection,
  template: template.gallery,

  initialize: function (opts) {
  	this.n = opts.n;
		this.$el.html(template.gallery);
  	console.log("GalleryView initialize");
  	//this.$el.html = "look here";
  	
  //	var outputHtml = templates.galleryHead();
      this.collection.models.forEach(function (item) {
	      var pattern = Trianglify(this.model);
	      data.filename = item.get('filename');
	      //outputHtml += templates.galleryItems(data.filename);
	      //console.log(outputHtml);
  		})   //end this.collection.models.forEach
    //  outputHtml += templates.galleryFoot();
    //  this.$el.html(outputHtml)
    //this.$el.html(templates.gallery());
    this.$el.appendTo('#about');
  },  //end initialize

  render: function () {
	  // var outputHtml = templates.galleryHead();
   //    this.collection.models.forEach(function (item) {
	  //     var pattern = Trianglify(this.model);
	  //     //data.filename = item.get('filename');
	  //     outputHtml += templates.galleryItems(pattern.canvas());
	  //     console.log(outputHtml);
  	// 	})
   //    outputHtml += templates.galleryFoot();
   //    this.$el.html(outputHtml)
   return this;
  	}
});  //end GalleryView()


$(document).ready(function(){
	galleryCollection.add([
	{"filename": "1pattern"},
	{"filename": "2pattern"},
	{"filename": "3pattern"},
]);
});



var AboutView = Backbone.View.extend({
	tagName: 'section',
	template: template.about,
		
	initialize: function(opts){
		this.n = opts.n;
		this.$el.html(template.about);
		this.$el.appendTo('#gallery');
	},
	render: function(){
	},
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
				id: id
			}
		
			var newView = new type(opts); // blockview type
			self.blocks.push(newView);
			newView.$el.appendTo(self.$el)
		};


		// makeSubView('nav',NavView);
		
		makeSubView('picture',CanvasView);
		makeSubView('data',DataView);
		//makeSubView('gallery',GalleryView);
		makeSubView('about', AboutView);
		
		//this.$el.appendTo('body');	
	},
	render: function() {
		console.log('something happening');
		galleryView = new GalleryView({collection: this.collection});
    	galleryView.render();
		return this;
	}

});



var page = null, trianglify = null;
function makePage() {
	//trianglify = new TriPictures();
	page = new MainView({collection:galleryCollection});
	page.render();
}



$(makePage);