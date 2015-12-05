let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

IsDelegatable = React.createClass({

    handleNextStep(val){
        this.props.handleNextStep('IsDelegatable.' + val);
    },
    render(){
        let childProps = {
            task: this.props.task,
            question: "Can this be delegated?",
            handleNextStep: this.handleNextStep
        };
        return <div>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                <NextActionYesNo {...childProps}/>
            </ReactCSSTransitionGroup>
        </div>

    }
});
