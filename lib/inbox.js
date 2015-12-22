Inbox = new Mongo.Collection('inbox');

Meteor.methods({
    '/inbox/delete': function (id) {
        check(id, String);
        Inbox.remove(id);
    },
    '/inbox/setDescription': function (id, description) {
        //console.log('inbox/setDescription: description: ' + description);
        check(id, String);
        check(description, String);
        Inbox.update(id, {$set: {description: description}});
    },
    '/inbox/addNew': function (description) {
        check(description, String);
        var timestamp = (new Date()).getTime();
        var now = new Date(timestamp);
        //console.log('inbox addNew');
        Inbox.insert({
            description: description,
            dateCreated: now
        });
    }
});
