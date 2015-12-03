const {
    FlatButton, Styles
    } = MUI;

const styles = {
    step: {
        marginLeft: '55px',
        minHeight: '300px'
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

ProjectPlan = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    handleSubmit(){
        this.props.handleNextStep('ProjectPlan.Submit');
    },
    render(){
        //console.log('ProjectPlan render');

        let stepStyle = styles.step;
        let questionStyle = styles.question;
        let buttonStyle = styles.button;

        let childProps = {

            handleSubmit: this.handleSubmit,
            hasPrev: true
        };

        return <div style={stepStyle}>

            <ProjectForm {...childProps}/>

        </div>
    }
});
