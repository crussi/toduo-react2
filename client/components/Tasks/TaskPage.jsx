

TaskPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        // Get list ID from ReactRouter
        const taskId = this.props.id;
        console.log('taskId: ' + taskId);
        // Subscribe to the tasks we need to render this component
        const subHandle = Meteor.subscribe("tasks", taskId);

        return {
            task: Tasks.findOne({ _id: taskId }),
            loading: ! subHandle.ready()
        };
    },

    render() {
        const task = this.data.task;

        if (! task) {
            return <AppNotFound />;
        }

        return (
            <div>
                {task.Title}
            </div>
        );
    }
});
