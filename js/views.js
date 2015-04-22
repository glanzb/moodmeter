// --- Models ---
var TriPictures = (function() {
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
    
     function makePic(pattern){
     	return {
     		pattern:pattern
     	}
     };

	var TriPictures = Backbone.Collection.extend({
		model:TriPic,
		initialize: function() {
			document.getElementById('main').appendChild(pattern.canvas(document.getElementById('picture')));
		},
		refresh: function(){
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
});


// --- Views ---
var NavView = Backbone.View.extend({
	tagName: 'div',
	template: template.nav,
	// events: {'click': 'click'},
	initialize: function(opts){
		this.n = opts.n;
		this.$el.html(template.nav);
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){

	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

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

var BlockView2 = Backbone.View.extend({
	tagName: 'canvas',

	// events: {'click': 'click'},
	initialize: function(opts){
		this.n = opts.n;
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){
	}	
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

// var 

var GalleryView = Backbone.View.extend({
	tagName: 'section',
	model:TriPictures,
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

var MainView = Backbone.View.extend({
	el: '#main',
	initialize: function() {
		//this.collection.on('change:pattern',this.render,this);
		this.blocks = []; // subviews
		var self = this;		
		var makeSubView = function(id,type){
			var opts = {
				collection: this.collection,
				//className: 'container',
				id: id
			}
			var newView = new type(opts); // blockview type
			self.blocks.push(newView);
			newView.$el.appendTo(self.$el)
		};

		makeSubView('nav',NavView);
		makeSubView('data',DataView);
		makeSubView('picture',BlockView2);
		makeSubView('gallery',GalleryView);
		
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
