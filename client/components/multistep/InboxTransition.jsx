
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

InboxTransition = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    handleRouting(){
        this.props.handleRouting();
    },
    handleRemove(){
        this.props.handleRemove();
    },
    render(){
        let questionStyle = styles.question;
        let btnStyle = styles.button;
        let info = sessionStore.get('transition-new');
        //let question = 'Your project, "' + title + '", was created ...'
        return <div className="col-xs-12 container">
            <div className="box box-container step">
                <div className="row">
                    <div className="col-xs-8">
                        <div className="box-first box-container">
                            <div style={questionStyle}>{info.TransitionQuestion}</div>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="box-first box-container">
                            <FlatButton style={btnStyle}  label="Edit" onClick={e => this.handleRouting()}/>
                            <FlatButton style={btnStyle}  label="Ok" onClick={e => this.handleRemove()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});

