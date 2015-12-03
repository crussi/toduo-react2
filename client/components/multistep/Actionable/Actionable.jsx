let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Actionable = React.createClass({

    handleNextStep(val){
        this.props.handleNextStep('Actionable.' + val);
    },
    render(){
        console.log('Actionable render');
        let childProps = {
            question: "Is this actionable?",
            handleNextStep: this.handleNextStep
        };
        //let iconClass = "zmdi zmdi-" + this.props.icon;
        return <div>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                <MultiStepYesNo {...childProps}/>
            </ReactCSSTransitionGroup>
        </div>

    }
});
