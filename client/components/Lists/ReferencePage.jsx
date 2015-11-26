

ReferencePage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        // Get list ID from ReactRouter
        const referenceId = this.props.id;
        // Subscribe to the tasks we need to render this component
        const subHandle = Meteor.subscribe("references", referenceId);

        return {
            reference: References.findOne({ _id: referenceId }),
            loading: ! subHandle.ready()
        };
    },

    render() {
        const reference = this.data.reference;

        if (! reference) {
            return <AppNotFound />;
        }

        return (
            <div>
                {reference.Title}
            </div>
        );
    }
});
