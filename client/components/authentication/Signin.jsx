let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    FlatButton,
    RaisedButton,
    Styles
    } = MUI;

Signin = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    getThemePallette() {
        return sessionStore.get('pallette') ? sessionStore.get('pallette') : {primary: "#4285f4", accent: "#ff4081"};
    },
    styles: {
        container: {
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative'
        }
    },
    onSignUp(){
        FlowRouter.go("/toduo/signup")
    },
    onSignIn(){
        return Meteor.loginWithGoogle({
            requestPermissions: ['email'],
            requestOfflineToken: true
        }, function(error) {
            if (error) {
                console.log('google login error');
                return console.log(error.reason);
            } else {
                console.log('google login success');
                //FlowLayout.render('layout-auth', { content: "app" });
                console.dir(Meteor.user());
                FlowRouter.go('/toduo/app');
            }
        });
    },
    render: function () {
        let fudge = {
            height: '60px'
        }
        let styles = this.styles;
        let pallette = this.getThemePallette();
        return (
            <div style={styles.container}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="box box-container">
                            <div className="row bottom-xs" style={fudge}>
                                <div className="col-xs-offset-5 col-sm-offset-6 col-xs-3">
                                    <div className="box-first box-container">
                                        <FlatButton label="Sign up" onClick={this.onSignUp}></FlatButton>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="box-first box-container">
                                        <RaisedButton primary={true} label="Sign in" backgroundColor={pallette.accent}
                                                      onClick={this.onSignIn}></RaisedButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
});
