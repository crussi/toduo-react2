

Trash = new Mongo.Collection('trash');


TrashItem = Astro.Class({
    name: 'TrashItem',
    collection: Trash,
    fields: {
        Title: {
            type: 'string',
            validator: [
                //Validators.minLength(3),
                Validators.maxLength(100)
            ]
        },
        dateCreated: {
            type: 'date',
            immutable: true
        },
        dateUpdated: {
            type: 'date',
            immutable: true
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'dateCreated',
            hasUpdatedField: true,
            updatedFieldName: 'dateUpdated'
        }
    }
});

Meteor.methods({
    '/trash/delete': function (id) {
        Trash.remove(id);
    },
    '/trash/addNew': function (data) {
        var route = data.route;
        var task = data.task;
        var trashItem = new TrashItem();
        console.log('trash addNew');
        console.dir(data);
        trashItem.set({
            Title: task.Title,
            Type: task.Type
        });
        task = null;

        console.dir(trashItem);
        if (trashItem.validate()) {
            trashItem.save();
            var transitionQuestion = '"' + trashItem.Title + '" was moved to trash ...';
            var transitionRoute = route;
            return {_id: trashItem._id, 'Title': trashItem.Title, 'TransitionQuestion': transitionQuestion, "route": transitionRoute};
        } else {
            //TODO: need to return error
            console.log("trash is invalid");
            throw new Meteor.Error("Trash is invalid", "Unable to save trash.");
        }

    }
});
