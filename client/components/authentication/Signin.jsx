let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    RaisedButton,
    FontIcon,
    Styles
    } = MUI;

var update = React.addons.update;

Signin = React.createClass({
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
            canSubmit: false,
            textWidth: '256px',

            project: new Project()
        };
    },
    styles: {
        container: {
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative'
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
        },
        date: {
            marginTop: '24px'
        }
    },
    onChange: function(e,date) {
        //This func helps to keep new tasks updated
        //let updateTask = function(index,value) {
        //    let tasks = this.state.tasks.slice();
        //    tasks.splice(index, 1, {"Task":value, "IsComplete":false});
        //    this.setState({tasks: tasks});
        //    project = update(this.state.project, {
        //        Tasks: {$set: tasks}
        //    });
        //    return project;
        //}
        //let project;
        ////DatePicker doesn't return an event
        //let targetName = e ? e.target.name : 'DateDue'
        //switch (targetName ){
        //    case 'Title':
        //        project = update(this.state.project, {
        //            Title: {$set: e.target.value}
        //        });
        //        break;
        //    case 'Outcome':
        //        project = update(this.state.project, {
        //            Outcome: {$set: e.target.value}
        //        });
        //        break;
        //    case 'DateDue':
        //        project = update(this.state.project, {
        //            DateDue: {$set: date}
        //        });
        //        break;
        //    case 'Task1':
        //    case 'Task2':
        //    case 'Task3':
        //    case 'Task4':
        //    case 'Task5':
        //        let index = targetName.slice(-1) - 1;
        //        project = updateTask.call(this,index,e.target.value);
        //        break;
        //}
        //this.setState({project: project, canSubmit: project.validate()});
    },
    submitForm: function () {
        //Meteor.call("/auth/signinWithGoogle", this.state.project, (err, res) => {
        //    if (err) {
        //        console.log("Failed to add new project.");
        //        return;
        //    } else {
        //        //console.dir(res);
        //        console.log("sign in with google success: ");
        //
        //        //projectId = res;
        //        //sessionStore.set("transition-new",res);
        //        //this.props.handleSubmit();
        //    }
        //});

        e.preventDefault();

        return Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function(error) {
            if (error) {
                console.log('google login error');
                return console.log(error.reason);
            } else {
                console.log('google login success');
                //FlowLayout.render('layout-auth', { content: "app" });
                FlowRouter.go('/');
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
        let width = this.refs.tasks.offsetWidth;
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
        let styles = this.styles;
        return (
            <div style={styles.container}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="box box-container">
                            <div className="row">

                                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 align-bottom">
                                    <div className="box-first box-container">
                                        <RaisedButton secondary={true}
                                                      label="Sign in with Google"
                                                      labelPosition="after"
                                                      onClick={this.submitForm}>
                                            <FontIcon className="zmdi zmdi-google" />
                                        </RaisedButton>
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
