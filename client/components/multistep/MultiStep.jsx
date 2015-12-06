

MultiStep = React.createClass({
    getInitialState() {
        let task = new Task();
        task.set({
            Title: this.props.title,
            Type: "Not set"
        });
        return {
            nextkey: ["MultiStep.Expand"],
            task: task
        }
    },
    handleNextStep(val){
        this.setState(
            {
                nextkey: this.state.nextkey.concat(val)
            });
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
    updateTask(task){
        this.setState({task:task});
    },
    styles: {
        multistep: {
            position: 'relative'
        }
    },
    render(){
        //console.log('MultiStep render');
        //console.dir(this.state.task);
        const {nextkey} = this.state;
        let key = nextkey[nextkey.length-1];
        let nextstep = this.props.nextstep[key].nextstep;
        let compProps = {
            title: this.props.title,
            handleNextStep: this.handleNextStep,
            updateTask: this.updateTask,
            handleRouting: this.handleRouting,
            handleRemove: this.handleRemove,
            icon: nextstep.icon,
            avgpctdone: this.props.nextstep[key].avgpctdone,
            task: this.state.task
        };
        let hasPrev = nextkey.length > 1;
        let multiStepStyle = this.styles.multistep;
        if (nextstep.component.type.displayName == "InboxTransition") {
            hasPrev = false;
        } else if (nextstep.component.type.displayName == "IsSchedulable") {
            multiStepStyle["minHeight"] = "120px";
        } else {
            multiStepStyle["minHeight"] = "75px";
        }

        let prevProps = {
            marginTop: '20px',
            callback: this.handlePrev,
            hasPrev: hasPrev
        }
        //console.dir(compProps);
        //let comp = React.cloneElement(nextstep.component, { callback: this.handleClick, stepProps: stepProps });
        let comp = React.cloneElement(nextstep.component, compProps);
        return <div className="multi-step" style={multiStepStyle}>
                    {comp}
                    <PrevButton {...prevProps}/>
               </div>
    }
});
