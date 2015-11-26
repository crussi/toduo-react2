

References = new Mongo.Collection('references');


Reference = Astro.Class({
    name: 'Reference',
    collection: References,
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
    '/references/delete': function (id) {
        References.remove(id);
    },
    '/references/addNew': function (data) {
        var reference = new Reference();
        console.log('references addNew');
        console.dir(data);
        reference.set({
            Title: data.Title,
            Type: data.TaskType
        });

        console.dir(reference);
        if (reference.validate()) {
            reference.save();
            var transitionQuestion = '"' + reference.Title + '" was moved to references ...';
            var transitionRoute = data.route + "/" + reference._id;
            return {_id: reference._id, 'Title': reference.Title, 'TransitionQuestion': transitionQuestion, "route": transitionRoute};
        } else {
            //TODO: need to return error
            console.log("reference is invalid");
            throw new Meteor.Error("Reference is invalid", "Unable to save the reference.");
        }

    }
});
