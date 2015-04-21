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


// --- Views ---
var BlockView0 = Backbone.View.extend({
	tagName: 'nav',
	// events: {'click': 'click'},
	initialize: function(opts){
		this.n = opts.n;
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){

	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

var BlockView1 = Backbone.View.extend({
	tagName: 'div',
	template: '',
	// events: {'click': 'click'},
	initialize: function(opts){
		this.template = _.template($('#tweets').html());
	},
	render: function(){

	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
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

var BlockView3 = Backbone.View.extend({
	tagName: 'div',
	model:TriPictures,
	// events: {'click': 'click'},
	initialize: function(opts){
		this.n = opts.n;
		//this.$el.appendTo(opts.$div); 
	},
	render: function(){
		this.$el.html();
		var self = this;
		for (var i = 0; i<6; ++i){
			var gallery = TriPictures[i];
			this.$el.append(gallery.$el);
			gallery.render();
		}
	},
	// click: function(evt) {
	// 	this.collection.refresh(this.n);
	// }
});

var MainView = Backbone.View.extend({
	id: 'main',
	tagName: 'div',
	initialize: function() {
		//this.collection.on('change:pattern',this.render,this);
		this.blocks = []; // subviews
		var self = this;		
		var makeSubView = function(id,type){
			var opts = {
				collection: this.collection,
				className: 'container',
				id: id
			}
			var newView = new type(opts); // blockview type
			self.blocks.push(newView);
			newView.$el.appendTo(self.$el)
		};

		makeSubView('nav',BlockView0);
		makeSubView('tweets',BlockView1);
		makeSubView('picture',BlockView2);
		makeSubView('galery',BlockView3);
		
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
