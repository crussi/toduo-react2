//Note: there was a problem trying to use the term delegate.  Switching to contact.

Delegates = new Mongo.Collection('delegates');


DelegateTo = Astro.Class({
    name: 'DelegateTo',
    collection: Delegates,
    fields: {
        AccountId: {
            type: 'string',
            immutable: true
        },
        UserId: {
            type: 'string',
            immutable: true
        },
        ContactId: {
            type: 'string',
            immutable: true
        },
        Name: {
            type: 'string',
            immutable: true
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
    methods: {
        copyContact: function(contact){
            if (contact) {
                this.Name = contact.Name;
                this.ContactId = contact._id;
            }
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
            console.log('delegate before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        }
    }
});

Meteor.methods({
    '/delegate/delete': function (id) {
        check(id,String);
        //TODO: validate by accountid and userid
        console.log('meteor methods delete delegate');
        Delegates.remove(id);
    },
    '/delegate/addNew': function (contact) {
        console.log("server addNew");
        //TODO: validate by accountid and userid
        check(contact, Match.Where(function (obj) {
            return obj instanceof Contact;
        }));
        console.log("before new Delegate");
        var delegate = new DelegateTo();
        console.log("afer new Delegate");
        console.log('delegate addNew');
        console.dir(contact);
        delegate.copyContact(contact);
        console.dir(delegate);
        //delegate.set({
        //    Name: data.Name
        //});
console.log("before delegate.validate");
        //console.dir(delegate);
        if (delegate.validate()) {
            console.log("delegate is valid before save");
            delegate.save();
            //Delegates.insert({ContactId:contact._id,"Name":contact.Name});
        } else {
            //TODO: need to return error
            console.log("delegate is invalid");
            console.dir(delegate.getValidationErrors());
            throw new Meteor.Error("Delegate is invalid", "Unable to save delegate.");
        }

    }
    //'/delegate/setName': function (data) {
    //    console.log('delegate/setName: Name: ' + data.Name);
    //    Delegates.update(data._id, {$set: {Name: data.Name}});
    //},
});
