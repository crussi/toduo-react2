const {
    FlatButton,
    RaisedButton
    } = MUI;

const update = React.addons.update;

//const styles = {
//    root: {
//        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
//        fontWeight: 300,
//        //this caused unexpected height issues
//        height: '100%',
//        width: '100%'
//    }
//    header: {
//        zIndex: '1',
//        //backgroundColor: '#03a9f4',
//        backgroundColor: '#4285f4',
//        //boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
//        boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.28)',
//        color: 'white',
//        padding: '10px',
//        fontSize: '1.5em',
//        top: '0',
//        position: 'fixed',
//        width: '100%'
//    }
//    //content: {
//    //    marginTop: '54px',
//    //    padding: '8px',
//    //    //backgroundColor: '#f2f2f2',
//    //    //height: '100%',
//    //    height: 'calc(100vh-54px)',
//    //    width: '100%'
//    //
//    //    //marginRight: '20px'
//    //}
//};

TitlePanel = React.createClass({
    getInitialState() {
        return {
            display : this.props.display
        };
    },
    componentWillReceiveProps: function(nextProps) {
        //this resets state when docking changes
        this.setState({
            display: nextProps.display
        });
    },
    onSignIn(){
        FlowRouter.go("/toduo/signin");
    },
    onSignUp(){
        FlowRouter.go("/toduo/signup");
    },
    getThemePallette() {
        return sessionStore.get('pallette') ? sessionStore.get('pallette') : {primary: "#4285f4", accent: "#ff4081"};
    },
    showMenu(){
        console.log('show menu');
    },
    menuButtonClick(e) {
        this.props.menuButtonClick(e);
    },
    render() {
        //console.log('render titlepanel');
        //console.dir(this.props);
        let styles = {
            root: {
                fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontWeight: 300,
                //this caused unexpected height issues
                height: '100%',
                width: '100%'
            },
            headerMenu: {
                zIndex: '1',
                backgroundColor: this.props.headerBgColor,
                boxShadow: this.props.boxShadow,
                color: this.props.fontColor,
                padding: '10px',
                fontSize: '1.5em',
                top: '0',
                position: 'fixed',
                width: '100%',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'

            },
            headerContentDocked: {
                zIndex: '1',
                backgroundColor: this.props.headerBgColor,
                boxShadow: this.props.boxShadow,
                color: this.props.fontColor,
                padding: '6px',
                fontSize: '1.5em',
                top: '0',
                position: 'fixed',
                width: '-webkit-calc(100vw - 300px)',
                width: '-moz-calc(100vw - 300px)',
                width: 'calc(100vw - 300px)',

                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'

            },
            headerContentUndocked: {
                zIndex: '1',
                backgroundColor: this.props.headerBgColor,
                boxShadow: this.props.boxShadow,
                color: this.props.fontColor,
                padding: '6px',
                fontSize: '1.5em',
                top: '0',
                position: 'fixed',
                width: '100%',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'

            },
            container: {
                marginTop: '54px',
                width: '100%',

                padding: '8px',
                height: '100%',
                height: '100vh',
                height: '-webkit-calc(100vh - 54px)',
                height: '-moz-calc(100vh - 54px)',
                height: 'calc(100vh - 54px)',
                backgroundColor: this.props.containerBgColor
            },
            title: {
                marginLeft: '20px',
                marginTop: '3px',
                marginBottom: '4px'
            },
            btns: {
                marginLeft: 'auto',
                marginRight: '30px'
            }
            //icon: {
            //    fontSize: '44px',
            //    color: 'rgba(250,250,250,0.75)'
            //}
        };
        let rootStyle = this.props.style ? update(styles.root, {$merge: this.props.style}) : styles.root;
        //TODO: trying to convert to using 100vh
        //styles.content.height = this.props.viewportHeight;


        let pallette = this.getThemePallette();

        let btncomp = (<div></div>);

        let display = this.state.display;

        let headerStyle = styles.headerMenu;
        if (display.IsContent) {
            headerStyle = display.Docked ? styles.headerContentDocked : styles.headerContentUndocked;
        }
        let hamburgerProps = {
            menuButtonClick: this.menuButtonClick
        }
        //{display.AcctMenu ? <div onClick={this.showMenu} syle={styles.authmenu}><i className="zmdi zmdi-account-circle" style={styles.icon} /></div> : null}
        return (
            <div name="titlepanel-root" style={rootStyle}>
                <div name="titlepanel-header" style={headerStyle}>
                    {display.Hamburger ? <Hamburger {...hamburgerProps}/> : null}
                    {display.Title ? <div style={styles.title}>{this.props.title}</div> : null}
                    {display.Input ? <TitlePanelInput Docked={display.Docked}/> : null}
                    <div style={styles.btns}>
                        {display.AuthBtns ? <div><FlatButton label="Sign in" onClick={this.onSignIn}></FlatButton>&nbsp;&nbsp;
                        <RaisedButton primary={true} label="Sign up" backgroundColor={pallette.accent} onClick={this.onSignUp}></RaisedButton></div> : null}
                        {display.AcctMenu ? <TitleAuthMenu/> : null}
                    </div>
                </div>
                <div name="titlepanel-container" style={styles.container}>
                    {this.props.children}
                </div>

            </div>
        );
    }

});