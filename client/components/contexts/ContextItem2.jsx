

ContextItem2 = React.createClass({
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
        console.log('onFocus');
        this.setState({
            focused: true,
            curText: this.props.item.Name
        });
        this.props.onInitiateEdit();
    },

    onBlur(e) {
        console.log("onBlur");
        //console.dir(e);
        this.setState({ focused: false });
        this.props.onStopEdit();
    },
    onRemoveItem() {
        //Meteor.call("/todos/delete", this.props.item._id);
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
        let className = "list-item";

        if (this.props.beingEdited) {
            className += " editing";
        }

        return (
            //<div className={ className }>
            //    <input
            //        type="text"
            //        value={this.state.focused ? this.state.curText : this.props.item.Name}
            //        placeholder="Name"
            //        onFocus={ this.onFocus }
            //        onBlur={ this.onBlur }
            //        onChange={ this.onTextChange } />
            //    <a className="delete-item"
            //       onClick={ this.onRemoveItem }>
            //        <i className="zmdi zmdi-close icon-trash" />
            //    </a>
            //</div>
            <div className={ className } onMouseOut={ this.onMouseOut }>
                <a className="item-icon  icon-move"><i className="zmdi zmdi-apps" /></a>
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