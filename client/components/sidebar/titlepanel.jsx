const update = React.addons.update;

//const styles = {
//    root: {
//        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
//        fontWeight: 300,
//        //this caused unexpected height issues
//        height: '100%',
//        width: '100%'
//    }
//    header: {
//        zIndex: '1',
//        //backgroundColor: '#03a9f4',
//        backgroundColor: '#4285f4',
//        //boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
//        boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.28)',
//        color: 'white',
//        padding: '10px',
//        fontSize: '1.5em',
//        top: '0',
//        position: 'fixed',
//        width: '100%'
//    }
//    //content: {
//    //    marginTop: '54px',
//    //    padding: '8px',
//    //    //backgroundColor: '#f2f2f2',
//    //    //height: '100%',
//    //    height: 'calc(100vh-54px)',
//    //    width: '100%'
//    //
//    //    //marginRight: '20px'
//    //}
//};

TitlePanel = React.createClass({
    getInitialState() {
        return {
            //height: '100%'
        };
    },
    render() {
        let styles = {
            root: {
                fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontWeight: 300,
                //this caused unexpected height issues
                height: '100%',
                width: '100%'
            },
            header: {
                zIndex: '1',
                //backgroundColor: '#03a9f4',
                //backgroundColor: '#4285f4',
                backgroundColor: this.props.headerBgColor,
                //boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
                boxShadow: this.props.boxShadow,
                color: this.props.fontColor,
                padding: '10px',
                fontSize: '1.5em',
                top: '0',
                position: 'fixed',
                width: '100%'
            },
            container: {
                marginTop: '54px',
                width: '100%',
                padding: '8px',
                height: '100%',
                height: '100vh',
                height: '-webkit-calc(100vh - 54px)',
                height: '-moz-calc(100vh - 54px)',
                height: 'calc(100vh - 54px)',
                backgroundColor: this.props.containerBgColor
            }
        };
        let rootStyle = this.props.style ? update(styles.root, {$merge: this.props.style}) : styles.root;
        //TODO: trying to convert to using 100vh
        //styles.content.height = this.props.viewportHeight;
        return (
            <div name="titlepanel-root" style={rootStyle}>
                <div name="titlepanel-header" style={styles.header}>{this.props.title}</div>
                <div name="titlepanel-container" style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }

});