const update = React.addons.update;

const styles = {
    root: {
        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        fontWeight: 300,
        height: '100%',
        width: '100%'
    },
    header: {
        zIndex: '1',
        //backgroundColor: '#03a9f4',
        backgroundColor: '#4285f4',
        //boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.28)',
        color: 'white',
        padding: '10px',
        fontSize: '1.5em',
        top: '0',
        position: 'fixed',
        width: '100%'
    },
    content: {
        marginTop: '54px',
        padding: '8px',
        //backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%'

        //marginRight: '20px'
    }
};

TitlePanel = React.createClass({
    getInitialState() {
        return {
            height: '100%'
        };
    },
    render() {
        let rootStyle = this.props.style ?
            update(styles.root, {$merge: this.props.style}) :
            styles.root;
        styles.content.height = this.props.viewportHeight;
        return (
            <div style={rootStyle}>
                <div style={styles.header}>{this.props.title}</div>
                <div style={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
    //render() {
    //    let rootStyle = this.props.style ?
    //        update(styles.root, {$merge: this.props.style}) :
    //        styles.root;
    //    styles.content.height = this.props.viewportHeight;
    //
    //    let x =  <div>{this.props.children}
    //    </div>
    //    let comp =  React.cloneElement(this.doRender(), {
    //        style: styles.content
    //    });
    //    return comp;
    //},
    //doRender: function() {
    //    return (
    //        <div style={rootStyle}>
    //            <div style={styles.header}>{this.props.title}</div>
    //            <div style={styles.content}>
    //                {this.props.children}
    //            </div>
    //        </div>
    //    );
    //}

});