
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
            items: MenuData.find({}).fetch(),
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
        console.log("*** look at this:");
        console.dir(event);
        this.updateRouteState(event.state.path);
    },
    handleRouteChange(event){
        //console.log('handleRouteChange');
        //console.dir(event);
        this.updateRouteState(event.path);
    },
    updateRouteStateX(route){
        console.log("***** updateRouteState " + route);
        //console.dir(this.props.routestate);
        let routestate = this.props.routestate[route];
        //let x = this.data.routestates.find({key:route});
        //console.dir(this.data.routestates);
        if (!routestate) {
            let count = 0;
            while (!routestate && count <= 10) {
                route = route.split("/").pop().join();
                routestate = this.props.routestate[route];
                count++;
            }
        }
        //console.log('routestate');
        console.log("*** did you get routestate????");
        console.dir(routestate);
        let path = routestate ? routestate[0] : [];
        console.log('path: ' + path);
        let selected = routestate ? routestate[1] : [];
        console.log('selected: ' + selected);
        this.setState({path: path});
        this.setState({selected: selected});
    },
    updateRouteState(route){
        console.log("**new**");
        let routestate = this.getRouteState(route);
        console.dir(routestate);
        if (!routestate) {
            console.log('no routestate');
            console.dir(route.split("/"));
            let count = 0;
            while (!routestate && route.split("/").length > 2    && count <= 10) {
                route = route.split("/").pop().join();
                routestate = this.getRouteState(route);
                count++;
            }
        }
        //console.log('routestate');
        console.log("*** did you get routestate????");
        console.dir(routestate);
        let path = routestate ? routestate[0] : [];
        console.log('path: ' + path);
        let selected = routestate ? routestate[1] : [];
        console.log('selected: ' + selected);
        this.setState({path: path});
        this.setState({selected: selected});
    },
    getRouteState(key){
        console.log("key: " + key);
        var result = this.data.routestates.filter(function(data) {
            return data.key == key;
        });
        console.dir(result);
        return result[0].value;
    },
    navUp() {
        if (this.state.selected.length > 0) {
            let item = this.state.selected[this.state.selected.length-2];
            FlowRouter.go(item.route);
        }
        this.setState({path: this.state.path.slice(0, -1)});
        this.setState({selected: this.state.selected.slice(0, -1)});
    },
    navDown(item,index) {
        //console.log('navDown index:' + index);
        //console.dir(item);
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
        console.log('slidermenu render ');
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

        return <div className="browser browser-panel">
            <div className="menu-navbar">
                {navicon}
                {navtitle}
            </div>

            <SliderTransition depth={path.length} selectedId={selectedId} className="items-container">
                {items.map(function(item, index) {
                    return <SliderMenuItem item={item} index={index} selectedId={selectedId} key={item._id} callbackNavDown={this.navDown}></SliderMenuItem>
                }.bind(this))}
            </SliderTransition>

        </div>;
    }
});
