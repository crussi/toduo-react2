

Flags = new Mongo.Collection('flags');


Flag = Astro.Class({
    name: 'Flag',
    collection: Flags,
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
            console.log('flag before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        }
    }
});

Meteor.methods({
    '/flag/delete': function (id) {
        //TODO: validate by accountid and userid
        console.log('meteor methods delete flag');
        Flags.remove(id);
    },
    '/flag/addNew': function (data) {
        //TODO: validate by accountid and userid
        var flag = new Flag();
        console.log('flag addNew');
        console.dir(data);
        flag.set({
            Name: data.Name
        });

        console.dir(flag);
        if (flag.validate()) {
            flag.save();
        } else {
            //TODO: need to return error
            console.log("flag is invalid");
            throw new Meteor.Error("Flag is invalid", "Unable to save flag.");
        }

    },
    '/flag/setName': function (data) {
        console.log('flag/setName: Name: ' + data.Name);
        Flags.update(data._id, {$set: {Name: data.Name}});
    },
});
