const {
    Avatar
    } = MUI;


AuthPage = React.createClass({

    getInitialState() {
        return {

        };
    },
    onTextChange(itemId, newText) {
        //console.log('onTextChange itemId: ' + itemId + ' newText: ' + newText);
        //this.props.onTextChange(itemId, newText);
    },
    getRandomBgColor() {
        return sessionStore.get('pallette') ? sessionStore.get('pallette') : {primary: "#4285f4", accent: "#ff4081"};
    },
    render(){
        //let avatarStyle = {
        //    display:'inline-block',
        //    marginRight: '10px',
        //    height: '40px',
        //    verticalAlign: 'middle',
        //
        //}
        let aligner = {
            display: 'inline-flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.87)'
        };


        let googleLogoStyle = {
            marginLeft: '5px',
            marginRight: '5px',
            marginTop: '6px'
        }
        //let form =  <div>sign in</div>;
        //src="images/google-g-32X32.png"
        let cardtext = <div style={aligner}>
            <div className="auth-avatar"><img src="/images/google-g-32X32.png"></img></div>
            <div>Sign in with your</div>
            <div><img style={googleLogoStyle} src="/images/google-logo-64X21.png"></img></div>
            <div> account</div>
        </div>;
        let pallette = this.getRandomBgColor();
        //console.log(this.getRandomBgColor());
        let cardProps = {
            content: <Signin/>,
            icon: "account-circle",
            //backgroundColor: "#4285f4",
            backgroundColor: pallette.primary,
            mediaTitle: "Sign in",
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