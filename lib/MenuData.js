MenuData = new Mongo.Collection('menudata');

//{
//    id: "UeWFiTObrEGrl88O9woGtA",
//    name: "Projects",
//    icon: "assignment-o",
//    color: "pink",
//    route: "/project",
//    children: [
//    {
//        id: "7EHOtAYARkG0c43qsDH5cQ",
//        name: "Project 1",
//        icon: "assignment",
//        color: "pink",
//        route: "/project/1"



        Meteor.methods({
    '/menudata/delete': function (id) {
        MenuData.remove(id);
    }
    //'/menudata/setDescription': function (id, description) {
    //    //console.log('inbox/setDescription: description: ' + description);
    //    Inbox.update(id, {$set: {description: description}});
    //},
    //'/menudata/addProject': function (project) {
    //    MenuData.update({name: 'Projects'}, {
    //        '$push': {
    //            "children": {
    //                "_id": project._id,
    //                "name": project.Title,
    //                "icon": "assignment",
    //                "color": "pink",
    //                "route": "/project/" + project._id
    //            }
    //        }
    //    });
    //}
});
