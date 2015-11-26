let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

IsSchedulable = React.createClass({

    handleNextStep(val){
        this.props.handleNextStep('IsSchedulable.' + val);
    },
    render(){
        let childProps = {
            question: "Does this need to be done on a specific date and time?",
            handleNextStep: this.handleNextStep
        };
        return <div>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={250}>
                <NextActionYesNo {...childProps}/>
            </ReactCSSTransitionGroup>
        </div>

    }
});
