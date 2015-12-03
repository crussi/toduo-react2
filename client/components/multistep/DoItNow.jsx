const { FlatButton, Styles } = MUI;

const styles = {
    heading: {
        fontSize: '1rem',
        //fontWeight: 'bold',
        //paddingTop: '20px',
        //paddingBottom: '20px',
        marginRight: '10px',
        marginTop: '10px',
        display: 'inline-block'
    },
    question: {
        fontSize: '1rem',
        fontWeight: 'bold',
        //paddingTop: '20px',
        paddingBottom: '20px',
        marginRight: '10px',
        marginTop: '10px'

    },
    cmd: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginRight: '10px',
        display: 'inline-block'
    },
    button: {
        margin: '5px'
    }
};

DoItNow = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    handleNextStep(val){
        this.props.handleNextStep("DoItNow." + val);
    },
    render(){
        //console.log('MultiStepYesNo render');
        let headingStyle = styles.heading;
        let questionStyle = styles.question;
        let cmdStyle = styles.cmd;
        let btnStyle = styles.button;
        let question = this.props.question;
        let task = sessionStore.get("task-in-process");
        let nextaction = task.NextAction;
        let len = nextaction.length;
        let nextActionClass = "col-xs-5";
        if ((nextaction.length > 32) && (nextaction.length <= 39)) {
            nextActionClass = "col-xs-6";
        } else if ((nextaction.length > 39) && (nextaction.length <= 50)) {
            nextActionClass = "col-xs-7";
        } else if (nextaction.length > 50) {
            nextaction = String.truncate(nextaction, 47);
            nextActionClass = "col-xs-7";
        }
        //let nextActionClass = (nextaction.length <= 50 ? "col-xs-5" : "col-xs-6");
        return <div className="col-xs-12 container">
            <div className="box box-container step">
                <div className="row">
                    <div className={nextActionClass}>
                        <div className="box-first box-container box-sml">
                            <div style={cmdStyle}>Do it now:</div><div style={headingStyle}>{nextaction}</div>

                            <div style={questionStyle}>Were you able to complete it?</div>
                        </div>
                    </div>
                    <div className="col-xs-4 align-center">
                        <div className="box-first box-container">
                            <FlatButton style={btnStyle}  label="Yes" onClick={e => this.handleNextStep("Yes")}/>
                            <FlatButton style={btnStyle}  label="No" onClick={e => this.handleNextStep("No")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});
