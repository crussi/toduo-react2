Meteor.publish('inbox', function() {
    return Inbox.find();
});

Meteor.publish('menudata', function() {
    return MenuData.find();
});

Meteor.publish('project', function(id) {
    return Projects.find({_id:id});
});

Meteor.publish('roles', function() {
    return Roles.find({});
});

Meteor.publish('flags', function() {
    return Flags.find({});
});

Meteor.publish('contexts', function() {
    return Contexts.find({});
});

Meteor.publish('delegates', function() {
    return Delegates.find({});
});