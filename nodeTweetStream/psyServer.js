var config = require('./config.js')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
	console.log('listening on localhost:3000');
});

var sadCount = 0;
var joyCount = 0;
var jealousCount = 0;
var totalCount = 0;


var tw = new Twitter({
  // consumer_key: "jmIG6E2dnbcGkPHr3FGWK6Lvd",
  // consumer_secret: "v2SwwluRI6WQiLercG1MLYqUNRS9dPhoymKIXfcYuE65oqQP5h",
  // token: "3143092806-oXvalEaNqnR7Yuanhfv9ROfUGJf06E4dAeuNsCl",
  // token_secret: "4Uc5wKaok73HTqZOSs6WCjeNosFWDBQhUUK7KMRfC7MWy"
  consumer_key:    config.twtConsumer_key,
  consumer_secret: config.twtConsumer_secret,
  token:           config.twtToken,
  token_secret:    config.twtToken_secret
})
var tw2 = new Twitter({
  consumer_key:    config.twtConsumer_key,
  consumer_secret: config.twtConsumer_secret,
  token:           config.twtToken,
  token_secret:    config.twtToken_secret
})
var tw3 = new Twitter({
  consumer_key:    config.twtConsumer_key,
  consumer_secret: config.twtConsumer_secret,
  token:           config.twtToken,
  token_secret:    config.twtToken_secret
})

tw.track('sad');
tw2.track('joy');
tw3.track('mad');

tw.on('tweet', function(tweet){
	sadCount++;
  totalCount++;
  var propSad = Math.round((sadCount/totalCount)*100);

  io.emit('sadTweet', propSad);
  console.log("sad:"+ sadCount +"\n");
  //console.log(tweet.text);
  console.log("--------------------------"+"\n")
});

tw2.on('tweet', function(tweet){
	joyCount++;
  totalCount++;
  var propJoy = Math.round((joyCount/totalCount)*100);
  
  io.emit('joyTweet', propJoy);
 	console.log("joy:"+ joyCount+ "\n");
 	//console.log(tweet.text);
  console.log("--------------------------"+"\n")
});

tw3.on('tweet', function(tweet){
  jealousCount++;
  totalCount++;
  var propjealous = Math.round((jealousCount/totalCount)*100);
  
  io.emit('jealousTweet', propjealous);
  console.log("mad:"+ jealousCount+ "\n");
  //console.log(tweet.text);
  console.log("--------------------------"+"\n")
});

// setInterval(freq(), 10000);

// function freq(){

// }





