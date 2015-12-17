var menudata = [
    {
        _id: "FDDp1ru10UCxl2Xnv2NT2Q",
        name: "Inbox",
        icon: "inbox",
        color: "blue",
        route: "/inbox",
        primarySort: 0
    },
    {
        _id: "I10ifHO0PEGrSxI_nNi-ag",
        name: "Next",
        icon: "check-square",
        color: "green",
        route: "/next",
        primarySort:1,
        children: [
            {
                _id: "bFolGPm9ikShWzx76mq0GQ",
                name: "Today",
                icon: "calendar",
                color: "green",
                route: "/next/today",
                secondarySort:0,
            },
            {
                _id: "_dy3uCTWF0qsWqELiinqFg",
                name: "This Week",
                icon: "calendar-note",
                color: "green",
                route: "/next/thisweek",
                secondarySort:1,
            },
            {
                _id: "w7mtxGN6Vkycw0pzuc7nHw",
                name: "Soon",
                icon: "calendar-check",
                color: "green",
                route: "/next/soon",
                secondarySort:2,
            }
        ]
    },
    {
        _id: "fFrT8jnMA0W0iqLa8iLeNw",
        name: "Focus",
        icon: "star",
        color: "red",
        route: "/focus",
        primarySort:2,
    },
    {
        _id: "qvyAi6BwzUefiROWuco38g",
        name: "Waiting for",
        icon: "account-box",
        color: "orange",
        route: "/waitingfor",
        primarySort:3,
    },
    {
        _id: "ELm2BGNyHkCGsEzL5hp_JQ",
        name: "Scheduled",
        icon: "time",
        color: "cyan",
        route: "/scheduled",
        primarySort:4,
        children: [
            {
                _id: "kvIGBCUWZkuzp86JaHye4A",
                name: "Calendar",
                icon: "calendar",
                color: "cyan",
                route: "/scheduled/calendar",
                secondarySort:0,
            },
            {
                _id: "XueTfO9q9EuzgzsMcjI1oA",
                name: "Reminders",
                icon: "notifications",
                color: "cyan",
                route: "/scheduled/reminders",
                secondarySort:1,
            }
        ]
    },
    {
        _id: "Jldp4JOaD0Oa3W1eOe17ug",
        name: "Someday",
        icon: "pause",
        color: "purple",
        route: "/someday",
        primarySort:5,
    },
    {
        _id: "UeWFiTObrEGrl88O9woGtA",
        name: "Projects",
        icon: "assignment-o",
        color: "pink",
        route: "/project",
        primarySort:6,
        children: [
            {
                _id: "7EHOtAYARkG0c43qsDH5cQ",
                name: "Project 1",
                icon: "assignment",
                color: "pink",
                route: "/project/7EHOtAYARkG0c43qsDH5cQ",
                secondarySort:0,
            },
            {
                _id: "0dCP51BWpEuPWDLiWVKQOQ",
                name: "Project 2",
                icon: "assignment",
                color: "pink",
                route: "/project/0dCP51BWpEuPWDLiWVKQOQ",
                secondarySort:1,
            },
            {
                _id: "C_xUMSgdpEuS4Yt1XlO-XQ",
                name: "Project 3",
                icon: "assignment",
                color: "pink",
                route: "/project/C_xUMSgdpEuS4Yt1XlO-XQ",
                secondarySort:2,
            }
        ]
    },
    {
        _id: "IsYuh58UnkyUYZKU0TcGXw",
        name: "Review",
        icon: "local-cafe",
        color: "brown",
        route: "/review",
        primarySort:7,
    },
    {
        _id: "ZABTfpmKh0KSbeN7QwKd3Q",
        name: "Lists",
        icon: "view-list-alt",
        color: "deep-purple",
        route: "/lists",
        primarySort:8,
        children: [
            {
                _id: "uP4uSZ3m9U_bDloeUpDcYw",
                name: "Checklists",
                icon: "view-list-alt",
                color: "deep-purple",
                route: "/lists/checklists",
                secondarySort:0,
            },
            {
                _id: "f4NkhuA_PkGyRi7yZIx0Qg",
                name: "Reference",
                icon: "book",
                color: "deep-purple",
                route: "/lists/reference",
                secondarySort:1,
            },
            {
                _id: "3Jrjgc86U0m6afkizxB2SA",
                name: "Done",
                icon: "archive",
                color: "deep-purple",
                route: "/lists/done",
                secondarySort:2,
            },
            {
                _id: "pSzvcNe3T0q5fwcB2kDUtQ",
                name: "Trash",
                icon: "delete",
                color: "deep-purple",
                route: "/lists/trash",
                secondarySort:3,
            }
        ]
    },
    {
        _id: "TuVm9HPakUeoCI2e7XLXPA",
        name: "Contexts",
        icon: "pin",
        color: "teal",
        route: "/contexts",
        primarySort:9,
        children: [
            {
                _id: "RFhgTTkk0Ey3kg_xSpwD8w",
                name: "Roles",
                icon: "local-offer",
                color: "teal",
                route: "/contexts/roles",
                secondarySort:0,
            },
            {
                _id: "QXFQzrUDCUC_kfWP9zSPDg",
                name: "Contexts ",
                icon: "pin",
                color: "teal",
                route: "/contexts/contexts",
                secondarySort:1,
            },
            {
                _id: "0w0JGgMyX0e0YWm583VwOQ",
                name: "Flags ",
                icon: "flag",
                color: "teal",
                route: "/contexts/flags",
                secondarySort:2,
            },
            {
                _id: "QcRkScJUWkesxZ3Wn-ZT_Q",
                name: "Delegates ",
                icon: "account-box",
                color: "teal",
                route: "/contexts/delegates"
            }
        ]
    },
    {
        _id: "lMsxrLlF2Eq6PHgxX2_jkw",
        name: "Settings",
        icon: "settings",
        color: "indigo",
        route: "/settings",
        primarySort:10,
        children: [
            {
                _id: "H-IuJIo9Vkif4JZRKqUd-Q",
                name: "Profile ",
                icon: "account-circle",
                color: "indigo",
                route: "/settings/profile",
                secondarySort:0,
            },
            {
                _id: "XcWlwKAXUUS-R-GHN6Ugfg",
                name: "General ",
                icon: "settings",
                color: "indigo",
                route: "/settings/general",
                secondarySort:1,
            }
        ]
    }

];
// if the menu data (database) is empty on server start, create some sample data.
Meteor.startup(function () {
    //Prep test menu items
    MenuData.remove({});
    _.each(menudata, function(item) {
        MenuData.insert(item);
    });
});