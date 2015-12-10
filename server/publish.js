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
    return Contacts.find({});
});

Meteor.publish('contacts', function() {
    return Contacts.find({});
});

Meteor.publish('contact', function(id) {
    var contact = Contact.findOne({_id:id});
    return contact;
});

Meteor.publish('task', function(id) {
    var task = Tasks.findOne({_id:id});
    console.log('publish task');
    console.dir(task);
    return task;
});

