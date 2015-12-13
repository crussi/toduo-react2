RouteStateData = new Mongo.Collection('routestatedata');

Meteor.methods({
    '/routestatedata/delete': function (id) {
        RouteStateData.remove(id);
    }
});
