const {CSSTransitionGroup} = React.addons;

SliderTransition = React.createClass({
    propTypes: {
        depth: React.PropTypes.number.isRequired,
        name: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            name: 'slider',
        };
    },
    getInitialState() {
        return {
            direction: 'right'
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        let depthChanged = nextProps.depth !== this.props.depth;
        let directionChanged = nextState.direction !== this.state.direction;
        //console.log('this.props.selectedId: ' + this.props.selectedId + ' nextProps.selectedId: ' + nextProps.selectedId);
        let selectedIdChanged = nextProps.selectedId !== this.props.selectedId;
        //console.log(' slider depthChanged: ' + depthChanged + ' directionChanged: ' + directionChanged + ' selectedIdChanged: ' + selectedIdChanged);
        return depthChanged || directionChanged || selectedIdChanged;
    },
    componentWillReceiveProps(newProps) {
        const direction = newProps.depth >= this.props.depth ? 'right' : 'left';
        this.setState({direction});
    },
    render() {
        const {name, depth} = this.props;
        const outerProps = {
            className: `${name}-outer-wrapper ${this.props.className}`,
        };
        const transProps = {
            component: 'div',
            transitionName: `${name}-${this.state.direction}`,
            className: `${name}-transition-group`,
            transitionEnterTimeout: 250,
            transitionLeaveTimeout: 250
        };
        const innerProps = {
            ref: 'inner',
            key: depth,
            className: `${name}-inner-wrapper`,
        };

        return <div {...this.props} {...outerProps}>
            <CSSTransitionGroup {...transProps}>
                <div {...innerProps}>
                    {this.props.children}
                </div>
            </CSSTransitionGroup>
        </div>;
    }
});
