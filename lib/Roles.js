

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
    '/role/delete': function (data) {
        IsSortableObj = Match.Where(function (obj) {
            return Match.test(obj, { _id: String, sortOrder: Number });
        });
        check(data, {
            _id: String,
            list: [IsSortableObj]
        });
        //TODO: validate by accountid and userid
        //console.log('meteor methods delete role id:' + id);
        var id = data._id;
        var list = data.list;
        console.log('role/delete  id: ' + id + ' list: ' + list);
        Roles.remove({_id: id});
        var i = 0;
        if (list && list.length) {
            for (i=0;i<list.length;i++){
                Roles.update({_id:list[i]._id},{$set: {sortOrder:list[i].sortOrder}});
            }
        }
    },
    '/role/addNew': function (role) {
        //TODO: validate by accountid and userid
        //console.dir(role);
        check(role, Match.Where(function (obj) {
            return obj instanceof Role;
        }));
        if (role.validate()) {
            role.save();
        } else {
            //TODO: need to return error
            console.log("role is invalid");
            throw new Meteor.Error("Role is invalid", "Unable to save role.");
        }

    },
    '/role/setSort': function (list) {
        //TODO: validate by accountid and userid
        //console.log('server /role/setSort')
        //console.dir(list);
        IsSortableObj = Match.Where(function (obj) {
            return Match.test(obj, { _id: String, sortOrder: Number });
        });
        check(list,[IsSortableObj]);

        var i = 0;
        if (list && list.length) {
            for (i=0;i<list.length;i++){
                Roles.update({_id:list[i]._id},{$set: {sortOrder:list[i].sortOrder}});
            }
        }

    },
    '/role/setName': function (data) {
        //console.log('role/setName: Name: ' + data.Name);
        check(data,{_id: String, Name: String});
        Roles.update(data._id, {$set: {Name: data.Name}});
    },
});
