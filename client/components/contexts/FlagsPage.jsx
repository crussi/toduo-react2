
FlagsPage = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            updateTime: null
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("flags")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            items: Flags.find({}, { sort: { sortorder: 1 } }),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    onRemoveItem(itemId) {
        Meteor.call("/flag/delete", itemId, (err, res) => {
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
        console.log('flags onAddItem');
        Meteor.call("/flag/addNew", {Name:"New flag"}, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                console.log("flag add success");
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onTextChange(itemId, newText) {
        Meteor.call("/flag/setName", {_id: itemId, Name:newText}, (err, res) => {
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

        let contextProps = {
            backgroundColor: "#009688",
            icon: "flag",
            mediaTitle: "Flags",
            mediaSubtitle:"These flags help categorize your tasks.",
            cardTitle: "What flags will help you categorize your tasks?",
            cardText: 'Flags like "Priority", "Vacation", "Wedding", etc. will help you connect related tasks.',
            data: this.data,
            sortable: false,
            onTextChange: this.onTextChange,
            onRemoveItem: this.onRemoveItem,
            onAddItem: this.onAddItem
        }

        return <ContextPage {...contextProps}/>
    }
});