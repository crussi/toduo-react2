
RolesPage = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            updateTime: null
        };
    },
    getMeteorData() {
        const subHandles = [
            Meteor.subscribe("roles")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            items: Roles.find({}, { sort: { sortOrder: 1 } }).fetch(),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    onRemoveItem(itemId,list) {
        //console.log("rolespage itemId: " + itemId + " list: " + list);
        Meteor.call("/role/delete", {_id:itemId,list:list}, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onAddItem() {
        let role = new Role({Name:"New role", sortOrder:this.data.items.length});
        Meteor.call("/role/addNew", role, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onTextChange(itemId, newText) {
        Meteor.call("/role/setName", {_id: itemId, Name:newText}, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onSortChange(list){
        Meteor.call("/role/setSort", list, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    render(){
        //console.log('RolesPage render');
        //console.dir(this.data.items);
        let contextProps = {
            backgroundColor: "#009688",
            icon: "local-offer",
            mediaTitle: "Roles",
            mediaSubtitle:"The roles you play in life, that matter most to you!",
            cardTitle: "What are your most important roles?",
            cardText: "Everything you do ties back to one of these important roles.  The sum of these roles will help define who you are and where you spend your time.  Are you a spouse, a parent, a friend?  If so, use these role areas to help you be certain you're investing your time wisely.",
            data: this.data,
            sortable: true,
            onTextChange: this.onTextChange,
            onSortChange: this.onSortChange,
            onRemoveItem: this.onRemoveItem,
            onAddItem: this.onAddItem,
            height: '100%',
            imgHeight: "150px",
            iconClass: "context-icon"
        }

        return <ContextPage {...contextProps}/>

    }
});