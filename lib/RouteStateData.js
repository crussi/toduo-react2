RouteStateData = new Mongo.Collection('routestatedata');

Meteor.methods({
    '/routestatedata/delete': function (id) {
        check(id,String);
        RouteStateData.remove(id);
    }
});
