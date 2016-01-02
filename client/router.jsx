

function IsAuthenticated () {
    //console.log("checking IsAuthenticated");
    var route;
    if (!(Meteor.loggingIn() || Meteor.userId())) {
        //console.log('user is not authenticated');
        route = FlowRouter.current();
        if (route.route.name !== 'signin') {
            Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go("/toduo");
    } //else {
        //return FlowRouter.go("/toduo/app");
    //}
}
function renderf(Comp, props = {}, Layout = SidebarApp) {

    return function action(params, queryParams) {
        ReactLayout.render(Layout, {content() { return <Comp {...props} />;
        }});
    };
}

function renderc(Comp, props = {}, Layout = SidebarApp) {
    ReactLayout.render(Layout, {content() { return <Comp {...props} />; }});
}

function routeGroup(routePrefix, name) {
    return FlowRouter.group({prefix: routePrefix, name: name});
}
//Global trigger
FlowRouter.triggers.enter([IsAuthenticated], {except: ["signin","signup"]});

FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
        redirect('/toduo');
    }],
    action: function(_params) {
        //throw new Error("this should not get called");
        console.log("action called on flowrouter route ...");
    }
});

FlowRouter.route('/toduo', {action: renderf(MktgPage,{},UnauthApp)} );
FlowRouter.route('/toduo/signin', {name: "signin", action: renderf(AuthPage,{type:'signin'},UnauthApp)} );
FlowRouter.route('/toduo/signup', {name: "signup", action: renderf(AuthPage,{type:'signup'},UnauthApp)} );
FlowRouter.route('/toduo/app', {action: renderf(Container, { name: "world" }) } );

FlowRouter.route('/inbox', {action: renderf(InboxList, { nextstep: nextstep }) } );

var nextRoutes = routeGroup('/next', 'next');
nextRoutes.route('/', {action: renderf(Container, { name: "next" }) } );
nextRoutes.route('/today', {action: renderf(Container, { name: "today" }) } );
nextRoutes.route('/thisweek', {action: renderf(Container, { name: "thisweek" }) } );
nextRoutes.route('/soon', {action: renderf(Container, { name: "soon" }) } );

FlowRouter.route('/focus', {action: renderf(Container, { name: "focus" }) } );

FlowRouter.route('/waitingfor', {action: function(params) { renderc(WaitingForPage) }} );
FlowRouter.route('/waitingfor/:id', {action: function(params) { renderc(WaitingForPage, { id: params.id}) }} );


var scheduledRoutes = routeGroup('/scheduled', 'scheduled');
scheduledRoutes.route('/', {action: renderf(Container, { name: "scheduled" }) } );
scheduledRoutes.route('/calendar', {action: renderf(Container, { name: "calendar" }) } );
scheduledRoutes.route('/reminders', {action: renderf(Container, { name: "reminders" }) } );

var somedayRoutes = routeGroup('/someday', 'someday');
somedayRoutes.route('/', {action: renderf(Container, { name: "someday" }) } );
somedayRoutes.route('/:id', {action: function(params) { renderc(TaskPage, { id: params.id, type: "Someday" }) }} );

var projectRoutes = routeGroup('/project', 'project');
projectRoutes.route('/', {action: renderf(Container, { name: "projects" }) } );
projectRoutes.route('/:id', {action: function(params) { renderc(ProjectPage, { id: params.id }) }} );

FlowRouter.route('/review', {action: renderf(Container, { name: "review" }) } );

var listsRoutes = routeGroup('/lists', 'lists');
listsRoutes.route('/', {action: renderf(Container, { name: "lists" }) } );
listsRoutes.route('/checklists', {action: renderf(Container, { name: "checklists" }) } );
listsRoutes.route('/reference', {action: function(params) { renderc(ReferencePage) }} );
listsRoutes.route('/reference/:id', {action: function(params) { renderc(ReferencePage, { id: params.id }) }} );
listsRoutes.route('/done', {action: function(params) { renderc(DonePage) }} );
listsRoutes.route('/done/:id', {action: function(params) { renderc(DonePage, { id: params.id }) }} );
listsRoutes.route('/trash', {action: function(params) { renderc(TrashPage) }} );
listsRoutes.route('/trash/:id', {action: function(params) { renderc(TrashPage, { id: params.id }) }} );

var contextsRoutes = routeGroup('/contexts', 'contexts');
contextsRoutes.route('/', {action: renderf(Container, { name: "contexts" }) } );
//contextsRoutes.route('/', {action: renderf(RolesPage) } );
contextsRoutes.route('/roles', {action: renderf(RolesPage) } );
contextsRoutes.route('/contexts', {action: renderf(ContextsPage) } );
contextsRoutes.route('/flags', {action: renderf(FlagsPage) } );
contextsRoutes.route('/delegates', {action: renderf(DelegatesPage) } );

var settingsRoutes = routeGroup('/settings', 'settings');
settingsRoutes.route('/', {action: renderf(Container, { name: "settings" }) } );
settingsRoutes.route('/profile', {action: renderf(Container, { name: "profile" }) } );
settingsRoutes.route('/general', {action: renderf(Container, { name: "general" }) } );

