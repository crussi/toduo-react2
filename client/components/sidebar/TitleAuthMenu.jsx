const {
    IconMenu,
    IconButton,
    MenuItem,
    FontIcon
    } = MUI;

TitleAuthMenu = React.createClass({
    onChange(e){
        console.log("on change");
    },
    styles: {
        icon: {
            fontSize: '44px',
            color: 'rgba(250,250,250,0.75)'
        }
    },
    render(){
        //<IconButton touch={true} iconStyle={iconStyle}>
        //    <i className="zmdi zmdi-account-circle" />
        //</IconButton>}>
        let iconStyle = this.styles.icon;
        let anchorOrigin = {"horizontal":"left","vertical":"bottom"};
        let targetOrigin = {"horizontal":"left","vertical":"top"};
        return (
            <IconMenu onChange={this.onChange} anchorOrigin={anchorOrigin} targetOrigin={targetOrigin} iconButtonElement={
<IconButton tooltip="Sort" disabled={false}>
  <FontIcon className="muidocs-icon-custom-sort"/>
</IconButton>
                }>
                <MenuItem index={0} primaryText="Sign out" />
                <MenuItem index={1} primaryText="Sign out" />
                <MenuItem index={2} primaryText="Sign out" />
            </IconMenu>


        )
    }
});
