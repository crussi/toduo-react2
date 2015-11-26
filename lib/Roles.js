

Roles = new Mongo.Collection('roles');


Role = Astro.Class({
    name: 'Role',
    collection: Roles,
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
        sortOrder: {
            type: 'number'
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
            console.log('roles before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        }
    }
});

Meteor.methods({
    '/role/delete': function (id) {
        //TODO: validate by accountid and userid
        console.log('meteor methods delete role');
        Roles.remove(id);
    },
    '/role/addNew': function (data) {
        //TODO: validate by accountid and userid

        var role = new Role();
        console.log('role addNew');
        console.dir(data);
        role.set({
            Name: data.Name
        });

        console.dir(role);
        if (role.validate()) {
            role.save();
        } else {
            //TODO: need to return error
            console.log("role is invalid");
            throw new Meteor.Error("Role is invalid", "Unable to save role.");
        }

    },
    '/role/setName': function (data) {
        console.log('role/setName: Name: ' + data.Name);
        Roles.update(data._id, {$set: {Name: data.Name}});
    },
});
