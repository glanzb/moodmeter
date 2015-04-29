
//dependencies
var config = (process.env.HEROKU)?
{
  twtConsumer_key: process.env.twtConsumer_key,
  twtConsumer_secret: process.env.twtConsumer_secret,
  twtToken: process.env.twtToken,
  twtToken_secret: process.env.twtToken_secret,
  dbKey: process.env.dbKey,
  API_key: process.env.API_key,
} :
require('./config.js');

var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 
var http = require('http').Server(app);

var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');
var db = require('orchestrate')(config.db_key);
var deep_ = require('underscore.deep');

var lastTimeStamp;


//var sockets = io.listen(http);
// polling for heroku

if (process.env.HEROKU) {
//io.configure(function() {
  function runner() {
  io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);
};  // end function
} // end if()

app.use(bodyParser.urlencoded({ extended: false }));
//expose sub directories to app
app.use('/', express.static(__dirname + '/'));

//root directory loads index html
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

// route for test files
app.get('/test', function(req,res){
  res.sendFile(__dirname + '/testFiles/testIndex.html');
});


app.get('/api', function(req, res){
  db.list ('newThing', {limit:5, endKey: lastTimeStamp}) //{limit:5, endKey: lastTimeStamp}
  .then(function(result){
    console.log(JSON.stringify(result.body.results[0]))
    res.end(JSON.stringify(result.body.results[0]));
    //res.end("hi")
  })
  .fail(function(err){
    console.log("get.fail: " + JSON.stringify(err))
  })
})

// setInterval(
//   db.list ('newThing', {limit:5, endKey: lastTimeStamp})
//   .then(function(result){
//     console.log(result.body)
//   }), 10000);

// route for post
app.post('/api', function(req,res){
  var time = req.body.time;

  var colorFn = { "time": time,
                  "colorFn": req.body.colorFn}

  //console.log("time: "+ time + "  colorFn: " + colorFn);

  db.put('newThing', time, colorFn, false)
  .then(function(res){console.log('one datum posted to db. datum id:  '+ time);
    lastTimeStamp = time.toString();
  })
  .fail(function(error){console.log('db post failed: '+ JSON.stringify(error.body))});
  
  res.end('yes');
})


//turn on the server
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});

//words for twitter api to track
var wordList = ["happy", "sad", "good", "bad"]

//the data object
var wordData = {
    "time": Date.now(),
    "total":       0,
    "words":       {},
    "wordsFreq":   {},
    "wordsFreqProportions": {},
    "tweet":       "",
    "wordChanged": "",
    "biggest":0,
};

//put wordList in the data object
wordList.forEach(function(w){
  wordData.words[w] = 0;
})

//initialize twitter-stream api object with credentials
var tw = new Twitter({
  consumer_key:    config.twtConsumer_key,
  consumer_secret: config.twtConsumer_secret,
  token:           config.twtToken,
  token_secret:    config.twtToken_secret
})

//add the tracked words
tw.track(wordList);

//on new tweet
tw.on('tweet', function(tweet){
  //format tweet text
  var text = tweet.text.toLowerCase();
  text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  //check which tracked word the tweet matches
  //update the data object
  //emit data object 
  wordList.forEach(function(w){
    if (text.indexOf(w) !== -1) {
      wordData.words[w]++;
      wordData.wordChanged = w;
      wordData.total++;
      wordData.time = Date.now();
      wordData.tweet = tweet.text;
      wordData.biggest = biggest();
      if (wordData.total%100 === 0){
        io.emit('data', wordData);
      }
      
    }
  })

  //console.log(wordData);

});

function biggest(){
  var countArr = [];
  for (prop in wordData.words){
    countArr.push(wordData.words[prop]);
  }
  var biggest = countArr.indexOf(Math.max.apply(null,countArr));
  return biggest;
}

var oldWordData = deep_.deepClone(wordData);
//console.log(oldWordData);

 
//calculate and store frequency of tweets for each word
setInterval(function(){
  var interval = wordData.time - oldWordData.time;
  for (prop in wordData.words){
    wordData.wordsFreq[prop] = Math.round(((wordData.words[prop] - oldWordData.words[prop])/interval)*1000);
  }

  wordData.wordsFreqProportions['happy_sad'] = wordData.wordsFreq['happy'] / (wordData.wordsFreq['happy'] + wordData.wordsFreq['sad']);
  wordData.wordsFreqProportions['good_bad'] = wordData.wordsFreq['good'] / (wordData.wordsFreq['good'] + wordData.wordsFreq['bad']);
  oldWordData = deep_.deepClone(wordData);
  //console.log(wordData.wordsFreqProportions);
  io.emit('timedData', wordData )

}, 2000);



//dbCollectionName = 'thing';

//send a wordData object to db every x ms
// setInterval(function(){
//   //console.log(wordData["time"].toString());
//   var current_wordData = wordData;
//   console.log(current_wordData.time.toString());
//   db.put(dbCollectionName, current_wordData.time.toString(), current_wordData, false)
//   .then(function(res){console.log('one datum posted to db. datum id:  '+ current_wordData.time.toString())})
//   .fail(function(error){console.log('db post failed: '+error.body)});
// }, 500000);




