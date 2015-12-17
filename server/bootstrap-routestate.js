

var routestate = [
    {key:"/", value:[[],[]]},
    {key:"/inbox", value:[[],[{_id:"FDDp1ru10UCxl2Xnv2NT2Q",route:"/inbox"}]]},
    {key:"/next", value:[[1],[{_id:"I10ifHO0PEGrSxI_nNi-ag",route:"/next"}]]},
    {key:"/next/today", value:[[1],[{_id:"I10ifHO0PEGrSxI_nNi-ag",route:"/next"},{_id:"bFolGPm9ikShWzx76mq0GQ",route:"/next/today"}]]},
    {key:"/next/thisweek", value:[[1],[{_id:"I10ifHO0PEGrSxI_nNi-ag",route:"/next"},{_id:"_dy3uCTWF0qsWqELiinqFg",route:"/next/thisweek"}]]},
    {key:"/next/soon", value:[[1],[{_id:"I10ifHO0PEGrSxI_nNi-ag",route:"/next"},{_id:"w7mtxGN6Vkycw0pzuc7nHw",route:"/next/soon"}]]},
    {key:"/focus", value:[[],[{_id:"fFrT8jnMA0W0iqLa8iLeNw",route:"/focus"}]]},
    {key:"/waitingfor", value:[[],[{_id:"qvyAi6BwzUefiROWuco38g",route:"/waitingfor"}]]},
    {key:"/waitingfor/:id", value:[[],[{_id:"qvyAi6BwzUefiROWuco38g",route:"/waitingfor/:id"}]]},
    {key:"/scheduled", value:[[4],[{_id:"ELm2BGNyHkCGsEzL5hp_JQ",route:"/scheduled"}]]},
    {key:"/scheduled/calendar", value:[[4],[{_id:"ELm2BGNyHkCGsEzL5hp_JQ",route:"/scheduled"},{_id:"kvIGBCUWZkuzp86JaHye4A",route:"/scheduled/calendar"}]]},
    {key:"/scheduled/reminders", value:[[4],[{_id:"ELm2BGNyHkCGsEzL5hp_JQ",route:"/scheduled"},{_id:"XueTfO9q9EuzgzsMcjI1oA",route:"/scheduled/reminders"}]]},
    {key:"/someday", value:[[],[{_id:"Jldp4JOaD0Oa3W1eOe17ug",route:"/someday"}]]},
    {key: "/someday/:id", value:[[],[{_id:"Jldp4JOaD0Oa3W1eOe17ug",route:"/someday/:id"}]]},
    {key: "/project", value:[[6],[{_id:"UeWFiTObrEGrl88O9woGtA",route:"/project"}]]},
    {key:"/project/7EHOtAYARkG0c43qsDH5cQ", value:[[6],[{_id:"UeWFiTObrEGrl88O9woGtA",route:"/project"},{_id:"7EHOtAYARkG0c43qsDH5cQ",route:"/project/7EHOtAYARkG0c43qsDH5cQ"}]]},
    {key:"/project/0dCP51BWpEuPWDLiWVKQOQ", value:[[6],[{_id:"UeWFiTObrEGrl88O9woGtA",route:"/project"},{_id:"0dCP51BWpEuPWDLiWVKQOQ",route:"/project/0dCP51BWpEuPWDLiWVKQOQ"}]]},
    {key:"/project/C_xUMSgdpEuS4Yt1XlO-XQ", value:[[6],[{_id:"UeWFiTObrEGrl88O9woGtA",route:"/project"},{_id:"C_xUMSgdpEuS4Yt1XlO-XQ",route:"/project/C_xUMSgdpEuS4Yt1XlO-XQ"}]]},
    {key:"/review", value:[[],[{_id:"IsYuh58UnkyUYZKU0TcGXw",route:"/review"}]]},
    {key:"/lists", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"}]]},
    {key:"/lists/checklists", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"uP4uSZ3m9U_bDloeUpDcYw",route:"/lists/checklists"}]]},
    {key:"/lists/reference", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"f4NkhuA_PkGyRi7yZIx0Qg",route:"/lists/reference"}]]},
    {key:"/lists/reference/:id", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"f4NkhuA_PkGyRi7yZIx0Qg",route:"/lists/reference/:id"}]]},
    {key:"/lists/done", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"3Jrjgc86U0m6afkizxB2SA",route:"/lists/done"}]]},
    {key:"/lists/done/:id", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"3Jrjgc86U0m6afkizxB2SA",route:"/lists/done/:id"}]]},
    {key:"/lists/trash", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"pSzvcNe3T0q5fwcB2kDUtQ",route:"/lists/trash"}]]},
    {key:"/lists/trash/:id", value:[[8],[{_id:"ZABTfpmKh0KSbeN7QwKd3Q",route:"/lists"},{_id:"pSzvcNe3T0q5fwcB2kDUtQ",route:"/lists/trash/:id"}]]},
    {key:"/contexts", value:[[9],[{_id:"TuVm9HPakUeoCI2e7XLXPA",route:"/contexts"}]]},
    {key:"/contexts/roles", value:[[9],[{_id:"TuVm9HPakUeoCI2e7XLXPA",route:"/contexts"},{_id:"RFhgTTkk0Ey3kg_xSpwD8w",route:"/contexts/roles"}]]},
    {key:"/contexts/contexts", value:[[9],[{_id:"TuVm9HPakUeoCI2e7XLXPA",route:"/contexts"},{_id:"QXFQzrUDCUC_kfWP9zSPDg",route:"/contexts/contexts"}]]},
    {key:"/contexts/flags", value:[[9],[{_id:"TuVm9HPakUeoCI2e7XLXPA",route:"/contexts"},{_id:"0w0JGgMyX0e0YWm583VwOQ",route:"/contexts/flags"}]]},
    {key:"/contexts/delegates", value:[[9],[{_id:"TuVm9HPakUeoCI2e7XLXPA",route:"/contexts"},{_id:"QcRkScJUWkesxZ3Wn-ZT_Q",route:"/contexts/delegates"}]]},
    {key:"/settings", value:[[10],[{_id:"lMsxrLlF2Eq6PHgxX2_jkw",route:"/settings"}]]},
    {key:"/settings/profile", value:[[10],[{_id:"lMsxrLlF2Eq6PHgxX2_jkw",route:"/settings"},{_id:"H-IuJIo9Vkif4JZRKqUd-Q",route:"/settings/profile"}]]},
    {key:"/settings/general", value:[[10],[{_id:"lMsxrLlF2Eq6PHgxX2_jkw",route:"/settings"},{_id:"XcWlwKAXUUS-R-GHN6Ugfg",route:"/settings/general"}]]}
];

Meteor.startup(function () {
    //Prep test menu items
    RouteStateData.remove({});
    _.each(routestate, function(item) {
        RouteStateData.insert(item);
    });
});