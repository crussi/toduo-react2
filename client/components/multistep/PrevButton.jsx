const styles = {
    btnPrev: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        fontSize: '12px',
        color: 'rgba(0,0,0,0.50)'
    }
};

PrevButton = React.createClass({
    handleClick(val){
        this.props.callback(val);
    },
    render(){
        let style = styles.btnPrev;
        let prevBtn;
        if (this.props.hasPrev == true) {
            prevBtn = <FlatButton style={style}  label="Prev" onClick={e => this.handleClick("Prev")}><i className="zmdi zmdi-chevron-left btn-icon"/></FlatButton>;
        }
        return <div>{prevBtn}</div>
    }
});