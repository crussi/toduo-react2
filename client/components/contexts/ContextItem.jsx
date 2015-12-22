const {
    Tooltip

    } = MUI;

ContextItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onStopEdit: React.PropTypes.func,
        onInitiateEdit: React.PropTypes.func,
        onRemoveItem: React.PropTypes.func,
        onTextChange: React.PropTypes.func,
        beingEdited: React.PropTypes.bool
    },

    getInitialState() {
        return {
            focused: false,
            curText: null
        };
    },
    onDoubleClick(e){
        if (e.target) {
            //let val = e.target.value;
            //e.target.value = "";
            //e.target.value = val;
            e.target.setSelectionRange(0, e.target.value.length);
        }
        this.setState({
            focused: true,
            curText: this.props.item.Name
        });
        this.props.onInitiateEdit();
    },
    onMouseOut(e) {
        //console.log("onMouseOut");
        //console.dir(e);
        if (this.state.focused) {
            this.setState({ focused: false });
            this.props.onStopEdit();
            this.refs.inputText.setSelectionRange(0,0);
        }
    },
    onFocus() {
        //console.log('onFocus');
        this.setState({
            focused: true,
            curText: this.props.item.Name
        });
        this.props.onInitiateEdit();
    },

    onBlur(e) {
        //console.log("onBlur");
        //console.dir(e);
        this.setState({ focused: false });
        this.props.onStopEdit();
    },
    onRemoveItem() {
        //console.log('ContextItem onRemoveItem');
        this.props.onRemoveItem();
    },
    onTextChange(event) {
        //console.log('ContextItem2 onTextChange');
        const curText = event.target.value;
        this.setState({curText: curText});

        // Throttle updates so we don't go to minimongo and then the server
        // on every keystroke.
        this.updateText = this.updateText || _.throttle(newText => {
                //Meteor.call("/todos/setText", this.props.item._id, newText);
                this.props.onTextChange(newText);
            }, 300);

        this.updateText(curText);
    },
    render() {
        //console.log("ContextItem2 render");
        //console.dir(this.state);
        let className = this.props.sortable ? "list-item sortable" : "list-item";

        if (this.props.beingEdited) {
            className += " editing";
        }
        let comp;
        if (this.props.sortable) {
            //console.log('is sortable')
            comp = <a className="item-icon  icon-move"><i className="zmdi zmdi-apps" /></a>
        }
        return (
            <div className={ className } onMouseOut={ this.onMouseOut }>
                {comp}
                <input
                    type="text"
                    value={this.state.focused ? this.state.curText : this.props.item.Name}
                    placeholder="Name"
                    onDoubleClick={this.onDoubleClick }
                    onBlur={ this.onBlur }
                    onChange={ this.onTextChange }
                    readOnly={!this.state.focused}
                    ref="inputText"
                />
                <a className="item-icon icon-close" onClick={ this.onRemoveItem }>
                    <i className="zmdi zmdi-close" />
                </a>

            </div>
        );
    }
});