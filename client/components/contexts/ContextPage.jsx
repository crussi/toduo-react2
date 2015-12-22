const {
    List,
    FloatingActionButton,
    FontIcon

    } = MUI;

const Colors = MUI.Colors;

ContextPage = React.createClass({

    getInitialState() {
        return {
            taskBeingEditedId: null
        };
    },
    setTaskBeingEdited(taskId) {
        this.setState({
            taskBeingEditedId: taskId
        });
    },
    onRemoveItem(itemId,list) {
        //console.log('ContextPage onRemoveItem itemId: ' + itemId + ' list: ' + list);
        this.props.onRemoveItem(itemId,list);
    },
    onAddItem() {
        //console.log('ContextPage onAddItem');
        this.props.onAddItem();
    },
    onTextChange(itemId, newText) {
        //console.log('onTextChange itemId: ' + itemId + ' newText: ' + newText);
        this.props.onTextChange(itemId, newText);
    },
    onSortChange(list){
        //console.log('ConextPage2 updateRoles');
        this.props.onSortChange(list);
    },
    render(){
        if (!this.props.sortable) {
            comp = this.props.data.items.map((item) => {
                let itemProps = {
                    "key": item._id,
                    "item": item,
                    "beingEdited": item._id === this.state.taskBeingEditedId,
                    "onInitiateEdit": this.setTaskBeingEdited.bind(this, item._id),
                    "onStopEdit": this.setTaskBeingEdited.bind(this, null),
                    "onRemoveItem": this.onRemoveItem.bind(this, item._id),
                    "onTextChange": this.onTextChange.bind(this, item._id)
                };

                return [
                    <ContextItem {...itemProps}/>

                ]
            });
        } else {
            let listProps = {
                list: this.props.data.items,
                "onRemoveItem": this.onRemoveItem,
                "onTextChange": this.onTextChange,
                "onSortChange": this.onSortChange,
                "sortable": this.props.sortable
            }
            comp = <SortableList {...listProps}/>
        }

        //
        //let sectionStyle = {
        //    height:this.props.height,
        //    minHeight:this.props.height
        //};
        //console.log('height: ' + this.state.height);
        //let sectionStyle = {
        //    height:this.state.height,
        //    minHeight:this.state.height
        //};
        //console.dir(sectionStyle);
        //<Scrollbars style={{ width: 1000, height: 300 }}>
        //
        //</Scrollbars>
        let list =  <div className="row">
            <div className="list-items col-xs-4">

                <List>
                    {comp}
                </List>

            </div>
        </div>;

        let cardProps = {
            content: list,
            icon: this.props.icon,
            backgroundColor: this.props.backgroundColor,
            mediaTitle: this.props.mediaTitle,
            mediaSubtitle: this.props.mediaSubtitle,
            cardTitle: this.props.cardTitle,
            cardText: this.props.cardText,
            height: this.state.height
        };

        //return <div className="list-page full-height" ref="container">
        //    <div className="row full-height">
        //        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 full-height">
        //            <div className="row list-container">
        //                <div className="col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10 full-height">
        //                    <div className="list-card full-height">
        //                        <ContextCard {...cardProps} ref="card"/>
        //                        <div className="context-add-btn">
        //                            <FloatingActionButton onClick={this.onAddItem}>
        //                                <FontIcon className="zmdi zmdi-plus" />
        //                            </FloatingActionButton>
        //                        </div>
        //
        //                    </div>
        //                </div>
        //            </div>
        //        </div>
        //
        //    </div>
        //</div>

        return <div name="list-card" className="list-card col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <ContextCard {...cardProps} ref="card"/>
            <div name="add-btn" className="context-add-btn">
                <FloatingActionButton onClick={this.onAddItem}>
                    <FontIcon className="zmdi zmdi-plus" />
                </FloatingActionButton>
            </div>

        </div>

    }
});