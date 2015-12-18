const update = React.addons.update;

const styles = {
    sidebar: {
        width: 300,
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    title: {
        marginTop: '3px',
        marginBottom: '4px'
    }
};

SidebarContent = React.createClass({
    //mixins: [ReactMeteorData],
    //getMeteorData() {
    //    const subHandles = [
    //        Meteor.subscribe("menudata")
    //    ];
    //
    //    const subsReady = _.all(subHandles, function (handle) {
    //        return handle.ready();
    //    });
    //
    //    return {
    //        subsReady: subsReady,
    //        menudata: MenuData.find({}).fetch(),
    //        //currentUser: Meteor.user(),
    //        //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
    //        disconnected: false
    //    };
    //
    //},

    render() {
        //console.log('sidebarcontent render');
        let style = styles.sidebar;

        if (this.props.style) {
            style = update(style, {$merge: this.props.style});
        }
        //let sliderMenuProps = {
        //    items: this.data.menudata
        //};
        let contentHeader = (
            <div style={styles.title}>Toduo</div>
        );
        return (
            <TitlePanel title={contentHeader} style={style}>
                <SliderMenu/>
            </TitlePanel>);
    },
});
