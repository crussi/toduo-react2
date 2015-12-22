

Tasks = new Mongo.Collection('tasks');

//This didn't work with Astronomy...
//Tasks = new Mongo.Collection('tasks', {
//    transform: function(doc) {
//        console.log('transform ...');
//        doc.delegateObj = Contacts.find({
//            _id: { $in: [doc.DelegateId] }
//        });
//        return doc;
//    }
//});

Task = Astro.Class({
    name: 'Task',
    collection: Tasks,
    fields: {
        AccountId: {
            type: 'string',
            immutable: true
        },
        UserId: {
            type: 'string',
            immutable: true
        },
        Title: {
            type: 'string',
            default:'',
            validator: [
                //Validators.minLength(3),
                Validators.required(),
                Validators.maxLength(100)
            ]
        },
        Type: {
            type: 'string',
            default:'',
            validator: [
                //Validators.minLength(3),
                Validators.required(),
                Validators.maxLength(100)
            ]
        },
        DelegateId: {
            type: 'string',
            default:''
        },
        //DelegateName: {
        //    type: 'string',
        //    default:'',
        //    transient: true
        //},
        Delegate: {
            type: 'object',
            transient: true,
            default: function() {
                return {};
            }
        },
        //relations: {
        //    delegate: {
        //        type: 'one',
        //        class: 'Contact',
        //        local: 'DelegateId',
        //        foreign: '_id'
        //    }
        //},
        NextAction: {
            type: 'string',
            default:'',
            validator: [
                //Validators.minLength(3),
                Validators.maxLength(100)
            ]
        },
        DateDue: {
            type:'date',
            optional: true
        },
        DateComplete: {
            type: 'date'
        },
        IsComplete: {
            type:'boolean',
            transient: true,
            default: false
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
    events: {
        afterInit: function() {
            //console.log('Tasks afterInit');
            this.loadDelegate();
        },
        beforeSave: function(){
            //console.log('task before save');
            //TODO: Need to drive this by authenticated user!
            this.set('UserId','g94HOmCDVkiKEl0NyuBc8w');
            this.set('AccountId','jADe-P9Nzke_Tkio1IVnRw');
        },
        validationError: function(e) {
            console.dir(e);
            //if (
            //    e.data.validator.name === 'minLength' &&
            //    e.data.fieldName === 'firstName'
            //) {
            //    // Set a new error message.
            //    e.setMessage('The first name is too short!');
            //    // You have to stop propagation.
            //    e.stopPropagation();
            //}
        }
    },
    methods: {
        loadDelegate: function(){
            //console.log('loadDelegate: ' + this.DelegateId);
            if (Meteor.isClient && this.DelegateId && this.DelegateId.length > 0) {
                //console.log('loadDelegate isClient');
                this.Delegate = Delegates.findOne({_id: this.DelegateId});
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
    }
});

Meteor.methods({
    '/tasks/delete': function (id) {
        check(id,String);
        Tasks.remove(id);
    },
    '/tasks/addNew': function (data) {
        var isTask =  Match.Where(function (obj) {
            return obj instanceof Task;
        });
        check(data,{route:String, task: IsTask});
        var route = data.route;
        var task = data.task;

        //console.log('tasks addNew');
        //console.dir(task);

        if (task.validate()) {
            task.save();
            var transitionQuestion;
            //console.log(task.Type);
            switch (task.Type.toLowerCase()) {
                case "waiting for":
                    transitionQuestion = '"' + task.Title + '" was moved to ' + task.Type.toLowerCase() + ' ' + task.Delegate.Name + ' ...';
                    break;
                default:
                    transitionQuestion = '"' + task.Title + '" was moved to ' + task.Type + ' ...';
                    break;
            }
            var transitionRoute = transitionRoute = route + "/" + task._id;

            return {_id: task._id, 'Title': task.Title, 'TransitionQuestion': transitionQuestion, "route": transitionRoute};

        } else {
            //TODO: need to return a better error
            //console.log("task is invalid");
            throw new Meteor.Error("Task is invalid", "Unable to save the task.");
        }

    }
});
