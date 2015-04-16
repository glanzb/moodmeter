var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message',function(msg){
		console.log('message: ' + msg);
	})
});

http.listen(3000, function(){
	console.log('listening on localhost:3000')

});


var sadCount = 0;
var joyCount = 0;
// var tw = new Twitter({
// 	consumer_key: 'jyFfWQ1V6vC4VRLXk211HYhLc',
//     consumer_secret: 'eESP3PfNczxs2z0JVkXwBpDbDyVkDBCSWThId9zjCNPJz9bs1D',
//     token: '3143092806-oXvalEaNqnR7Yuanhfv9ROfUGJf06E4dAeuNsCl',
//     token_secret: '4Uc5wKaok73HTqZOSs6WCjeNosFWDBQhUUK7KMRfC7MWy'
// })
// tw.track('depressed');

// tw.on('tweet', function(tweet){
//   //io.emit('tweet', tweet);
//   sadCount++;
//   console.log("depressed:"+ sadCount +"\n");
//   console.log(tweet.text);
//   console.log("--------------------------"+"\n")
// });

var tw2 = new Twitter({
	consumer_key: 'jyFfWQ1V6vC4VRLXk211HYhLc',
    consumer_secret: 'eESP3PfNczxs2z0JVkXwBpDbDyVkDBCSWThId9zjCNPJz9bs1D',
    token: '3143092806-oXvalEaNqnR7Yuanhfv9ROfUGJf06E4dAeuNsCl',
    token_secret: '4Uc5wKaok73HTqZOSs6WCjeNosFWDBQhUUK7KMRfC7MWy'
})
tw2.track('joy');

tw2.on('tweet', function(tweet){
	joyCount++;
  	io.emit('tweet', joyCount);
  
  	console.log("joy:"+ joyCount+ "\n");
  	console.log(tweet.text);
  	console.log("--------------------------"+"\n")
});





