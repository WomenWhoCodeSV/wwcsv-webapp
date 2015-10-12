Router.configure({
  layoutTemplate: 'layout'
});

Router.route("/", {name: "about"});

Router.route("/events", {name: "meetupEvents"})


Router.route('/events/:_id', function () {
  this.render('event', {
    data: function () {
      return {_id: this.params._id};
    }
  });
});


