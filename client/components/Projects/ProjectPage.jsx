

ProjectPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        // Get list ID from ReactRouter
        const projectId = this.props.id;
        console.log('projectId: ' + projectId);
        // Subscribe to the tasks we need to render this component
        const projectSubHandle = Meteor.subscribe("project", projectId);

        return {
            project: Projects.findOne({ _id: projectId }),
            projectLoading: ! projectSubHandle.ready()
        };
    },

    render() {
        const project = this.data.project;

        if (! project) {
            return <AppNotFound />;
        }

        return (
            <div>
                {this.data.project.Title}
            </div>
        );
    }
});
