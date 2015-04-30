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
        '<p>{{title}}</p>' +
      //'</a>' +
    '</li>');

templates.galleryFoot = _.template(
                '</ul>'+
            '</div>' +
        '</div>' 
        //+
        // '<div class="modal fade" id="slides" tabindex="-1" role="dialog" aria-labelledby="gallery" aria-hidden="true">' +
        //     '<div class="modal-dialog">' +
        //       '<div class="modal-content">' +         
        //         '<div class="modal-body"> ' +               
        //         '</div>' +
        //       '</div><!-- /.modal-content -->' +
        //     '</div><!-- /.modal-dialog -->' +
        //   '</div><!-- /.modal --> ' 
        ); 


