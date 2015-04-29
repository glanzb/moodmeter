/* ------------------------
Modal Gallery
-------------------------*/

//click on thumbnail image
 $(document).ready(function(){
$('#gallery li').on('click',function(){
    var src = $('#gallery img').attr('src');
    var img = '<img src="./' + src + '" class="img-responsive"/>';
    // get the img source from the thumbnail image src
    
    var index = $(this).parent('ul').index();

    //put the html content together: styled img and controls
    var html = '';
    html += img;                
    html += '<div style="height:25px;clear:both;display:block;">';
    html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
    html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
    html += '</div>';

    $('#slides').modal();
    $('#slides').on('shown.bs.modal', function(){
    //hide or show the right links when first or last image is clicked
      $('#slides .modal-body').html(html);
      $('a.controls').trigger('click');
    })
    $('#slides').on('hidden.bs.modal', function(){
      $('#slides .modal-body').html('');
    });
  });
})

//set up click handler for previous and next buttons
$(document).on('click', 'a.controls', function(){
  var index = $(this).attr('href');
  var src = $('ul.row li:nth-child('+ index + ') img').attr('src');
  $('.modal-body img').attr('src', src);

  var newPrevIndex = parseInt(index) - 1;
  var newNextIndex = parseInt(newPrevIndex) + 2;

  if($(this).hasClass('previous')) {
    $(this).attr('href', newPrevIndex);
    $('a.next').attr('href', newNextIndex);
  } else {
    $(this).attr('href', newNextIndex);
    $('a.previous').attr('href', newPrevIndex);
  }

  // hide first and last controls
  var total = $('ul.row li').length + 1;
  // hide next button on last slide
  if (total === newNextIndex) {
    $('a.next').hide();
  } else {
    $('a.next').show()
  }
  // hide previous button on first slide
  if (newPrevIndex === 0) {
    $('a.previous').hide();
  } else {
    $('a.previous').show()
  }
    return false;
});