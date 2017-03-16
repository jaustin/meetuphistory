var template = null;

function get_meetup( url ) {
	console.log( url );
$.ajax({ 
    type: 'GET', 
    url: url ,
    dataType: 'jsonp',
    success: function (data) { 
       console.log(data);
       $.each(data.results, function(index, element) {
            if (element.status == "upcoming") { console.log(data.data[index - 1]); };
            //$('#pages').append(template(element));
           /* if (element.name.lastIndexOf("See the space", 0) !== 0
                & (element.name.lastIndexOf("Thursday Pub", 0) !== 0)
                & (element.name.lastIndexOf("See the Space", 0) !== 0)
                & (element.name.lastIndexOf("Family Makers", 0) !== 0)
                & (element.name.lastIndexOf("K1 Cohousing", 0) !== 0)
                & (element.name.lastIndexOf("OpenDCU.org", 0) !== 0)
                ) {
            	$('#pages').append(template(element));
	}*/
           if (element.yes_rsvp_count > 1){
        	$('#pages').append(template(element));
	}
        });
       if (data.results[0].status === "past") {
            	//$('body').append("<h1>HERE</h1>");
       	    get_meetup(data.meta.next);
	}
    }
});
};

$(document).ready(function () {

var source   = $("#entry-template").html();
template = Handlebars.compile(source);

var context = {name: "My New Post", yes_rsvp_count: "20", description: "This is my first post!"};
var html    = template(context);

//$( ".main" ).append( html );

//var first_url = 'https://api.meetup.com/makespace/events?&sign=true&status=past' 
//var first_url = 'https://api.meetup.com/makespace/events?&sign=true&status=past' 
var first_url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=makespace&status=past&page=5000'

get_meetup(first_url);

});
Handlebars.registerHelper('formatDate', function(meetuptime) {
  var d = new moment(meetuptime);
  return d.format('dddd DD/MM/YYYY - HH:mm');
});

