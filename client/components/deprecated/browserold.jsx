
BrowserOld = React.createClass({
    getInitialState() {
        return {
            path: [],
            selectedId: ''
        }
    },
    //printState(src) {
    //    console.log('path len: ' + this.state.path.length);
    //},
    navUp() {
        for (let i = 0; i < this.state.path.length; i++) {
            //console.log('navUp b4 path i: ' + i + ' = ' + this.state.path[i].name);
        }
        let fun = function(){
            let id = this.currNode() ? this.currNode().id : '';
            //console.log('navUp setState id: ' + id);
            for (let i = 0; i < this.state.path.length; i++) {
                //console.log('navUp af path i: ' + i + ' = ' + this.state.path[i].name);
            }
        };
        //this.currNode().isLeafNode ? this.popNode(2) : this.popNode(1);
        if (this.currNode().isLeafNode) {
            //console.log('navUp isLeafNode');
            this.setState({path: this.state.path.slice(0, -2)},fun);
        } else {
            //console.log('navUp isLeafNode');
            this.setState({path: this.state.path.slice(0, -1)},fun);
        }
        //this._goRoute('');


        //this.setState({selectedId: id});
    },
    navDown(index,item,isleaf) {
        //console.log('navDown id: ' + id);
        for (let i = 0; i < this.state.path.length; i++) {
            //console.log('pop b4 path i: ' + i + ' = ' + this.state.path[i].name);
        }
        let fun = function(){
            let id = this.currNode() ? this.currNode().id : '';
            //console.log('popNode setState id: ' + id);
            for (let i = 0; i < this.state.path.length; i++) {
                //console.log('pop af path i: ' + i + ' = ' + this.state.path[i].name);
            }
        };
        if (isleaf && this.currNode() && this.currNode().isLeafNode) {
            //console.log('isleaf pop ...' + item.name);
            this.setState({path: this.state.path.slice(0, -1)},fun);
            this.pushNode(this.newNode(index, item.id, item.name, isleaf));
            this.setState({selectedId: item.id});
        } else {
            this.pushNode(this.newNode(index, item.id, item.name, isleaf));
            this.setState({selectedId: item.id});
        }

        //console.log('selectedId: ' + this.state.selectedId);
        //this._goRoute('');
    },
    //navRoute(e, index,id,name) {
    //    //console.log('navRoute id: ' + id);
    //    //let name = e.target.dataset.name;
    //    if (this.currNode() && this.currNode().isLeafNode) {
    //        this.popNode(1);
    //    }
    //    this.pushNode(this.newNode(index, id, name, true));
    //    this.setState({selectedId: id});
    //    //this._goRoute(name);
    //    //console.log('selectedId: ' + this.state.selectedId);
    //},
    newNode(index, id, name, isLeafNode) {
        return {'index':index, 'id': id, 'name': name, 'isLeafNode': isLeafNode};
    },
    currNode(){
        return this.state.path[this.state.path.length-1];
    },
    popNode(amt,callback){
        for (let i = 0; i < this.state.path.length; i++) {
            //console.log('pop b4 path i: ' + i + ' = ' + this.state.path[i].name);
        }
        let fun = function(){
            let id = this.currNode() ? this.currNode().id : '';
            //console.log('popNode setState id: ' + id);
            for (let i = 0; i < this.state.path.length; i++) {
                //console.log('pop af path i: ' + i + ' = ' + this.state.path[i].name);
            }
        };
        this.setState({path: this.state.path.slice(0, -1)},fun);
    },
    pushNode(node){
        this.setState({path: this.state.path.concat([node])});
        //this.setState({selectedId: node.id});
    },

    _goRoute(name){
        //console.log('goroute');
        //FlowRouter.go('/'+name);
    },

    render() {
        //console.log('browser render');
        let filteredItems = this.state.path.filter(function(node){return !node.isLeafNode});
        let selectedId = this.state.path.length > 0 ? this.state.path[this.state.path.length-1].id : '';
        //console.log('render selectedId: ' + selectedId);
        let parent = {};

        const items = filteredItems.reduce(function(items, key) {
            parent = items[key.index];
            return items[key.index].children;
        }, this.props.items);


        let navicon, navtitle;

        if (filteredItems.length > 0) {
            navicon = <a className="nav-arrow" onClick={this.navUp}><i className="zmdi zmdi-chevron-left"></i></a>;
            navtitle = <a className="nav-title" onClick={this.navUp}>{parent.name}</a>;

        } else {
            navicon = <div className="nav-arrow"></div>;
            navtitle = <span className="nav-title">Home</span>;
            //navtitle = <a className="nav-title" onClick={this.navUp}>Home</a>;
        }

        return <div className="browser browser-panel">
            <div className="menu-navbar">
                {navicon}
                {navtitle}
            </div>

            <SliderTransition selectedId={selectedId} depth={filteredItems.length} className="items-container">
                {items.map(function(item, index) {
                    let isSelected = selectedId == item.id;
                    //console.log("isSelected: " + isSelected);
                    let color = ' color-' + item.color + '-500';
                    let iconClass = "zmdi zmdi-" + item.icon + color;
                    let itemClass = !isSelected ? "item" : "item" + color;
                    if (isSelected) {
                        //console.log("name: " + item.name + " iconClass: " + iconClass + " itemClass: " + itemClass);
                        //console.log("name: " + item.name);
                    }
                    if (item.children) {

                        return <div className="menu-item"><a className={itemClass} onClick={e => this.navDown(index,item,false)} key={item.name}><i className={iconClass}></i>{item.name}<i className="zmdi zmdi-chevron-right"></i></a></div>;
                    } else {
                        return <div className={itemClass} onClick={e => this.navDown(index,item,true)} data-name={item.name} key={item.name}><i className={iconClass}></i>{item.name}</div>;
                    }
                }.bind(this))}
            </SliderTransition>
        </div>;
    }
});
