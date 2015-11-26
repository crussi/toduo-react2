

MultiStep = React.createClass({
    getInitialState() {
        return {
            nextkey: ["MultiStep.Expand"]
        }
    },
    handleNextStep(val){
        this.setState({nextkey: this.state.nextkey.concat(val)});
    },
    handlePrev(){
        this.setState({nextkey: this.state.nextkey.slice(0, -1)});
    },
    handleRouting(){
        this.props.handleRouting();
    },
    handleRemove(){
        this.props.handleRemove();
    },
    render(){
        const {nextkey} = this.state;
        let key = nextkey[nextkey.length-1];
        let nextstep = this.props.nextstep[key].nextstep;
        let compProps = {
            title: this.props.title,
            handleNextStep: this.handleNextStep,
            handleRouting: this.handleRouting,
            handleRemove: this.handleRemove,
            icon: nextstep.icon,
            avgpctdone: this.props.nextstep[key].avgpctdone
        };
        let hasPrev = nextkey.length > 1;
        if (nextstep.component == InboxTransition) {
            hasPrev = false;
        }
        let prevProps = {
            callback: this.handlePrev,
            hasPrev: hasPrev
        }
        //console.dir(compProps);
        //let comp = React.cloneElement(nextstep.component, { callback: this.handleClick, stepProps: stepProps });
        let comp = React.cloneElement(nextstep.component, compProps);

        return <div className="multi-step">
                {comp}
                <PrevButton {...prevProps}/>
        </div>
    }
});
