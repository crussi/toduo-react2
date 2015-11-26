

Contexts = new Mongo.Collection('contexts');


Context = Astro.Class({
    name: 'Context',
    collection: Contexts,
    fields: {
        AccountId: {
            type: 'string',
            immutable: true
        },
        UserId: {
            type: 'string',
            immutable: true
        },
        Name: {
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
    },
    events: {
        beforeSave: function(){
            console.log('context before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        }
    }
});

Meteor.methods({
    '/context/delete': function (id) {
        //TODO: validate by accountid and userid
        console.log('meteor methods delete context');
        Contexts.remove(id);
    },
    '/context/addNew': function (data) {
        //TODO: validate by accountid and userid
        var context = new Context();
        console.log('context addNew');
        console.dir(data);
        context.set({
            Name: data.Name
        });

        console.dir(context);
        if (context.validate()) {
            context.save();
        } else {
            //TODO: need to return error
            console.log("context is invalid");
            throw new Meteor.Error("Context is invalid", "Unable to save context.");
        }

    },
    '/context/setName': function (data) {
        console.log('context/setName: Name: ' + data.Name);
        Contexts.update(data._id, {$set: {Name: data.Name}});
    },});
