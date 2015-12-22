

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
        //let items = this.state.items.slice();
        //console.dir(items);
        let i = 0;
        let min = Math.min(evt.oldIndex,evt.newIndex);
        let max = Math.max(evt.oldIndex,evt.newIndex);
        let list = [];
        for (i=min;i<=max;i++){
            //items[i].sortOrder=i;
            list.push({_id: this.state.items[i]._id, sortOrder: i});
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
        //console.log('SortableList onRemoveItem itemId: ' + itemId);
        let i = 0, min = 0;
        let max = this.state.items.length-1;
        for (i;i<=max;i++){
            if (this.state.items[i]._id == itemId) {
                min = Math.min(i+1,max);
                break;
            }
        }
        //console.log('SortableList min: ' + min + ' max: ' + max);
        let list = [];
        for (i=min;i<=max;i++){
            //items[i].sortOrder=i;
            list.push({_id: this.state.items[i]._id, sortOrder: i-1});
        }
        this.props.onRemoveItem(itemId,list);
    },
    onAddItem() {
        //console.log('SortableList onAddItem');
        this.props.onAddItem();
    },
    onTextChange(itemId, newText) {
        this.props.onTextChange(itemId, newText);
    },

    render: function() {
        return <div className="sortable-list">{
            this.state.items.map((item) => {
                let itemProps = {
                    "key": item._id,
                    "item": item,
                    "beingEdited": item._id === this.state.taskBeingEditedId,
                    "onInitiateEdit": this.setTaskBeingEdited.bind(this, item._id),
                    "onStopEdit": this.setTaskBeingEdited.bind(this, null),
                    "onRemoveItem": this.onRemoveItem.bind(this, item._id),
                    "onTextChange": this.onTextChange.bind(this, item._id),
                    "sortable": this.props.sortable
                    };
                return <ContextItem {...itemProps}/>
                })
            }</div>

    }

});