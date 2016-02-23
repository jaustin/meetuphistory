$(document).ready(function () {

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

var context = {name: "My New Post", yes_rsvp_count: "20", description: "This is my first post!"};
var html    = template(context);


$( ".main" ).append( html );
$.ajax({ 
    type: 'GET', 
    url: 'https://api.meetup.com/makespace/events?&sign=true&photo-host=public&page=50000&status=past', 
    dataType: 'jsonp',
    success: function (data) { 
       $.each(data.data, function(index, element) {
            $('body').append(template(element));
        });
    }
});
});
Handlebars.registerHelper('formatDate', function(meetuptime) {
  var d = new moment(meetuptime);
  return d.format('dddd DD/MM/YYYY - HH:mm');
});
