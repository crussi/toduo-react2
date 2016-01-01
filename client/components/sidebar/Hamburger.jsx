Hamburger = React.createClass({
    menuStyle: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    hamburgerClick(e){
        this.props.hamburgerClick(e);
    },
    render(){
        return (
            <a onClick={this.hamburgerClick} href='#' style={this.menuStyle}><i className="zmdi zmdi-menu"></i></a>
        )
    }
});
