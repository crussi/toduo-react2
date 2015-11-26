
function childrenValidator(props, propName, componentName){
    var children = props[propName];
    var mainButtonCount = 0;
    var childButtonCount = 0;
    var otherCount = 0;
    var msg;
    Children.forEach(children, function(child){
        if(child.type === MainButton){
            return mainButtonCount++;
        }
        if(child.type === ChildButton){
            return childButtonCount++;
        }
        otherCount++;
    });
    if(mainButtonCount === 0){
        msg = 'Prop `children` must contain a MainButton component in `' + componentName + '`.';
        return new Error(msg);
    }
    if(mainButtonCount > 1){
        msg = 'Prop `children` must contain only 1 MainButton component in `' +
            componentName + '`, but ' + mainButtonCount + ' exist.';
        return new Error(msg);
    }
    if(otherCount){
        msg = 'Prop `children` contains elements other than MainButton and ChildButton ' +
            'components in `' + componentName + '`.';
        return new Error(msg);
    }
}

function getChildren(children){
    var buttons = {
        main: null,
        child: []
    };

    Children.forEach(children, function(child){
        if(child.type === MainButton){
            buttons.main = child;
            return;
        }
        buttons.child.push(child);
    });

    return buttons;
}

function getClasses(props){
    return classnames({
        'mfb-zoomin': props.effect === 'zoomin',
        'mfb-slidein': props.effect === 'slidein',
        'mfb-slidein-spring': props.effect === 'slidein-spring',
        'mfb-fountain': props.effect === 'fountain',
        'mfb-component--tl': props.position === 'tl',
        'mfb-component--tr': props.position === 'tr',
        'mfb-component--bl': props.position === 'bl',
        'mfb-component--br': props.position === 'br'
    }, props.className);
}


Menu = React.createClass({

    propTypes: {
        effect: React.PropTypes.oneOf(['zoomin', 'slidein', 'slidein-spring', 'fountain']).isRequired,
        position: React.PropTypes.oneOf(['tl', 'tr', 'bl', 'br']).isRequired,
        children: childrenValidator
    },

    getInitialState: function() {
        return {
            isOpen: false
        };
    },

    toggleMenu: function(evt) {
        evt.preventDefault();

        if(this.props.method === 'hover'){
            return;
        }
        // flip the state from open to close and viceversa
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    render: function() {
        var classes = getClasses(this.props);
        var buttons = getChildren(this.props.children);

        var main = buttons.main && React.cloneElement(buttons.main, {
                onClick: this.toggleMenu
            });

        return (
            <ul className={classes}
                data-mfb-toggle={this.props.method}
                data-mfb-state={this.state.isOpen ? 'open' : 'closed'}>
                <li className="mfb-component__wrap">
                    {main}
                    <ul className="mfb-component__list">
                        {buttons.child}
                    </ul>
                </li>
            </ul>
        );
    }
});
