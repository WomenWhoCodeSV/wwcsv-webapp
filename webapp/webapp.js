if (Meteor.isClient) {
  Template.meetupEvents.helpers({
    allEvents : function () {
      return Template.instance().allWWCEvents.get().results;
    }
  });

  Template.meetupEvents.created = function(){
    var self = this;
    self.allWWCEvents = new ReactiveVar();
    Meteor.call('meetupEvents',function(err, response){
      if (err)
        console.log(err);
      else
        self.allWWCEvents.set(response.data);
    });
  };

  Template.registerHelper("prettifyDate", function(timestamp,utcoffset) {
    return moment(new Date(timestamp)).format('DD/MM/YYYY, h:mm a');
  });

  Template.event.created = function() {
    var self = this;
    self.eventDetails = new ReactiveVar();
    Meteor.call('oneEvent', this.data._id, function (err, response) {
      console.log(response.data)
      self.eventDetails.set(response.data);
    });
  }

  Template.event.helpers({
    oneEvent : function () {
      return Template.instance().eventDetails.get();
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
