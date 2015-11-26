//Note: there was a problem trying to use the term delegate.  Switching to contact.

Contacts = new Mongo.Collection('contacts');


Contact = Astro.Class({
    name: 'Contact',
    collection: Contacts,
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
            console.log('contact before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        }
    }
});

Meteor.methods({
    '/contact/delete': function (id) {
        //TODO: validate by accountid and userid
        console.log('meteor methods delete contact');
        Contacts.remove(id);
    },
    '/contact/addNew': function (data) {
        //TODO: validate by accountid and userid
        var contact = new Contact();
        console.log('contact addNew');
        console.dir(data);
        contact.set({
            Name: data.Name
        });

        console.dir(contact);
        if (contact.validate()) {
            contact.save();
        } else {
            //TODO: need to return error
            console.log("contact is invalid");
            throw new Meteor.Error("Contact is invalid", "Unable to save contact.");
        }

    },
    '/contact/setName': function (data) {
        console.log('contact/setName: Name: ' + data.Name);
        Contacts.update(data._id, {$set: {Name: data.Name}});
    },
});
