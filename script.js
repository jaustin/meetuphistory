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
            if (element.name.lastIndexOf("See the space", 0) != 0
                & (element.name.lastIndexOf("Thursday Pub", 0) != 0)
                & (element.name.lastIndexOf("See the Space", 0) != 0)
                & (element.name.lastIndexOf("Family Makers", 0) != 0)
                & (element.name.lastIndexOf("K1 Cohousing", 0) != 0)
                & (element.name.lastIndexOf("OpenDCU.org", 0) != 0)
                ) {
            	$('body').append(template(element));
	}
        });
    }
});
});
Handlebars.registerHelper('formatDate', function(meetuptime) {
  var d = new moment(meetuptime);
  return d.format('dddd DD/MM/YYYY - HH:mm');
});
