
//TODO: Remember to go through and make these user/account specific!!!!
//TODO: Remember to go through and make these user/account specific!!!!
//TODO: Remember to go through and make these user/account specific!!!!
//TODO: Remember to go through and make these user/account specific!!!!
Meteor.publish('inbox', function() {
    return Inbox.find();
});

Meteor.publish('menudata', function() {
    return MenuData.find();
});

Meteor.publish('routestatedata', function() {
    return RouteStateData.find();
});

Meteor.publish('project', function(id) {
    check(id,String);
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

Meteor.publish('delegate', function(id) {
    check(id,String);
    return Delegate.findOne({_id:id});
});

Meteor.publish('contacts', function() {
    return Contacts.find({});
});

Meteor.publish('contact', function(id) {
    check(id,String);
    return Contact.findOne({_id:id});
});

Meteor.publish('task', function(id) {
    check(id,String);
    return Tasks.findOne({_id:id});
});

Meteor.publish('references', function() {
    return References.find({});
});

Meteor.publish('trash', function() {
    return Trash.find({});
});



