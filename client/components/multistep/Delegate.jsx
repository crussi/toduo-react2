let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    DropDownMenu,FlatButton,
    Styles
    } = MUI;

var update = React.addons.update;

Delegate = React.createClass({
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
            task: this.props.task
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("delegates")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            delegates: Delegates.find({}, { sort: { Name: 1 } }).map(function (delegate) {
                return {text: delegate.Name, payload: delegate._id};
            }),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number"

    },
    styles: {
        dropdown: {
            width: '400px'
        },
        container: {
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            overflow: 'visible'
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
    onChange: function(event, selectedIndex, menuItem){
        //console.dir(menuItem);
        //this.setState({path: this.state.path.concat(index)});
        let task = update(this.state.task, {
            DelegateId: {$set: menuItem.payload},
            //DelegateName:{$set: menuItem.text},
            Type: {$set: "Waiting for"}
        });
        task.loadDelegate();
        //console.dir(task);
        this.setState({task: task, canSubmit: task.validate()});
    },
    submitForm: function () {
        let data = {};
        data.route = "/waitingfor";
        data.task = this.state.task;
        //console.dir(data.task);
        Meteor.call("/tasks/addNew", data, (err, res) => {
            if (err) {
                console.log("Failed to add new task.");
                return;
            } else {
                //console.dir(res);
                console.log("task add success id: " + res._id);

                //projectId = res;
                sessionStore.set("transition-new",res);
                this.props.updateTask(this.state.task);
                this.props.handleNextStep("Delegate.Submit");
            }
        });


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
        //console.dir(this.data.delegates);
        let styles = this.styles;
        let questionStyle = styles.question;
        let textStyle = { color:'orange', width: this.state.textWidth};
        let hintStyle = this.styles.hint;
        let underlineStyle = this.styles.underline;

        //let menuItems = [
        //    { payload: 'mUW6o-bq-ECBKMDGrVFMyA', text: 'Adam' },
        //    { payload: '8kBVnhFm2UmZXWJtdBTTEw', text: 'Butterfly' },
        //    { payload: 'oOSzwzkW0UKU0Iwdy6oKtw', text: 'Chris' },
        //    { payload: 'h5ae_69FnU__A9EKJzP0uA', text: 'Michele' },
        //    { payload: 'x5MFzk650E_enbUQ0itRdw', text: 'Vendor' },
        //];
        //this.data.delegates.

        let childProps = {
            task: this.props.task,
            callback: this.handleClick,
            hasPrev: true
        };

        return (
            <div style={styles.container}>
                <div className="row overflow">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 overflow">
                        <div className="box box-container step overflow">
                            <div className="row overflow">
                                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 overflow" ref="box">
                                    <div className="box-first box-container box-med overflow">
                                        <div style={questionStyle}>What is the next action to take?</div>
                                        <DropDownMenu style={styles.dropdown} menuItems={this.data.delegates} onChange={this.onChange} />
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
