const { FlatButton } = MUI;

const styles = {
    question: {
        fontSize: '1rem',
        fontWeight: 'bold',
        //paddingTop: '20px',
        paddingBottom: '20px',
        marginRight: '10px',
        marginTop: '10px'
    },
    button: {
        margin: '5px'
    }
};

MultiStepYesNo = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    handleNextStep(val){
        this.props.handleNextStep(val);
    },
    render(){
        let questionStyle = styles.question;
        let btnStyle = styles.button;
        let question = this.props.question;
        let questionClass = question.length <= 30 ? "col-xs-4" : "col-xs-5"
        return <div className="col-xs-12 container">
                <div className="box box-container step">
                    <div className="row">
                        <div className={questionClass}>
                            <div className="box-first box-container">
                                <div style={questionStyle}>{this.props.question}</div>
                            </div>
                        </div>
                        <div className="col-xs-4">
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
