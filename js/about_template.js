

templates.aboutHead =  _.template(
    '<div class="container" id="about" class="jumbotron">'+
            '<div class="row">'+
                '<div class="col-lg-12 text-center">'+
                    '<h2>About PsyColor</h2>'+
                    '<hr class="down">'+
                '</div>'+
           
                '<p>Emotions spread person to person and crowds can unite in their moods. Face to face understanding moods is instinctive but online, emotions can be easy to misinterpret and labor intensive to glean from a population.  A simple visual representation of twitter mood hashtags could serve as an expression for twitters mood in a quick and intuitive means and to supply users with a way to compare their own.</p>'+
                '</div>'+
              
              '<div class="row">');

templates.about = _.template(
    '<div class="col-xs-4 text-center">'+

            '<h4>{{name}}</h4>'+
            '<img src="./img/{{usPic}}.jpg" class="img-responsive img-circle" >' +
                    '<a href="{{website}}" target="_blank" class="btn btn-xs btn-outline">'+
                        '<i class="fa fa-globe"></i> '+
                    '</a>'+
                    '<a href="{{github}}" target="_blank" class="btn btn-xs btn-outline">'+
                        '<i class="fa fa-github"></i> '+
                    '</a>'+
                    '<a href="{{linkedin}}" target="_blank" class="btn btn-xs btn-outline">'+
                        '<i class="fa fa-linkedin"></i>'+ 
                    '</a>'+
                '</div>');
templates.aboutFoot = _.template(
    '</div>'+
        '</div>');

  




 // template.about =  
 //        '<div class="container">'+
 //            '<div class="row">'+
 //                '<div class="col-lg-12 text-center">'+
 //                    '<h2>About PsyColor</h2>'+
 //                    '<hr class="down">'+
 //                '</div>'+
           
 //                '<p>Emotions spread person to person and crowds can unite in their moods. Face to face understanding moods is instinctive but online, emotions can be easy to misinterpret and labor intensive to glean from a population.  A simple visual representation of twitter mood hashtags could serve as an expression for twitters mood in a quick and intuitive means and to supply users with a way to compare their own.</p>'+
 //                '</div>'+
              
 //              '<div class="row">'+
 //                '<div class="col-xs-4 text-center">'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-globe"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-github"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-linkedin"></i>'+ 
 //                    '</a>'+
 //                '</div>'+
 //                '<div class="col-xs-4 text-center">'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-globe"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-github"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-linkedin"></i>'+ 
 //                    '</a>'+
 //                '</div>'+
 //                '<div class="col-xs-4 text-center">'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-globe"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-github"></i> '+
 //                    '</a>'+
 //                    '<a href="#" class="btn btn-xs btn-outline">'+
 //                        '<i class="fa fa-linkedin"></i>'+ 
 //                    '</a>'+
 //                '</div>'+
 //              '</div>'+
 //        '</div>';