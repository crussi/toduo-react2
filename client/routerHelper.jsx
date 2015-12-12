let pathFor = ( path, params ) => {
    let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
    return FlowRouter.path( path, params, query );
};

let urlFor = ( path, params ) => {
    return Meteor.absoluteUrl( pathFor( path, params ) );
};

let currentRoute = ( route ) => {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
    pathFor: pathFor,
    urlFor: urlFor,
    currentRoute: currentRoute
};


Emitter = new EventEmitter();

Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    var currentContext = FlowRouter.current();
    // do anything with the current context
    // or anything you wish
    console.dir(currentContext);
    var path = currentContext.route ? currentContext.route.path : "";
    path = (path.substr(-suffix.length) === "/") ? path.slice(0, -1) : path;
    console.log("route changed: " + path);
    //console.dir(currentContext.route.path);
    Emitter.emit('route-path-changed', {
        path: path
    });
});