const {
    List,
    ListItem,
    ListDivider,
    Avatar,
    Styles

    } = MUI;

const styles = {
    list: {
        marginRight: '120px'
        //marginLeft: '10px'
    }
}

InboxList = React.createClass({
    propTypes: {
        selectedItemId: React.PropTypes.string
    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("inbox")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            inboxItems: Inbox.find({}, { sort: { dateCreated: 1, description: 1 } }).fetch(),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    selectItem(itemId) {
        //console.log('selectItem itemId: ' + itemId);
        //this.props.onItemSelected(itemId);
    },
    //handleCallback(val){
    //    console.log('inboxlist project-new-id: ' + sessionStore.get('project-new-id')._id);
    //    console.log('InboxList handleCallback');
    //},
    handleRouting(cardKey){
        this.handleRemove(cardKey);
        //let _id = sessionStore.get('project-new')._id;
        //console.log('inboxList handleRouting id: ' + _id);
        //FlowRouter.go('/project/' + _id);
        let route = sessionStore.get('transition-new').route;
        //let _id = sessionStore.get('transition-new')._id;
        console.log('inboxList handleRouting route: ' + route);
        FlowRouter.go(route);
    },
    handleRemove(cardKey){
        Meteor.call("/inbox/delete", cardKey, (err, res) => {
            if (err) {
                return;
            } else {
                console.log("inbox delete success");
            }
        });
    },
    render() {
        let listStyle = this.props.style ?
            update(styles.list, {$merge: this.props.style}) :
            styles.list;

        let comp;
        if (this.data.subsReady) {
            let style = {
                paddingTop:'10px',
                paddingBottom:'10px'
            };
            let avatarStyle = {
                fontSize:'20px'
            }
            comp = this.data.inboxItems.map((item) => {

                        //if (this.props.selectedItemId === item._id) {
                        //    style["backgroundColor"] = "#eee";
                        //}
                        let today = moment(new Date().toJSON());
                        let days = today.diff(item.dateCreated,'days');
                        let secondaryText = moment(item.dateCreated).fromNow();
                        let cardProps = {
                            cardKey: item._id,
                            primaryText: item.description,
                            avatar: <Avatar style={avatarStyle}>{days}</Avatar>,
                            secondaryText: "Entered " + secondaryText,
                            nextstep: this.props.nextstep,
                            handleRouting: this.handleRouting,
                            handleRemove: this.handleRemove
                        }
                        return [
                            <CollapseCard key={ item._id } {...cardProps}/>
                        ]
                    })


        } else {
            comp = <AppLoading/>
        }

        return (<div style={listStyle}>{comp}</div>);
    }
});