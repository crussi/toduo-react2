

WaitingForPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        const taskId = this.props.id;
        const subHandles = [
            Meteor.subscribe("task"), Meteor.subscribe("delegates")
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {
            subsReady: subsReady,
            //task: Tasks.findOne({ _id: taskId }),
            tasks: Tasks.find({$and: [
                { DelegateId: {$ne:''}} ,
                { DelegateId: {$exists: true }}]}),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };
    },

    render() {
        //const task = this.data.task;
        //console.dir(this.data.tasks);
        let list = this.data.tasks.map((task) => {
            //TODO: taskId passed in ... highlight row
            return [
                <li key={task._id}>{task.Title} delegated to: {task.Delegate.Name}</li>
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
