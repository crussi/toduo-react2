
AuthPage = React.createClass({

    getInitialState() {
        return {
            type: this.props.type
        };
    },
    getRandomBgColor() {
        return sessionStore.get('pallette') ? sessionStore.get('pallette') : {primary: "#4285f4", accent: "#ff4081"};
    },
    styles:{
        aligner : {
            display: 'inline-flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.87)'
        },
        googleLogoStyle : {
            marginLeft: '5px',
            marginRight: '5px',
            marginTop: '6px'
        }

    },
    render(){
        let instructions = this.props.type == 'signin' ? "Sign in with your" : "Sign up with your"
        let cardtext = <div style={this.styles.aligner}>
            <div className="auth-avatar"><img src="/images/google-g-32X32.png"></img></div>
            <div>{instructions}</div>
            <div><img style={this.styles.googleLogoStyle} src="/images/google-logo-64X21.png"></img></div>
            <div> account</div>
        </div>;
        let pallette = this.getRandomBgColor();
        let cardProps = {
            content: this.props.type == 'signin' ? <Signin/> : <Signup/>,
            icon: "account-circle",
            backgroundColor: pallette.primary,
            mediaTitle: this.props.type == 'signin' ? "Sign in" : "Sign up",
            mediaSubtitle: "",
            cardTitle: "",
            cardText: cardtext,
            height: "430px",
            imgHeight: "250px",
            iconClass: "auth-icon"
        };

        return <div id="unauth" className="row center-xs middle-xs full-height">
            <div name="list-card" className="list-card col-xs-4">
                <ContextCard {...cardProps} ref="card"/>
            </div>
        </div>
    }
});