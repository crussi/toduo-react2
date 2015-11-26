

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

    onFocus() {
        this.setState({
            focused: true,
            curText: this.props.item.Name
        });
        this.props.onInitiateEdit();
    },

    onBlur() {
        this.setState({ focused: false });
        this.props.onStopEdit();
    },
    onRemoveItem() {
        //Meteor.call("/todos/delete", this.props.item._id);
        this.props.onRemoveItem();
    },
    onTextChange(event) {
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
        let className = "list-item";

        if (this.props.beingEdited) {
            className += " editing";
        }

        return (
        <div className={ className }>
            <input
                type="text"
                value={this.state.focused ? this.state.curText : this.props.item.Name}
                placeholder="Name"
                onFocus={ this.onFocus }
                onBlur={ this.onBlur }
                onChange={ this.onTextChange } />
                <a className="delete-item"
                   onClick={ this.onRemoveItem }>
                    <i className="zmdi zmdi-close icon-trash" />
                </a>
        </div>
        );
    }
});