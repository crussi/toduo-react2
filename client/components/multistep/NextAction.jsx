let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    TextField,FlatButton,
    Styles
    } = MUI;

var update = React.addons.update;

NextAction = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            //someVar: Session.get('someVar')
        }
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext(){
        return {
            muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
        }
    },
    getInitialState: function () {
        return {
            canSumbit: false,
            textWidth: '256px',
            task: this.props.task
        };
    },
    errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number"

    },
    styles: {
        container: {
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative'
        },
        question: {
            fontSize: '1rem',
            fontWeight: 'bold',
            //paddingTop: '20px',
            //paddingBottom: '20px',
            marginRight: '10px',
            marginTop: '10px'
        },
        submit: {
            marginTop: 32
        },
        text: {
            width: '300px',
            color: '#777'
        },
        hint: {
            color: '#bbb'
        },
        underline: {
            color: '#bbb'
        }
    },
    enableButton: function () {
        this.setState({
            canSubmit: true
        });
    },
    disableButton: function () {
        this.setState({
            canSubmit: false
        });
    },
    onChange: function(e){
        let task = update(this.state.task, {
            NextAction: {$set: e.target.value}
        });
        //this.props.task = task;
        this.setState({task: task, canSubmit: task.validate()});
    },
    submitForm: function () {
        //data.NextAction = "My next very long action to do right away and to succeed";
        //data.NextAction = "My next action to do ";
        //data.NextAction ="My next action to do hello brave new world to go up to succeed"
        //data.NextAction ="My next action to do hello brave new world to go up to succeed all day long"
        //data.NextAction ="123456789012345678901234567890123456789012345678901234567890123456789012345"
        //data.NextAction ="12345678901234567890123456789012345678901234567890123"
        //data.NextAction = "Take Butterfly to Quest lab for blood draw";

        //sessionStore.set("task-in-process",this.state.task);
        this.props.updateTask(this.state.task);
        this.props.handleNextStep("NextAction.Submit");

    },
    //notifyFormError: function (data) {
    //    console.error('Form error:', data);
    //},
    handleResize: function(e) {
        this.adjustTextWidth();
    },
    adjustTextWidth: function() {
        let width = this.refs.box.offsetWidth;
        this.setState({
            textWidth: (width - 40) + 'px'
        });
    },
    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
        this.adjustTextWidth();
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function () {
        //console.log('NextAction render');

        //Here is how to apply styles to text fields:
        //style={{color:'blue'}} hintStyle={{color:'red'}} underlineStyle={{borderColor:'green'}} underlineFocusStyle={{borderColor:'purple'}}
        //floatingLabelStyle={{color:'yellow'}}
        let styles = this.styles;
        let questionStyle = styles.question;
        let textStyle = { color:'orange', width: this.state.textWidth};
        let hintStyle = this.styles.hint;
        let underlineStyle = this.styles.underline;

        let childProps = {
            task: this.props.task,
            callback: this.handleClick,
            hasPrev: true
        };

        return (
            <div style={styles.container}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="box box-container step">
                                <div className="row">
                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" ref="box">
                                        <div className="box-first box-container box-med">
                                            <div style={questionStyle}>What is the next action to take?</div>
                                            <TextField style={textStyle}
                                                        name='NextAction'
                                                        onChange={this.onChange}
                                                        maxLength={100}
                                                        hintText="Identify next action ..."
                                                        floatingLabelText="Next action" />
                                        </div>
                                    </div>
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 align-center">
                                        <div className="box-first box-container">
                                            <FlatButton
                                                style={styles.submit}
                                                type="submit"
                                                label="Submit"
                                                onClick={this.submitForm}
                                                disabled={!this.state.canSubmit} />
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
