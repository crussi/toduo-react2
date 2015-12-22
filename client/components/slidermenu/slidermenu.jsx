
SliderMenu = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("menudata"),Meteor.subscribe("routestatedata")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            items: MenuData.find({},{sort:{primarySort: 1}}).fetch(),
            routestates: RouteStateData.find({}).fetch(),
            //currentUser: Meteor.user(),
            //disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
            disconnected: false
        };

    },
    getInitialState() {
        return {
            path: [],
            selected: []
        }
    },
    componentDidMount: function() {
        window.addEventListener('popstate', this.handlePopstate);
        Emitter.on('route-path-changed', this.handleRouteChange);
    },
    componentWillUnmount: function() {
        window.removeEventListener('popstate', this.handlePopstate);
        Emitter.removeListener('route-path-changed', this.handleRouteChange);
    },
    handlePopstate(event) {
        this.updateRouteState(event.state.path);
    },
    handleRouteChange(event){
        this.updateRouteState(event.path);
    },
    updateRouteState(route){
        //console.log('updateRouteState route: ' + route);
        let routestate = this.getRouteState(route);
        if (!routestate) {
            //console.log('not routestate');
            let count = 0;
            while (!routestate  && count <= 10) {
                let parts = route.split("/");
                if (parts.length > 2) {
                    route = parts.slice(0, -1).join("/");
                    routestate = this.getRouteState(route);
                    if (routestate) {
                        break;
                    }
                } else {
                    break;
                }
                count++;
            }
        }
        //console.log('path and selected gotten from routestate:');
        //console.dir(routestate);
        let path = routestate ? routestate[0] : [];
        //console.dir(path);
        let selected = routestate ? routestate[1] : [];
        //console.dir(selected);
        this.setState({path: path});
        this.setState({selected: selected});
    },
    getRouteState(key){
        //console.dir(this.data.routestates);
        var result = this.data.routestates.filter(function(data) {
            return data.key == key;
        });
        return result.length >= 1 ? result[0].value : undefined;
    },
    navUp() {
        //console.log(this.state.selected.length);
        //console.dir(this.state.selected);

        //this was working ... now it is not???  This seems to be working now
        //not sure why I had length > 0 and then pop up 2???
        //if (this.state.selected.length > 0) {
        if (this.state.selected.length > 1) {
            let item = this.state.selected[this.state.selected.length-2];
            //console.log('selected item:');
            //console.dir(item);
            if (item && item.route) {
                FlowRouter.go(item.route);
            }
        }
        this.setState({path: this.state.path.slice(0, -1)});
        this.setState({selected: this.state.selected.slice(0, -1)});
    },
    navDown(item,index) {
        if (item.children) {
            this.setState({path: this.state.path.concat(index)});
            this.setState({selected: this.state.selected.slice(0,-1).concat({"_id": item._id, "route": item.route}).concat('')});
        } else {
            this.setState({selected: this.state.selected.slice(0,-1).concat({"_id": item._id, "route": item.route})})
        }
        if (item.route) {
            FlowRouter.go(item.route);
        }
    },
    render() {
        //console.log('slidermenu render ');
        //console.dir(this.data);
        //console.dir(this.state);
        const {path} = this.state;
        let selectedId = '';
        //let item = {};
        let item = {};
        if (this.state.selected.length > 0) {
            item = this.state.selected[this.state.selected.length-1];
            selectedId = item._id;
        }
//console.log('selectedId: ' + selectedId);
        let parent = {};

        const items = path.reduce(function(items, key) {
            //console.log('inside reduce items: ' + items + ' key: ' + key);
            parent = items[key];
            return items[key].children;
        }, this.data.items) || this.data.items;

        let navicon, navtitle;
        if (path.length > 0) {
            navicon = <a className="nav-arrow" onClick={this.navUp}><i className="zmdi zmdi-chevron-left"></i></a>;
            navtitle = <a className="nav-title" onClick={this.navUp}>{parent.name}</a>;

        } else {
            navicon = <div className="nav-arrow"></div>;
            navtitle = <span className="nav-title">Home</span>;
        }
        let comp = <p>Loading ...</p>;
        if (this.data.subsReady) {
            comp = <SliderTransition depth={path.length} selectedId={selectedId} className="items-container">
                {items.map(function(item, index) {
                    return <SliderMenuItem item={item} index={index} selectedId={selectedId} key={item._id}
                                           callbackNavDown={this.navDown}></SliderMenuItem>
                    }.bind(this))}
            </SliderTransition>
        }

        return <div className="browser browser-panel">
                <div className="menu-navbar">
                    {navicon}
                    {navtitle}
                </div>
                {comp}
            </div>;
    }
});
