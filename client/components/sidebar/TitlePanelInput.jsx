TitlePanelInput = React.createClass({
    //onChange(input, resolve){
    //
    //},
    onSubmit(input){
        if (!input) return;
        console.info("Parent onSubmit input: " + input);
        Meteor.call("/inbox/addNew", input, (err, res) => {
            console.log('meteor.call inbox addNew');
            if (err) {
                console.log("Failed to add new input task.");
                return;
            }

            //input.value = "";
        });
    },
    render(){
        return (
                <span><form>
                    <SearchBar
                        Docked={this.props.Docked}
                        placeholder="Inbox input ..."
                        //onChange={this.onChange}
                        onSubmit={this.onSubmit} />
                </form></span>
        )
    }
});
