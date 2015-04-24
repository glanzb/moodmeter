var config = require('./config.js')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');
var db = require('orchestrate')(config.db_key)

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/test', function(req,res){
  res.sendFile(__dirname + '/testFiles/testIndex.html');
});

http.listen(3000, function(){
	console.log('listening on localhost:3000');
});

var wordList = ["happy", "sad", "good", "bad"]

var wordData = {
    "time": Date.now(),
    "total": 0,
    "words": {},
    "tweet": "",
    "wordChanged":""
};

wordList.forEach(function(w){
  wordData.words[w] = 0;
})

var tw = new Twitter({
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
      wordData.wordChanged = w;
      wordData.total++;
      wordData.time = Date.now();
      wordData.tweet = tweet.text;
      io.emit('data', wordData);
    }
  })

  //console.log(wordData);
  
  
});


setInterval(function(){
  //console.log(wordData["time"].toString());
  var current_wordData = wordData;
  console.log(current_wordData.time.toString());
  db.put('picture', current_wordData.time.toString(), current_wordData, false)
  .then(function(res){console.log('one datum posted to db. datum id:  '+ current_wordData.time.toString())})
  .fail(function(error){console.log('db post failed: '+error.body)});
}, 5000000);






