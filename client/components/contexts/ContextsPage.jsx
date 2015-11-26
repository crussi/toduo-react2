
ContextsPage = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            updateTime: null
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("contexts")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            items: Contexts.find({}, { sort: { sortorder: 1 } }),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    onRemoveItem(itemId) {
        Meteor.call("/context/delete", itemId, (err, res) => {
            if (err) {
                console.log('error');
                console.dir(err);
                return;
            } else {
                console.log("context delete success");
                this.setState({updateTime: (new Date()).getTime()});
            }
        });
    },
    onAddItem() {
        Meteor.call("/context/addNew", {Name:"New context"}, (err, res) => {
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
        //console.log('contexts onTextChange itemId: ' + itemId + ' newText: ' + newText);
        Meteor.call("/context/setName", {_id: itemId, Name:newText}, (err, res) => {
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
        let cardText = "Whether you're at the store, at work, at home, online or on the phone, ";
        cardText += "these are the places you get things done.  Also, during downtime, this weekend, ";
        cardText += "on the way home are examples of when you might do something.  These are all contexts."

        let contextProps = {
            backgroundColor: "#009688",
            icon: "pin ",
            mediaTitle: "Contexts",
            mediaSubtitle:"Where and when you get things done",
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