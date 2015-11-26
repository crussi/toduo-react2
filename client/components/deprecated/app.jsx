const {
    RaisedButton,
    FontIcon,
    Avatar,
    AppBar,
    LeftNav,
    MenuItem,
    IconButton


    } = MUI;

//const Colors = mui.Styles.Colors;
//const ThemeManager = new mui.Styles.ThemeManager();


App = React.createClass({
    mq: window.matchMedia("(min-width: 1024px)"),
    mixins: [ReactMeteorData],
    _showFixedDrawer(){
        return this.mq.matches;
    },
    getInitialState: function () {
        //var mq = window.matchMedia("(min-width: 1024px)");
        return {
            selectedPlayerId: null,
            isfixedDrawer: this._showFixedDrawer(),
            isOpen: this._showFixedDrawer()
        }
    },
    handleResize: function(e) {
        //var mq = window.matchMedia("(min-width: 1024px)");
        if (this.state.isfixedDrawer !== this._showFixedDrawer()) {
            if (this._showFixedDrawer()) {
                this.setState({isfixedDrawer: true});
                //this is necessary due to flaw in leftSideNav
                this.refs.nav.closeSideNav();
                this.refs.nav.toggleSideNav();
                this.setState({isOpen: true});
            } else {
                this.setState({isfixedDrawer: false});
                this.refs.nav.closeSideNav();
                this.setState({isOpen: false});
            }
        }

    },
    onNavChange(isopen) {
        this.setState({isOpen: isopen});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    getMeteorData() {
        return {
            players: Players.find({}, { sort: { score: -1, name: 1 } }).fetch(),
            selectedPlayer: Players.findOne(this.state.selectedPlayerId),
        }
    },
    selectPlayer(playerId) {
        this.setState({
            selectedPlayerId: playerId,
        });
    },
    addPointsToPlayer(playerId) {
        Players.update(playerId, {$inc: {score: 5}});
    },
    render() {
        let bottomBar;
        if (this.state.selectedPlayerId) {
            bottomBar = (
                <div className="details">
                    <div className="name">{this.data.selectedPlayer.name}</div>
                    <RaisedButton
                        onClick={this.addPointsToPlayer.bind(
              this, this.state.selectedPlayerId)}
                        style={{float: "right"}}
                        label="Add 5 points"
                        primary={true}/>
                </div>
            )
        } else {
            bottomBar = <div className="message">Click a player to select</div>;
        }

        //let iconNameLeft =  this.state.leftNavOpen ? 'zmdi zmdi-close' : 'zmdi zmdi-menu';
        //let title = this.state.leftNavOpen ? 'Leaderboard opened' : 'Leaderboard closed';
        //let docked = this.state.leftNavOpen ? true : false;
        //let appBar = (<AppBar
        //    title="Leaderboard"
        //    //iconClassNameLeft={iconNameLeft}
        //    iconClassNameRight="muidocs-icon-navigation-expand-more"
        //    onLeftIconButtonTouchTap={this.leftIconButtonTouchTap}
        //    />)
        let drawerClass = '';
        if (this.state.isfixedDrawer) {
            drawerClass = this.state.isOpen ? 'fixed-drawer': 'toggle-drawer';
        }
        //console.log('drawerClass :' + drawerClass);
        return (
            <div className={drawerClass}>
                <Navigation ref="nav" isfixedDrawer={this.state.isfixedDrawer} callbackOnNavChange={this.onNavChange}/>
                <div id='content'>
                <Leaderboard players={this.data.players}
                             selectedPlayerId={this.state.selectedPlayerId}
                             onPlayerSelected={this.selectPlayer} />
                { bottomBar }
                </div>
            </div>
        );
    }
});
