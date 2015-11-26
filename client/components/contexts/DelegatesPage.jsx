
DelegatesPage = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            updateTime: null
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("delegates")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            items: Contacts.find({}, { sort: { sortorder: 1 } }),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    onRemoveItem(itemId) {
        Meteor.call("/contact/delete", itemId, (err, res) => {
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
        console.log('delegates onAddItem');
        Meteor.call("/contact/addNew", {Name:"New delegate"}, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                console.log("delegate add success");
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onTextChange(itemId, newText) {
        Meteor.call("/contact/setName", {_id: itemId, Name:newText}, (err, res) => {
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
        let cardText = "Learn to delegate tasks whenever possible.  You can keep track of to whom you've delegated tasks.  ";
        cardText += "Here you can also track useful service providers."
        let contextProps = {
            backgroundColor: "#009688",
            icon: "account-box",
            mediaTitle: "Delegates",
            mediaSubtitle:"Does a task require someone else's action?",
            cardTitle: "",
            cardText: cardText,
            data: this.data,
            sortable: false,
            onTextChange: this.onTextChange,
            onRemoveItem: this.onRemoveItem,
            onAddItem: this.onAddItem
        }

        return <ContextPage {...contextProps}/>
    }
});