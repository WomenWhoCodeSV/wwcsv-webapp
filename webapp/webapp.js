if (Meteor.isClient) {
  Template.meetupEvents.helpers({
    allEvents : function () {
      return Session.get("allEvents");
    }
  });

  Template.meetupEvents.created = function(){
      Meteor.call('meetupEvents',function(err, response) {
        console.log(response.data.results)
        Session.set("allEvents", response.data.results)
      });
  }

  Template.registerHelper("prettifyDate", function(timestamp,utcoffset) {
    return moment(new Date(timestamp)).format('DD/MM/YYYY, h:mm a');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      meetupEvents: function(){
       return Meteor.http.call("get", 'http://api.meetup.com/2/events?group_urlname=Women-Who-Code-silicon-valley&key=53363a1234a576ea7f545221c541f')
      }
    });
  });
}
