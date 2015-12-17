

SortableList = React.createClass({
    mixins: [SortableMixin],

    //Note: state HAS to be contain items
    getInitialState: function() {
        return {
            items: this.props.list,
            taskBeingEditedId: null
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            items: nextProps.list
        });
    },
    handleSort: function (/** Event */evt) {
        let items = this.state.items.slice();
        //console.dir(items);
        let i = 0;
        let min = Math.min(evt.oldIndex,evt.newIndex);
        let max = Math.max(evt.oldIndex,evt.newIndex);
        let list = [];
        for (i=min;i<=max;i++){
            items[i].sortOrder=i;
            list.push({_id: items[i]._id, sortOrder: i});
        }
        //this.setState({items: items});
        this.props.onSortChange(list);
    },
    setTaskBeingEdited(taskId) {
        this.setState({
            taskBeingEditedId: taskId
        });
    },
    onRemoveItem(itemId) {
        console.log('SortableList onRemoveItem itemId: ' + itemId);
        this.props.onRemoveItem(itemId);
    },
    onAddItem() {
        console.log('SortableList onAddItem');
        this.props.onAddItem();
    },
    onTextChange(itemId, newText) {
        console.log('SortableList onTextChange');
        console.log('onTextChange itemId: ' + itemId + ' newText: ' + newText);
        //Note: I only have to do this for sortable, not the others ...

        //let items = this.state.items.slice();
        //let i;
        //for (i = 0; i<items.length;i++){
        //    if (items[i]._id == itemId) {
        //        console.log('assigned!!!');
        //        items[i].Title = newText;
        //        break;
        //    }
        //}
        //this.setState({items: items});

        this.props.onTextChange(itemId, newText);
    },

    render: function() {
        //console.log('SortableIst render');
        //console.dir(this.state.items);
        //return <ul>{
        //    this.state.items.map(function (obj) {
        //        return <li>{obj.Name}</li>
        //        })
        //    }</ul>


        return <div className="sortable-list">{
            this.state.items.map((item) => {
                let itemProps = {
                    "key": item._id,
                    "item": item,
                    "beingEdited": item._id === this.state.taskBeingEditedId,
                    "onInitiateEdit": this.setTaskBeingEdited.bind(this, item._id),
                    "onStopEdit": this.setTaskBeingEdited.bind(this, null),
                    "onRemoveItem": this.onRemoveItem.bind(this, item._id),
                    "onTextChange": this.onTextChange.bind(this, item._id)
                    };
                return <ContextItem2 {...itemProps}/>
                })
            }</div>

        //let comp = this.props.data.items.map((item) => {
        //    let itemProps = {
        //        "key": item._id,
        //        "item": item,
        //        "beingEdited": item._id === this.state.taskBeingEditedId,
        //        "onInitiateEdit": this.setTaskBeingEdited.bind(this, item._id),
        //        "onStopEdit": this.setTaskBeingEdited.bind(this, null),
        //        "onRemoveItem": this.onRemoveItem.bind(this, item._id),
        //        "onTextChange": this.onTextChange.bind(this, item._id)
        //    };
        //
        //    return [
        //        <ContextItem {...itemProps}/>
        //
        //    ]
        //});
        //return {list}
    }

});