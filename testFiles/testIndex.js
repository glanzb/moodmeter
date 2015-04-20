$(function(){

var socket = io();
      // $('form').submit(function(){
      //   socket.emit('input', $('#m').val());
      //   $('#m').val('');
      //   return false;
      // });

socket.on('data', function(wordData){
  //
  console.log(wordData);
  $('#data').text("");
  $('#data').text(JSON.stringify(wordData));
});
