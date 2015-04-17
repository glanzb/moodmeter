var config = require('./config.js')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');

http.listen(8000, function(){
  console.log('listening on localhost:8000');
});

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/testIndex.html');
});



var wordList = ["happy", "sad", "good", "bad"]

var wordData = {
    "time": Date.now(),
    "total": 0,
    "words": {},
    "tweet": ""
};

wordList.forEach(function(w){
  wordData.words[w] = 0;
})

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

tw.track(wordList);

tw.on('tweet', function(tweet){
  var text = tweet.text.toLowerCase();
  text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  wordList.forEach(function(w){
    if (text.indexOf(w) !== -1) {
      wordData.words[w]++;
      wordData.total++;
      wordData.time = Date.now();
      wordData.tweet = tweet.text;
      io.emit('data', wordData);
    }
  })

  console.log(wordData);
  
  
});


// setInterval(freq(), 10000);

// function freq(){

// }





