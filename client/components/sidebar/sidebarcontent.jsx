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
        //let contentHeader = (
        //    <div style={styles.title}>Toduo</div>
        //);

        let titleProps = {
            //title: contentHeader,
            title: "Toduo",
            headerBgColor:'#4285f4',
            containerBgColor: 'transparent',
            fontColor: "#ffffff",
            boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.28)',
            display : {
                Docked: false,
                IsContent: false,
                Hamburger: false,
                Title: true,
                Input: false,
                AuthBtns: false,
                AcctMenu: false
            }
        };
        return (
            <TitlePanel {...titleProps} style={style}>
                <SliderMenu/>
            </TitlePanel>);
    },
});
