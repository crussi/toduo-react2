const {
    Card,
    CardMedia,
    CardTitle,
    CardText
    //Paper, List, ListItem, ContentInbox, ActionGrade, ContentSend, ContentDrafts
    } = MUI;

ContextCard = React.createClass({
    trianglify() {
        //let img = this.refs.something.getDOMNode();
        let img = this.refs.something;
        let pattern = Trianglify({
            width: img.offsetWidth,
            height: img.offsetHeight,
            cell_size: 125,
            variance: "1",
            x_colors: ['#004D40','#00695C','#00796B','#00897B','#009688','#26A69A','#4DB6AC','#80CBC4','#00BFA5','#1DE9B6','#64FFDA'],
            y_colors: ['#64FFDA','#1DE9B6','#00BFA5','#80CBC4','#4DB6AC','#26A69A','#009688','#00897B','#00796B','#00695C','#004D40']

        });
        img.src = pattern.png();
    },
    handleResize: function(e) {
        this.trianglify();
    },
    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
        this.trianglify();
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render(){
        let cardStyle = {
          //height: this.props.height
            height: '90%'
          //  flex:2,
          //  display: 'flex'
        };
        let titleStyle = {
            fontSize: 30,
            color: "rgba(255, 255, 255, 0.95)",
            display: 'block',
            lineHeight: '36px',
        };
        let subtitleStyle = {
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.95)",
            display: 'block',
        };
        let mediaStyle = {
            backgroundColor: this.props.backgroundColor,
            position: 'relative'
        };
        let overlayContentStyle = {
            background: 'transparent'
        };
        let iconClass = "zmdi zmdi-" + this.props.icon + " context-icon";
        let mediaTitle = <div className="context-title"><CardTitle title={this.props.mediaTitle} subtitle={this.props.mediaSubtitle}
                                    titleStyle={titleStyle} subtitleStyle={subtitleStyle}/>
        <i className={iconClass}/>
        </div>

        return <Card style={cardStyle}>
            <CardMedia mediaStyle={mediaStyle} overlayContentStyle={overlayContentStyle} overlay={mediaTitle}>
                <img src="/images/Transparent.gif" height="150px" ref="something"/>
            </CardMedia>

            <CardText>
                {this.props.cardText}
            </CardText>
            {this.props.content}
        </Card>

    }
});