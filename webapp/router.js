Router.configure({
  layoutTemplate: 'layout'
});

Router.route("/", {name: "index"});


Router.route('/events/:_id', function () {
  this.render('event', {
    data: function () {
      return {_id: this.params._id};
    }
  });
});


