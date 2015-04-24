/* ------------------------
Nav collapse on click
-------------------------*/

$(document).ready(function () {
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});


/* ------------------------
Nav scrolling
-------------------------*/

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

var template = {};

// // Timeline

// var timeline = new VCO.Timeline('timeline', 'timeline.json', options);
//     window.onresize = function(event) {
//         timeline.updateDisplay();
//     }