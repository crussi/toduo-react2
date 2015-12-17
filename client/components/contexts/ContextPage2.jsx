const {
    List,
    ListDivider,
    TextField,
    Card,
    CardMedia,
    CardTitle,
    CardText,
    FloatingActionButton,
    FontIcon

    } = MUI;

const Colors = MUI.Colors;

ContextPage2 = React.createClass({
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
    onRemoveItem(itemId) {
        console.log('ContextPage onRemoveItem itemId: ' + itemId);
        this.props.onRemoveItem(itemId);
    },
    onAddItem() {
        console.log('ContextPage onAddItem');
        this.props.onAddItem();
    },
    onTextChange(itemId, newText) {
        console.log('ContextPage2 onTextChange');
        //console.log('onTextChange itemId: ' + itemId + ' newText: ' + newText);
        this.props.onTextChange(itemId, newText);
    },
    onSortChange(list){
        console.log('ConextPage2 updateRoles');
        this.props.onSortChange(list);
    },

    render(){

        let listProps = {
            //list: this.props.data.items.fetch(),
            list: this.props.data.items,
            "onRemoveItem": this.onRemoveItem,
            "onTextChange": this.onTextChange,
            "onSortChange": this.onSortChange
        }
        comp = <SortableList {...listProps}/>
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
        let list =  <div className="row">
            <div className="list-items col-xs-4">
                <div>
                    {comp}
                </div>
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

        return <div className="list-page full-height" ref="container">
            <div className="row full-height">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 full-height">
                    <div className="row full-height">
                        <div className="col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10 full-height" ref="tasks">
                            <div className="list-card full-height">
                                <ContextCard {...cardProps} ref="card"/>
                                <div className="context-add-btn">
                                    <FloatingActionButton onClick={this.onAddItem}>
                                        <FontIcon className="zmdi zmdi-plus" />
                                    </FloatingActionButton>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    }
});