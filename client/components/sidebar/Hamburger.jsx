Hamburger = React.createClass({
    menuStyle: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    menuButtonClick(e){
        this.props.menuButtonClick(e);
    },
    render(){
        return (
            <a onClick={this.menuButtonClick} href='#' style={this.menuStyle}><i className="zmdi zmdi-menu"></i></a>
        )
    }
});
