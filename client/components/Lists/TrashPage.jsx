

TrashPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        const trashId = this.props.id;

        const subHandles = [
            Meteor.subscribe("trash")
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {
            subsReady: subsReady,
            //task: Tasks.findOne({ _id: trashId }),
            //Noe: work-a-round until minimongo supports $eq
            trash: Trash.find({}),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };
    },

    render() {
        console.log("TrashPage render");
        console.dir(this.data.trash);
        let list = this.data.trash.map((trashItem) => {
            //TODO: taskId passed in ... highlight row

            return [
                <li key={trashItem._id}>{trashItem.Title}</li>
            ]
        });

        if (!this.data.trash) {
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
