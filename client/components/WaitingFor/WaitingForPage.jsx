

WaitingForPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        // Get list ID from ReactRouter
        const taskId = this.props.id;
        const delegateId = this.props.delegateId;
        // Subscribe to the tasks we need to render this component
        const subHandles = [
            Meteor.subscribe("contacts"),
            Meteor.subscribe("task")
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            task: Tasks.findOne({ _id: taskId }),
            contact: Contacts.findOne({_id: delegateId}),

            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };
    },

    render() {
        const task = this.data.task;
        const contact = this.data.contact;
        //task.delegates().forEach(function (delegate) {
        //    /* Do something with the address */
        //    console.log('Waitingfor render');
        //    console.dir(delegate);
        //});
        console.log('waiting for render');
        console.dir(task);

        console.dir(contact);
        //console.dir(task.delegate());

        if (! task) {
            return <AppNotFound />;
        }

        return (
            <div>
                {task.Title} delegated to: {contact.Name}
            </div>
        );
    }
});
