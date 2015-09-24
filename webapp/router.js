Router.configure({
  layoutTemplate: 'layout'
});

Router.route("/", {name: "index"});


Router.route('/events/:_id', function () {
   var event = Meteor.call('oneEvent')
   if (event){
   	this.response.statusCode = 200;
    this.response.end(JSON.stringify(event));
   } else {
   	this.response.statusCode = 404;
    this.response.end( { status: "404", message: "User not found." } );
   }
}, { where: "server" });


