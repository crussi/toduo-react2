const {
    RaisedButton,
    FontIcon,
    Avatar,
    AppBar,
    LeftNav,
    MenuItem,
    IconButton


    } = MUI;

Navigation = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            //leftNavOpen: false
        };
    },
    leftIconButtonTouchTap(){
        //console.log('leftIconButtonTouchTap open: ' + !this.refs.leftNav.state.open);
        this.props.callbackOnNavChange(!this.refs.leftNav.state.open);
        this.refs.leftNav.toggle();
    },
    toggleSideNav() {
        //console.log('toggleSideNav');
        this.refs.leftNav.toggle();
    },
    closeSideNav: function () {
        //console.log('closeSideNav');
        this.refs.leftNav.close();
    },
    //onNavOpen(){
    //    console.log('onNavOpen open: ');
    //    this.props.callbackOnNavChange(true);
    //},
    //onNavClose(){
    //    console.log('onNavClose open: ');
    //    this.props.callbackOnNavChange(false);
    //},
    onChange() {
        //console.log('Navigation onChange');
    },
    navStateIsOpen(){
        return this.refs.leftNav.state.open;
    },
    getMeteorData() {
        return {
            menuItems : [
                { route: 'get-started', text: 'Get Started' },
                { route: 'customization', text: 'Customization' },
                { route: 'components', text: 'Components' },
                { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
                {
                    type: MenuItem.Types.LINK,
                    payload: 'https://github.com/callemall/material-ui',
                    text: 'GitHub'
                },
                {
                    text: 'Disabled',
                    disabled: true
                },
                {
                    type: MenuItem.Types.LINK,
                    payload: 'https://www.google.com',
                    text: 'Disabled Link',
                    disabled: true
                }
            ]
        }
    },
    render() {
        //console.log('Navigation docked: ' + this.props.docked);
        let leftNav;
        if (this.props.isfixedDrawer) {
            leftNav = (<LeftNav className="my-side-nav" ref="leftNav" docked={true}  menuItems={this.data.menuItems}
                        onNavOpen={this.onNavOpen} onNavClose={this.onNavClose}/>)
        } else {
            leftNav = (<LeftNav ref="leftNav" docked={false}  menuItems={this.data.menuItems}
                                header={<AppBar title="Toduo" showMenuIconButton={false} />} />)
        }
        return (
            <div>
                <AppBar className="my-header-nav"
                        title="Toduo"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.leftIconButtonTouchTap}
                    />
                {leftNav}
            </div>);
    }
});