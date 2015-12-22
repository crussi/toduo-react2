

const styles = {
    title: {
        marginTop: '3px',
        marginBottom: '4px'
    }
};

UnauthApp = React.createClass({
    render(){
        let contentHeader = (
            <div style={styles.title}>Toduo</div>
        );
        let titleProps = {
            title: contentHeader,
            //red 700, 500
            //headerBgColor:'#D32F2F',
            //headerBgColor:'#F44336',
            ////containerBgColor: '#F44336'
            //containerBgColor: 'transparent'
//FFFFFF
//F5F5F5
            headerBgColor:'#FFFFFF',
            //containerBgColor: '#F44336'
            containerBgColor: '#FFFFFF',
            fontColor: "#4285f4",
            boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.08)'
        };
        return (
            <TitlePanel {...titleProps}>
                {this.props.content()}
            </TitlePanel>
        )
    }
});

