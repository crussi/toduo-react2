let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    FlatButton,
    RaisedButton,
    Styles
    } = MUI;

Signup = React.createClass({
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
        //TODO: need to generate account #
        return Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function(error) {
            if (error) {
                console.log('google login error');
                return console.log(error.reason);
            } else {
                console.log('google login success');
                //FlowLayout.render('layout-auth', { content: "app" });
                FlowRouter.go('/toduo/app');
            }
        });
    },
    onSignIn(){
        FlowRouter.go("/toduo/signin")
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
                                        <FlatButton label="Sign in" onClick={this.onSignIn}></FlatButton>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="box-first box-container">
                                        <RaisedButton primary={true} label="Sign up" backgroundColor={pallette.accent}
                                                      onClick={this.onSignUp}></RaisedButton>
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
