

ReferencePage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        const referenceId = this.props.id;

        const subHandles = [
            Meteor.subscribe("references")
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {
            subsReady: subsReady,
            //task: Tasks.findOne({ _id: referenceId }),
            //Noe: work-a-round until minimongo supports $eq
            references: References.find({}),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };
    },

    render() {

        let list = this.data.references.map((reference) => {
            //TODO: taskId passed in ... highlight row

            return [
                <li key={reference._id}>{reference.Title}</li>
            ]
        });

        if (!this.data.references) {
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
