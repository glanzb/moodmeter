
//dependencies
//var config = require('./config.js');

var config;

if (process.env.HEROKU) {
  config = {
 twtConsumer_key: process.env['twtConsumer_key'],
 twtConsumer_secret: process.env['twtConsumer_secret'],
 twtToken: process.env['twtToken'],
 twtToken_secret: process.env['twtToken_secret'],
 db_key: process.env['db_key'],
 API_key: process.env['API_key']}
} else{
config = require('./config.js');
};

var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 
var http = require('http').createServer(app);

var io = require('socket.io')(http);
var Twitter = require('node-tweet-stream');
// var db = require('orchestrate')(config.db_key);
var deep_ = require('underscore.deep');
var _ = require('underscore')

var lastTimeStamp;

//polling for heroku
// sockets.sockets.configure(function() {
//   io.set('transports', ['xhr-polling']);
//   io.set('polling duration', 10);
// });


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

//turn on the server
http.listen(3000, function(){
  console.log('listening on localhost:3000');
}); 

if (process.env.HEROKU) {
//io.configure(function() {
 function runner() {
 io.set('transports', ['xhr-polling']);
 io.set('polling duration', 10);
};  // end function
} // end if()

// route for gallery data request and response
// var searchOffset = 0;
// app.get('/api', function(req, res){
//   //db.list ('colorData', {limit:6, endKey: lastTimeStamp}) //{limit:5, endKey: lastTimeStamp}
//   db.newSearchBuilder()
//   .collection('colorData')
//   .limit(6)
//   .offset(searchOffset)
//   //.sort('key','asc')
//   .query('*')
//   .then(function(result){

//     //console.log(result.body)
//     var resultValues = _.pluck(result.body.results, 'value');
//     for(var i = 0; i < resultValues.length; i++){
//       console.log(resultValues[i].time)
//       delete resultValues[i].time
//     }

//     searchOffset+= 6;

//     console.log(JSON.stringify(resultValues));
    
//     res.end(JSON.stringify(resultValues));
//   })
//   .fail(function(err){
//     console.log("get.fail: " + JSON.stringify(err))
//   })
// })

// route for posting gallery data 
// app.post('/api', function(req,res){
//   //console.log(req.body['colorFuncVals[]'])
//   var time = req.body.time;
//   //values to be stored
//   var colorFn = { "time": time,
//                   "colorFuncVals": req.body['colorFuncVals[]']
//   }
//   // add to orchestrate 
//   db.put('colorData', time, colorFn, false)
//     .then(function(res){
//       console.log('one datum posted to db. datum id:  '+ time);
//       lastTimeStamp = time.toString();
//   })
//   .fail(function(error){console.log('db post failed: '+ JSON.stringify(error.body))});
//   res.end('good');
// })

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
    "biggest":0
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
var openDataEmitter = false; 
io.sockets.on('connection', function(socket){
  openDataEmitter = true;
  })
//on new tweet
  tw.on('tweet', function(tweet){
    //scrub tweet text
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
        if(openDataEmitter){
          if (wordData.total%100 === 0){
            io.emit('data', wordData);
          }
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

var openTimedDataEmitter = false; 
//calculate and store frequency of tweets for each word
io.sockets.on('connection', function(socket){
  openTimedDataEmitter = true
})
  setInterval(function(){
    var interval = wordData.time - oldWordData.time;
    for (prop in wordData.words){
      wordData.wordsFreq[prop] = Math.round(((wordData.words[prop] - oldWordData.words[prop])/interval)*1000);
    }

    wordData.wordsFreqProportions['happy_sad'] = wordData.wordsFreq['happy'] / (wordData.wordsFreq['happy'] + wordData.wordsFreq['sad']);
    wordData.wordsFreqProportions['good_bad'] = wordData.wordsFreq['good'] / (wordData.wordsFreq['good'] + wordData.wordsFreq['bad']);
    oldWordData = deep_.deepClone(wordData);
    console.log(wordData.wordsFreqProportions);
    
    if(openTimedDataEmitter){
      io.emit('timedData', wordData )
    }

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




