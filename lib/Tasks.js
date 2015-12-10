

Tasks = new Mongo.Collection('tasks');


Task = Astro.Class({
    name: 'Task',
    collection: Tasks,
    fields: {
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
        Delegate: {
            type: 'string',
            default:'',
            transient: true
        },
        relations: {
            delegate: {
                type: 'one',
                class: 'Contact',
                local: 'DelegateId',
                foreign: '_id'
            }
        },
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
            this.set('IsComplete',this.DateComplete ? true : false);
        },
        beforeSave: function(){
            console.log('task before save');
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
        Tasks.remove(id);
    },
    '/tasks/addNew': function (data) {
        var route = data.route;
        var task = data.task;
        //var task = new Task();
        console.log('tasks addNew');
        console.dir(data);
        //task.set({
        //    Title: data.Title,
        //    Type: data.TaskType
        //});

        console.dir(task);
        if (task.validate()) {
            task.save();
            var transitionQuestion, transitionRoute;
            console.log(task.type);
            switch (task.Type.toLowerCase()) {
                case "waiting for":
                    transitionQuestion = '"' + task.Title + '" was moved to ' + task.Type.toLowerCase() + ' ' + task.Delegate + ' ...';
                    transitionRoute = route + "/" + task._id + "/" + task.DelegateId;
                    break;
                default:
                    transitionQuestion = '"' + task.Title + '" was moved to ' + task.Type + ' ...';
                    transitionRoute = route + "/" + task._id;
                    break;
            }

            return {_id: task._id, 'Title': task.Title, 'TransitionQuestion': transitionQuestion, "route": transitionRoute};

        } else {
            //TODO: need to return a better error
            console.log("task is invalid");
            throw new Meteor.Error("Task is invalid", "Unable to save the task.");
        }

    }
});
