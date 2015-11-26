

SliderMenuItem = React.createClass({
    getInitialState() {
        return {
            isSelected: false
        }
    },
    navDown(item,index) {
        //console.log('browseritem navDown id: ' + item.id);
        this.props.callbackNavDown(item,index);
    },
    render() {
        //console.log('BrowserItem render');
        let item = this.props.item;
        let index = this.props.index;
        //console.log('item.name: ' + item.name);
        let color = ' color-' + item.color + '-500';
        let iconClass = "zmdi zmdi-" + item.icon + color;
        let isSelected = item._id == this.props.selectedId;
        let itemClass = "item " + (isSelected ? color : "");
        //console.log('itemClass: ' + itemClass);

        if (item.children) {
            return <div className="menu-item"><a className={itemClass} onClick={e => this.navDown(item,index)} key={item.name}><i className={iconClass}></i>{item.name}</a><i className="zmdi zmdi-chevron-right"></i></div>;
        } else {
            return <div className={itemClass} onClick={e => this.navDown(item,index)} key={item.name}><i className={iconClass}></i>{item.name}</div>;
        }
    }
});