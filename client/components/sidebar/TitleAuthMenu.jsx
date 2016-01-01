const {
    IconMenu,
    IconButton,
    MenuItem,
    FontIcon,
    Popover,
    RaisedButton,
    List,
    ListItem,
    SelectableList
    } = MUI;

TitleAuthMenu = React.createClass({
    getInitialState(){
        return {
            anchorOrigin : {"horizontal": "left", "vertical": "bottom"},
            targetOrigin : {"horizontal": "left", "vertical": "top"},
            selectedIndex: 0
        }
    },
    //componentWillUpdate: function(nextProps, nextState){
    //    // perform any preparations for an upcoming update
    //    if (nextState.activePopover == 'pop') {
    //        console.log('state has activePopover = pop');
    //        console.log(ReactDOM.findDOMNode(this.refs.menuAuthArrow));
    //    } else {
    //        console.log('state has activePopover = pop');
    //
    //    }
    //},
    onChange(e){
        console.log("on change");
    },
    styles: {
        iconx: {
            fontSize: '44px',
            position: 'absolute',
            top: '4px',
            right: '4px',
            color: 'rgba(250,250,250,0.75)',
            cursor: 'pointer'
        },
        icon: {
            fontSize: '44px',
            color: 'rgba(250,250,250,0.75)',
            cursor: 'pointer'
        }
    },
    show(key, e) {
        this.setState({
            activePopover:key,
            anchorEl:e.currentTarget,
        });
        //this.refs.menuAuthArrow.visibility = 'visible';

    },

    closePopover(key) {
        if (this.state.activePopover !== key)
            return
        this.setState({
            activePopover:'none',
        });
    },

    setAnchor(positionElement, position, e) {
        let {anchorOrigin} = this.state;
        anchorOrigin[positionElement] = position;

        this.setState({
            anchorOrigin:anchorOrigin,
        });
    },

    setTarget(positionElement, position, e) {
        let {targetOrigin} = this.state;
        targetOrigin[positionElement] = position;

        this.setState({
            targetOrigin:targetOrigin,
        });
    },
    handleUpdateSelectedIndex(e){
        console.log('handleUpdateSelectedIndex');
        condole.dir(e);
    },
    authMenuClick(val){
        //console.log('on click ' + val);
        //console.dir(e);
        this.closePopover('pop');
        this.props.authMenuClick(val);
    },
    render(){
        //<IconButton touch={true} iconStyle={iconStyle}>
        //    <i className="zmdi zmdi-account-circle" />
        //</IconButton>}>

        //onClick={this.show.bind(this, "pop")}

        //<IconMenu onChange={this.onChange} anchorOrigin={anchorOrigin} targetOrigin={targetOrigin} iconButtonElement={
        //        <IconButton iconStyle={iconStyle}>
        //          <FontIcon className="zmdi zmdi-account-circle"/>
        //        </IconButton>
        //        }>
        //    <MenuItem index={0} value="signout" primaryText="Sign out" />
        //</IconMenu>

        let iconStyle = this.styles.icon;
        //let anchorOrigin = {"horizontal":"left","vertical":"bottom"};
        //let targetOrigin = {"horizontal":"left","vertical":"top"};
        //<SelectableList valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}>
        //    <ListItem value={1} primaryText="Sign out" />
        //</SelectableList>
        let arrowStyle = this.state.activePopover === 'pop' ? {visibility:'visible',opacity:1} : {visibility:'hidden',opacity:0};

        return (<div>
        <div onClick={this.show.bind(this, "pop")} style={iconStyle}>
            <i className="zmdi zmdi-account-circle" />

        </div>


                <div ref="menuAuthArrow" className="menu-auth-arrow-up" style={arrowStyle}></div>
                <Popover open={this.state.activePopover === 'pop'}
                         animated={true}
                         className="auth-popover"
                         anchorEl={this.state.anchorEl}
                         anchorOrigin={this.state.anchorOrigin}
                         targetOrigin={this.state.targetOrigin}
                         onRequestClose={this.closePopover.bind(this, 'pop')} >


                    <div style={{padding:5}}>
                        <List>
                            <ListItem value={1} onClick={this.authMenuClick.bind(this,'signout')} primaryText="Sign out" />
                        </List>
                    </div>

                </Popover>

            </div>
        )
    }
});
