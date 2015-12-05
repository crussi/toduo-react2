let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

IsDoableNow = React.createClass({

    handleNextStep(val){
        this.props.handleNextStep('IsDoableNow.' + val);
    },
    render(){
        let childProps = {
            task: this.props.task,
            question: "Can this be done in 5 minutes or less?",
            handleNextStep: this.handleNextStep
        };
        //let iconClass = "zmdi zmdi-" + this.props.icon;
        return <div>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                <NextActionYesNo {...childProps}/>
            </ReactCSSTransitionGroup>
        </div>

    }
});
