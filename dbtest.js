var config = require('./config.js');
var db = require('orchestrate')(config.db_key);


//quick & dirty attempt @ a get from the db
var c=0;
var dbarr=['1'];
console.log ('out of get ' + dbarr);
/*db.get ('thing', 'results')  //get from 'thing' collection, 'value' key
.then(function (response) {
		console.log ('inside get' +dbarr);
    for  (c=0; c<20; c++) {//(c=0; c<response.body.results.length; c++) {
      var data = response;

      var props = (response.body.results[c].value.wordsFreqProportions); 
      console.log(props);
      dbarr.push(props);
      console.log (dbarr);
      return dbarr;
    }
    
})
.fail(function (err) {
	console.log(err);
});
*/
router.addRoute("/moodmeter",{
	GET: function(req, res) {
		console.log("inside GET");

		function forwardSearchResults (answer) {
			console.log("inside forwardSearchResults");
	     var values = answer.body.results.value;  //var values = result.body.results.map(getValue);
	                var json = JSON.stringify(values);
	                console.log("Returning array: "+json);
	                res.end(json); //return JSON array to client
	                };  //end forwardSearchResults

	//below value.time values will need to be extracted from the GET (req) above for ex req.startKey & req.stopKey
		db.search ('thing', 'value.time: [1430092083299	TO 1430093233561]') //('thing', '1430092083299')  //('thing', 'value.wordsFreqProportions: {"happy_sad": 0.9375,"good_bad": 0.8275862068965517}
		.then(function (response) {
				console.log ('inside db.search ' +dbarr);
				console.log (response.body.value);
		    for  (c=0; c<20; c++) {//(c=0; c<response.body.results.length; c++) {
		      var data = response;

		      var props = (response.body.results[c].value.wordsFreqProportions); 
		      console.log(props);
		      dbarr.push(props);
		      console.log (dbarr);
		      return dbarr;
		    }  // end for loop

	  /*  .fail(function (err) {
		console.log(err);*/
		
	}) //end .then

	}  //end GET

	POST: function(req, res) {
		console.log("inside POST");
		//remove any header from req
		//change req (to json & then) to string?
		//separate .key from req?
		//isolate value object from req  e.g. {"name": "Henry"}

		//pass the above/(req) to db.put
		db.put('twitterdata', current_wordData.time.toString(), current_wordData, false)
			.then(function(res){console.log('one datum posted to db. datum id:  '+ current_wordData.time.toString())})
			.fail(function(error){console.log('db post failed: '+error.body)});
	

	} // end POST

}) //end router.addRoute