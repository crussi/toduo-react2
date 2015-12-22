const {
    List,
    FloatingActionButton,
    FontIcon

    } = MUI;

const Colors = MUI.Colors;

AuthPageX = React.createClass({
    render(){
        return <div>
            <p>abc</p>
        </div>
    }
});

AuthPage = React.createClass({

    getInitialState() {
        return {

        };
    },
    onTextChange(itemId, newText) {
        //console.log('onTextChange itemId: ' + itemId + ' newText: ' + newText);
        //this.props.onTextChange(itemId, newText);
    },

    render(){

        //let form =  <div>sign in</div>;

        let cardProps = {
            content: <Signin/>,
            icon: "google",
            backgroundColor: "#4285f4",
            mediaTitle: "Sign in",
            mediaSubtitle: "hello there!",
            cardTitle: "",
            cardText: "",
            height: "400px"
        };


        return <div name="list-card" className="list-card col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <ContextCard {...cardProps} ref="card"/>
        </div>

    }
});