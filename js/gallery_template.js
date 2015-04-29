_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

templates = {}; 

templates.galleryHead = _.template(    
        '<div class="container">' +
            '<div class="row">' +
                '<div class="col-lg-12 text-center">' +
                    '<h2>Gallery</h2>' +
                    '<hr class="down">' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<ul>');

templates.galleryItems = _.template(
    '<li class="col-xs-6">'+
        //'<a href="#" class data-toggle="modal" data-target="#slides">'+
        // '<div class="caption">' +
        //     '<div class="caption-content">' +
        //         '<i class="fa fa-search-plus fa-3x"></i>' +
        //     '</div>' +
        // '</div>' +
        '<img src="img/{{filename}}.svg" class="img-responsive" alt="">' +
        '<p>title</p>' +
      //'</a>' +
    '</li>');

templates.galleryFoot = _.template(
                '</ul>'+
            '</div>' +
        '</div>' +
        '<div class="modal fade" id="slides" tabindex="-1" role="dialog" aria-labelledby="gallery" aria-hidden="true">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content">' +         
                '<div class="modal-body"> ' +               
                '</div>' +
              '</div><!-- /.modal-content -->' +
            '</div><!-- /.modal-dialog -->' +
          '</div><!-- /.modal --> ' ); 


// template.aboutHead =  _.template(
//     '<div class="container" id="about">'+
//             '<div class="row">'+
//                 '<div class="col-lg-12 text-center">'+
//                     '<h2>About PsyColor</h2>'+
//                     '<hr class="down">'+
//                 '</div>'+
           
//                 '<p>Emotions spread person to person and crowds can unite in their moods. Face to face understanding moods is instinctive but online, emotions can be easy to misinterpret and labor intensive to glean from a population.  A simple visual representation of twitter mood hashtags could serve as an expression for twitters mood in a quick and intuitive means and to supply users with a way to compare their own.</p>'+
//                 '</div>'+
              
//               '<div class="row">'+);

// template.about = _.template(
//     '<div class="col-xs-4 text-center">'+
//                     '<a href="{{website}}" class="btn btn-xs btn-outline">'+
//                         '<i class="fa fa-globe"></i> '+
//                     '</a>'+
//                     '<a href="{{github}}" class="btn btn-xs btn-outline">'+
//                         '<i class="fa fa-github"></i> '+
//                     '</a>'+
//                     '<a href="{{linkedin}}" class="btn btn-xs btn-outline">'+
//                         '<i class="fa fa-linkedin"></i>'+ 
//                     '</a>'+
//                 '</div>'+);
// template.aboutFoot = _.template(
//     '</div>'+
//         '</div>';);

  


