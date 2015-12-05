


Meteor.startup(function () {
  sessionStore = new ReactiveDict();
  //Note: this is needed for material-ui datepicker.  Otherwise, I was doing fine without it.
  injectTapEventPlugin();
  //console.log('startup render sidebarapp');
  //React.render(<App />, document.getElementById("container"));
    //For some reason the app works without this ???
  ReactDOM.render(<SidebarApp />, document.getElementById("container"));
  //React.render(<BrowserApp />, document.getElementById("container"));
});