


Meteor.startup(function () {
  sessionStore = new ReactiveDict();
  //injectTapEventPlugin();
  //console.log('startup render sidebarapp');
  //React.render(<App />, document.getElementById("container"));
    //For some reason the app works without this ???
  ReactDOM.render(<SidebarApp />, document.getElementById("container"));
  //React.render(<BrowserApp />, document.getElementById("container"));
});