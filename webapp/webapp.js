if (Meteor.isClient) {
  Template.meetupEvents.helpers({
    allEvents : function () {
      return Session.get("allEvents");
    }
  });

  Template.meetupEvents.created = function(){
      Meteor.call('meetupEvents',function(err, response) {
        Session.set("allEvents", response.data.results)
      });
  }

  Template.registerHelper("prettifyDate", function(timestamp,utcoffset) {
    return moment(new Date(timestamp)).format('DD/MM/YYYY, h:mm a');
  });

  Template.event.created = function() {
    Meteor.call('oneEvent', this.data._id, function (err, response) {
      console.log(response.data)
      Session.set("oneEvent", response.data)
    });
  }

  Template.event.helpers({
    oneEvent : function () {
      return Session.get("oneEvent");
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    meetupEvents: function(){
      return Meteor.http.call("get", 'http://api.meetup.com/2/events?group_urlname=Women-Who-Code-silicon-valley&key=f336f181c27375c25a705f11112123')
    },
    oneEvent: function(id){
      return Meteor.http.call("GET", 'http://api.meetup.com/Women-Who-Code-silicon-valley/events/' + id + '?key=f336f181c27375c25a705f11112123', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
    }
  });
}
