

TaskPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        const taskId = this.props.id;
        const type = this.props.type;

        const subHandles = [
            Meteor.subscribe("task"), Meteor.subscribe("delegates")
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {
            subsReady: subsReady,
            //task: Tasks.findOne({ _id: taskId }),
            //Noe: work-a-round until minimongo supports $eq
            tasks: Tasks.find({Type:{$not:{$ne:type}}}),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };
    },

    render() {
        //const task = this.data.task;
        console.dir(this.data.tasks);
        let item;
        let list = this.data.tasks.map((task) => {
            //TODO: taskId passed in ... highlight row
            if (task.DelegateId.length == 0) {
                item = <li key={task._id}>{task.Title}</li>
            }else {
                item = <li key={task._id}>{task.Title} delegated to: {task.Delegate.Name}</li>
            }
            return [
                item
            ]
        });
        console.log(list);
        if (!this.data.tasks) {
            return <AppNotFound />;
        }

        return (
            <div>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
});
