let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const {
    TextField,DatePicker,FlatButton,
    Styles
    } = MUI;

var update = React.addons.update;

ProjectForm = React.createClass({
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
            tasks: new Array(5),
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
        let updateTask = function(index,value) {
            let tasks = this.state.tasks.slice();
            tasks.splice(index, 1, {"Task":value, "IsComplete":false});
            this.setState({tasks: tasks});
            project = update(this.state.project, {
                Tasks: {$set: tasks}
            });
            return project;
        }
        let project;
        //DatePicker doesn't return an event
        let targetName = e ? e.target.name : 'DateDue'
        switch (targetName ){
            case 'Title':
                project = update(this.state.project, {
                    Title: {$set: e.target.value}
                });
                break;
            case 'Outcome':
                project = update(this.state.project, {
                    Outcome: {$set: e.target.value}
                });
                break;
            case 'DateDue':
                project = update(this.state.project, {
                    DateDue: {$set: date}
                });
                break;
            case 'Task1':
            case 'Task2':
            case 'Task3':
            case 'Task4':
            case 'Task5':
                let index = targetName.slice(-1) - 1;
                project = updateTask.call(this,index,e.target.value);
                break;
        }
        this.setState({project: project, canSubmit: project.validate()});
    },
    submitForm: function () {
        Meteor.call("/projects/addNew", this.state.project, (err, res) => {
            if (err) {
                console.log("Failed to add new project.");
                return;
            } else {
                //console.dir(res);
                //console.log("project add success id: " + res._id);

                //projectId = res;
                sessionStore.set("transition-new",res);
                this.props.handleSubmit();
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
        //console.dir(this.state.project);
        //Here is how to apply styles to text fields:
        //style={{color:'blue'}} hintStyle={{color:'red'}} underlineStyle={{borderColor:'green'}} underlineFocusStyle={{borderColor:'purple'}}
        //floatingLabelStyle={{color:'yellow'}}
        let styles = this.styles;
        let textStyle = { color:'orange', width: this.state.textWidth};
        let hintStyle = this.styles.hint;
        let underlineStyle = this.styles.underline;
        let dateStyle = this.styles.date;
        //console.dir(underlineStyle);
        //TODO: this needs to be put in a utility!
        var timestamp = (new Date()).getTime();
        let today = new Date(timestamp);
        let minDate = new Date();
        let maxDate = new Date();
        //set datepicker date range to be only 11 years
        //1 past 10 future
        minDate.setDate(today.getDate());
        minDate.setFullYear(minDate.getFullYear() - 1);
        maxDate.setDate(today.getDate());
        maxDate.setFullYear(minDate.getFullYear() + 11);
        let childProps = {
            callback: this.handleClick,
            hasPrev: true
        };
        return (
            <div style={styles.container}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="box box-container">
                                <div className="row">
                                    <div className="col-xs-10 col-sm-5 col-md-5 col-lg-5">
                                        <div className="box-first box-container box-big">

                                            <TextField style={textStyle}
                                                        name='Title'
                                                        onChange={this.onChange}
                                                        maxLength={25}
                                                        hintText="What is project's title?"
                                                        floatingLabelText="Title" />
                                            <TextField style={textStyle}
                                                        name='Outcome'
                                                        onChange={this.onChange}
                                                        maxLength={100}
                                                        hintText="What is the expected outcome?"
                                                        floatingLabelText="Expected outcome" />

                                            <DatePicker name='DateDue' style={dateStyle}
                                                        onChange={this.onChange}
                                                        hintText="Date due"
                                                        minDate={minDate} maxDate={maxDate} />

                                        </div>
                                    </div>
                                    <div className="col-xs-10 col-sm-5 col-md-5 col-lg-5" ref="tasks">
                                        <div className="collapse-card__sectiontitle ">Identify the first few steps ...</div>
                                        <div className="box-first box-container box-big">
                                            <ul>
                                                <li><i className="zmdi zmdi-n-1-square"></i>
                                                    <TextField style={textStyle} hintStyle={hintStyle}
                                                               underlineStyle={underlineStyle}
                                                               name="Task1"
                                                               onChange={this.onChange}/>
                                                </li>
                                                <li><i className="zmdi zmdi-n-2-square"></i>
                                                    <TextField style={textStyle} hintStyle={hintStyle}
                                                               underlineStyle={underlineStyle}
                                                               name="Task2"
                                                               onChange={this.onChange}/>
                                                </li>
                                                <li><i className="zmdi zmdi-n-3-square"></i>
                                                    <TextField style={textStyle} hintStyle={hintStyle}
                                                               underlineStyle={underlineStyle}
                                                               name="Task3"
                                                               onChange={this.onChange}/>
                                                </li>
                                                <li><i className="zmdi zmdi-n-4-square"></i>
                                                    <TextField style={textStyle} hintStyle={hintStyle}
                                                               underlineStyle={underlineStyle}
                                                               name="Task4"
                                                               onChange={this.onChange}/>
                                                </li>
                                                <li><i className="zmdi zmdi-n-5-square"></i>
                                                    <TextField style={textStyle} hintStyle={hintStyle}
                                                               underlineStyle={underlineStyle}
                                                               name="Task5"
                                                               onChange={this.onChange}/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 align-bottom">
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
