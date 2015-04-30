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
		parsedData = JSON.parse(data);

		var modelUpdateArr = parsedData.map(function(hsl){
			var colorFuncObj = {};
			//console.log(hsl.colorFuncVals[0])
			//colorFuncString = 'hsl(' + hsl.colorFuncVals[0] + ',' + hsl.colorFuncVals[1] + '%,'+ hsl.colorFuncVals[2] + '%)' ;
			// var colorFuncString = 'hsl(Math.floor((x*50)+(' + hsl.colorFuncVals[0] + '*200)), Math.floor((y)*(' + hsl.colorFuncVals[1] + '*500)) %, (40+(y*60))%)'
			colorFuncObj.color_function = function(x,y){
				//var colorFuncString = 
				var colorFuncString = 'hsl(' + Math.floor((x*50)+(hsl.colorFuncVals[0]*200)) + ',' + Math.floor((y)*(hsl.colorFuncVals[1]*500)) + '%,'+ (40+(y*60)) + '%)'
				return colorFuncString
			}
			// console.log(colorFuncObj.color_function);
			return colorFuncObj
		})

		console.log("converted hsl: ");
		//console.log(modelUpdateArr);
		window.testModelUpdateArr = modelUpdateArr;

		// _.invoke(galleryCollection.toArray(), 'destroy');
		galleryCollection.reset(modelUpdateArr)
		//galleryCollection.add(modelUpdateArr);
		//galleryCollection.add(data);
		//console.log("data retreival: ");
		//console.log(typeof data);

		galleryView.specialRender();


	})
	.fail(function() {
    console.log( "$.get error" );
  	})

}, 10000)	


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
			var hue;
			var saturation;
			var lightness;
			// var x;
			// var y;

			socket.on('timedData', function(wordData){
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
						width: 800,
						variance: .5 + ((Math.random()-0.5)/10),
						cell_size: 100,  //Math.ceil(Math.random()*100),
						seed: 'gn26p',
						color_function: function(x, y) {
							hue = Math.floor((x*50)+(xShift*200));
							saturation = Math.floor((y)*(yShift*500));
							lightness = (40+(y*60));
							//console.log(hue, saturation, lightness);
							// colorFuncString = 'hsl(' + Math.floor((x*50)+(xShift*200)) + ',' + Math.floor((y)*(yShift*500)) + '%,'+ (40+(y*60)) + '%)'
							colorFuncString = 'hsl(' + hue + ',' + saturation + '%,'+ lightness + '%)'
							return colorFuncString
						}
						
					});
					//console.log(xShift);
					$("#picture").empty();
					$("#picture").append(pattern.canvas());
					
				}, 50, 20);

				//////////////////////////////////
				//poster
				//////////////////////////////////
				//console.log(hue, saturation, lightness);
				

			})
			window.setInterval(function(){
				$.post("http://localhost:3000/api", {time: Date.now(), colorFuncVals: [hFreq[0], gFreq[0], lightness]}, function(data){
					if(data === 'done'){
						alert('post')
					};
				})
				.fail(function() {
    				console.log( "post error" );
  				})
			}, 10000);


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


var GalleryModel = Backbone.Model.extend({
	defaults: {
		height: 600,
		width: 800,
		variance: .5 + ((Math.random()-0.5)/10),
		cell_size: 100,  //Math.ceil(Math.random()*100),
		seed: 'gn26p',
		color_function: function(x,y){
			hue = 200;
			saturation = 60;
			lightness = 70;
			colorFuncString = 'hsl(' + hue + ',' + saturation + '%,'+ lightness + '%)'
			return colorFuncString
		}
	}
});

var GalleryCollection = Backbone.Collection.extend({
  model: GalleryModel
});

var galleryCollection = new GalleryCollection();

// galleryCollection.add([
// 	{"filename": "1pattern"},
// 	{"filename": "2pattern"}
// ]);


var GalleryView = Backbone.View.extend({
  tagName: 'section',
  collection : galleryCollection,
  //template: templates.gallery,
  initialize: function (opts) {
  	var outputHtml = templates.galleryHead();
      this.collection.models.forEach(function (item) {
	      var data = {};
	      data.filename = item.get('filename');
	      outputHtml += templates.galleryItems(data);
	      //console.log(outputHtml);
  		})
      outputHtml += templates.galleryFoot();
      this.$el.html(outputHtml)
    //this.$el.html(templates.gallery());
  },
  render: function () {
  	console.log("this is normal galleryView render()")
	},

	specialRender: function() {
	$('#gallery').empty();
  	this.collection.models.forEach(function (item) {
  		console.log(item.attributes.color_function)
	    var triPattern = Trianglify(item.attributes);
	    $('#gallery').append(triPattern.canvas());
	  
		});
	}
})

var AboutView = Backbone.View.extend({
	tagName: 'section',
	template: template.about,
		
	initialize: function(opts){
		this.n = opts.n;
		this.$el.html(template.about);
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
		makeSubView('gallery',GalleryView);
		makeSubView('about', AboutView);
		
		//this.$el.appendTo('body');	
	},
	render: function() {
		//console.log('something happening');
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
