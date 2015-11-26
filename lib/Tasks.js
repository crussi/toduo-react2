

Tasks = new Mongo.Collection('tasks');


Task = Astro.Class({
    name: 'Task',
    collection: Tasks,
    fields: {
        Title: {
            type: 'string',
            validator: [
                //Validators.minLength(3),
                Validators.maxLength(100)
            ]
        },
        NextAction: {
            type: 'string',
            validator: [
                //Validators.minLength(3),
                Validators.maxLength(100)
            ]
        },
        DateDue: {
            type:'date',
            optional: true
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
        var task = new Task();
        console.log('tasks addNew');
        console.dir(data);
        task.set({
            Title: data.Title,
            Type: data.TaskType
        });

        console.dir(task);
        if (task.validate()) {
            task.save();
            var transitionQuestion = '"' + task.Title + '" was moved to ' + data.TaskType + ' ...';
            var transitionRoute = data.route + "/" + task._id;
            return {_id: task._id, 'Title': task.Title, 'TransitionQuestion': transitionQuestion, "route": transitionRoute};

        } else {
            //TODO: need to return a better error
            console.log("task is invalid");
            throw new Meteor.Error("Task is invalid", "Unable to save the task.");
        }

    }
});
