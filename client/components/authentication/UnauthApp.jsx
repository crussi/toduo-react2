const {
    RaisedButton,
    FlatButton
    } = MUI;

const styles = {
    title: {
        //marginTop: '3px',
        //marginBottom: '4px'
    }
};
const Colors = MUI.Styles.Colors;
const BgColors = [
    {primary:'red500', lightprimary:'red300',accent:'blueA200'},
    {primary:'pink500', lightprimary:'pink300', accent:'purple500'},
    {primary:'purple500', lightprimary:'purple300', accent:'blueA200'},
    {primary:'deepPurple500', lightprimary:'deepPurple300', accent:'blueA200'},
    {primary:'indigo500', lightprimary:'indigo300', accent:'lightBlueA200'},
    {primary:'blue500', lightprimary:'blue300', accent:'pinkA200'},
    {primary:'lightBlue500', lightprimary:'lightBlue300', accent:'pinkA200'},
    {primary:'cyan500', lightprimary:'cyan300', accent:'teal500'},
    {primary:'teal500', lightprimary:'teal300', accent:'cyan500'},
    {primary:'green500', lightprimary:'green300', accent:'blueA200'},
    {primary:'amber500', lightprimary:'amber300', accent:'indigoA200'},
    {primary:'orange500', lightprimary:'orange300', accent:'indigoA200'},
    {primary:'deepOrange500', lightprimary:'deepOrange300', accent:'indigoA200'},
    {primary:'blueGrey500', lightprimary:'blueGrey300', accent:'pinkA200'}];

UnauthApp = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            pallette: {primary: "#4285f4", lightprimary: "#ffffff", accent: "#ff4081"}
        };
    },
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
    setBgColor(){
        let newIndex = Math.round(Math.random()*(BgColors.length-1));
        this.setState({index: newIndex});
        let primary  = BgColors[newIndex].primary;
        let lightprimary = BgColors[newIndex].lightprimary;
        let accent = BgColors[newIndex].accent;
        //console.log('primary: ' + primary + ' lightprimary: ' + lightprimary + ' accent: ' + accent);
        let pallette = { primary: Colors[primary], lightprimary: Colors[lightprimary], accent: Colors[accent]};
        console.log('setBgColor primary: ' + pallette.primary);
        sessionStore.set("pallette",pallette);
        this.setState({pallette:pallette});

    },
    incrBgColorIndex() {
        //this method used for testing ...
        //let index = Math.round(Math.random()*(BgColors.length-1));
        console.log('old index: ' + this.state.index);
        let newIndex = ++this.state.index;
        newIndex = newIndex >= BgColors.length ? 0 : newIndex;
        this.setState({index: newIndex});

        let primary  = BgColors[newIndex].primary;
        let lightprimary = BgColors[newIndex].lightprimary;
        let accent = BgColors[newIndex].accent;
        console.log('primary: ' + primary + ' lightprimary: ' + lightprimary + ' accent: ' + accent);
        let pallette = { primary: Colors[primary], lightprimary: Colors[lightprimary], accent: Colors[accent]};
        this.setState({pallette:pallette});
    },
    changeTheme() {
        //this method used for testing ...
        this.incrBgColorIndex();
    },
    componentWillMount(){
        this.setBgColor();
    },
    render(){
        let contentHeader = (
            <div style={styles.title}>Toduo</div>
        );
        let tempStyle = {
            display: 'inline-block',
            marginBottom: '40px'
        }
        let pallette = this.state.pallette;

        let titleProps = {
            title: contentHeader,
            //"#4285f4"
            headerBgColor:'#FFFFFF',
            //containerBgColor: '#F44336'
            //containerBgColor: '#FFFFFF',
            //containerBgColor: '#000',
            containerBgColor: 'rgb(242, 242, 242)',
            //containerBgColor: pallette.lightprimary,
            fontColor: pallette.primary,
            boxShadow: '0 0 4px rgba(0,0,0,.14),-4px 4px 8px rgba(0,0,0,.08)',
            showSignIn: true
        };
        let color = BgColors[this.state.index].primary;
        return (
            <TitlePanel {...titleProps}>
                {this.props.content()}
            </TitlePanel>
        )
    }
});

//For testing different themes
//<div style={tempStyle}>
//    <RaisedButton primary={true}
//                  label="Change theme"
//
//                  onClick={this.changeTheme}>
//
//    </RaisedButton>
//    <FlatButton label={color}/>
//
//</div>
