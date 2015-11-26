const {
    FlatButton
    } = MUI;

const styles = {
    step: {
        marginLeft: '55px'
    },
    question: {
        fontSize: '1rem',
        fontWeight: 'bold',
        paddingTop: '20px',
        paddingBottom: '20px',
        marginRight: '10px'
    },
    button: {
        margin: '5px'
    }
};

//const Colors = mui.Styles.Colors;
//const ThemeManager = new mui.Styles.ThemeManager();

ApproveChange = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    handleClick(val){
        this.props.callback('ApproveChange.' + val);
    },
    render(){
        let stepStyle = styles.step;
        let questionStyle = styles.question;
        let buttonStyle = styles.button;

        return <div style={stepStyle}>

            <span style={questionStyle}>{this.props.parameters}</span>

            <FlatButton style={buttonStyle}  label="Undo" onClick={e => this.handleClick("Undo")}/>
            <FlatButton style={buttonStyle}  label="Ok" onClick={e => this.handleClick("Ok")}/>`
        </div>
    }
});
