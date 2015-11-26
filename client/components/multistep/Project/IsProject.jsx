let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

IsProject = React.createClass({

    handleNextStep(val){

        this.props.handleNextStep('IsProject.' + val );
    },
    render(){
        //console.log('IsProject render');

        let childProps = {
            question: "Is this a project?",
            handleNextStep: this.handleNextStep
        };
        //console.dir(childProps);
        let iconClass = "zmdi zmdi-" + this.props.icon;
        return <div>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={250} transitionEnterTimeout={250}>
                <MultiStepYesNo {...childProps}/>
            </ReactCSSTransitionGroup>
        </div>
    }
});
