 Ant = React.createClass({
    render(){
        return <div>
            <p>I am an ant, I keep busy!</p>
        </div>
    }
});

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

FlowRouter.route('/', {action: renderf(Container, { name: "world" }) } );
FlowRouter.route('/', {action: renderf(Ant, { name: "world" }) } );

FlowRouter.route('/inbox', {action: renderf(InboxList, { nextstep: nextstep }) } );

var nextRoutes = routeGroup('/next', 'next');
nextRoutes.route('/', {action: renderf(Container, { name: "next" }) } );
nextRoutes.route('/today', {action: renderf(Container, { name: "today" }) } );
nextRoutes.route('/thisweek', {action: renderf(Container, { name: "thisweek" }) } );
nextRoutes.route('/soon', {action: renderf(Container, { name: "soon" }) } );

FlowRouter.route('/focus', {action: renderf(Container, { name: "focus" }) } );

FlowRouter.route('/waitingfor', {action: renderf(Container, { name: "waiting for" }) } );


var scheduledRoutes = routeGroup('/scheduled', 'scheduled');
scheduledRoutes.route('/', {action: renderf(Container, { name: "scheduled" }) } );
scheduledRoutes.route('/calendar', {action: renderf(Container, { name: "calendar" }) } );
scheduledRoutes.route('/reminders', {action: renderf(Container, { name: "reminders" }) } );

var somedayRoutes = routeGroup('/someday', 'someday');
somedayRoutes.route('/', {action: renderf(Container, { name: "someday" }) } );
somedayRoutes.route('/:id', {action: function(params) { renderc(TaskPage, { id: params.id }) }} );

var projectRoutes = routeGroup('/project', 'project');
projectRoutes.route('/', {action: renderf(Container, { name: "projects" }) } );
projectRoutes.route('/:id', {action: function(params) { renderc(ProjectPage, { id: params.id }) }} );

FlowRouter.route('/review', {action: renderf(Container, { name: "review" }) } );

var listsRoutes = routeGroup('/lists', 'lists');
listsRoutes.route('/', {action: renderf(Container, { name: "lists" }) } );
listsRoutes.route('/checklists', {action: renderf(Container, { name: "checklists" }) } );
listsRoutes.route('/reference', {action: renderf(Container, { name: "reference" }) } );
listsRoutes.route('/reference/:id', {action: function(params) { renderc(ReferencePage, { id: params.id }) }} );

listsRoutes.route('/done', {action: renderf(Container, { name: "done" }) } );
listsRoutes.route('/trash', {action: renderf(Container, { name: "trash" }) } );

var contextsRoutes = routeGroup('/contexts', 'contexts');
contextsRoutes.route('/', {action: renderf(Container, { name: "contexts" }) } );
contextsRoutes.route('/roles', {action: renderf(RolesPage) } );
contextsRoutes.route('/contexts', {action: renderf(ContextsPage) } );
contextsRoutes.route('/flags', {action: renderf(FlagsPage) } );
contextsRoutes.route('/delegates', {action: renderf(DelegatesPage) } );

var settingsRoutes = routeGroup('/settings', 'settings');
settingsRoutes.route('/', {action: renderf(Container, { name: "settings" }) } );
settingsRoutes.route('/profile', {action: renderf(Container, { name: "profile" }) } );
settingsRoutes.route('/general', {action: renderf(Container, { name: "general" }) } );

