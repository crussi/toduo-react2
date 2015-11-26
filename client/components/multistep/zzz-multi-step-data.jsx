//Note: this file was named zzz-... because this needs to load last after all
//jsx components
const StartStep = {
    "component" : MultiStep,
    "icon" : ""
}

const ActionableStep = {
    "component" :  Actionable,
    "icon" : "run"
}
const IsProjectStep = {
    "component" : IsProject,
    "icon" : "assignment"
}
const NonActionableStep = {
    "component" : NonActionableForm,
    "icon" : "traffic"
}
const ApproveChangeStep = {
    "component" : ApproveChange,
    "icon" : "thumb-up"
}
const InboxTransitionStep = {
    "component" : InboxTransition,
    "icon" : "thumb-up"
}
const ProjectPlanStep = {
    "component" : ProjectPlan,
    "icon" : "assignment-o"
}
const NextActionStep = {
    "component" : NextAction,
    "icon" : "playlist-plus"
}
const IsDoableNowStep = {
    "component" : IsDoableNow,
    "icon" : "timer"
}
const DoItNowStep = {
    "component" : DoItNow,
    "icon" : "check-square"
}
const IsDelegatableStep = {
    "component" : IsDelegatable,
    "icon" : "account-add"
}
const DelegateStep = {
    "component" : Delegate,
    "icon" : "account-box"
}
const IsSchedulableStep = {
    "component" : IsSchedulable,
    "icon" : "time"
}
const ScheduleStep = {
    "component" : Schedule,
    "icon" : "calendar"
}
const RefineActionStep = {
    "component" : RefineAction,
    "icon" : "rotate-right"
}


nextstep = {
    "MultiStep.Expand" : {
        "currentstep" : StartStep,
        "nextstep" : ActionableStep,
        "nextsteplevel" : 1,
        "mintotalsteps" : 3,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.00,
        "minpctdone" : 0.00,
        "avgpctdone" : 0.00
    },
    "Actionable.Yes" : {
        "currentstep" : ActionableStep,
        "nextstep" : IsProjectStep,
        "nextsteplevel" : 2,
        "mintotalsteps" : 4,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.50,
        "minpctdone" : 0.25,
        "avgpctdone" : 0.38
    },
    "Actionable.No" : {
        "currentstep" : ActionableStep,
        "nextstep" : NonActionableStep,
        "nextsteplevel" : 2,
        "mintotalsteps" : 3,
        "maxtotalsteps" : 3,
        "maxpctdone" : 0.67,
        "minpctdone" : 0.67,
        "avgpctdone" : 0.67
    },
    "NonActionable.Trash" : {
        "currentstep" : NonActionableStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 3,
        "mintotalsteps" : 3,
        "maxtotalsteps" : 3,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "NonActionable.Someday" : {
        "currentstep" : NonActionableStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 3,
        "mintotalsteps" : 3,
        "maxtotalsteps" : 3,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "NonActionable.Reference" : {
        "currentstep" : NonActionableStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 3,
        "mintotalsteps" : 3,
        "maxtotalsteps" : 3,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "IsProject.Yes" : {
        "currentstep" : IsProjectStep,
        "nextstep" : ProjectPlanStep,
        "nextsteplevel" : 3,
        "mintotalsteps" : 4,
        "maxtotalsteps" : 4,
        "maxpctdone" : 0.75,
        "minpctdone" : 0.75,
        "avgpctdone" : 0.75
    },
    "IsProject.No" : {
        "currentstep" : IsProjectStep,
        "nextstep" : NextActionStep,
        "nextsteplevel" : 3,
        "mintotalsteps" : 6,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.50,
        "minpctdone" : 0.38,
        "avgpctdone" : 0.44
    },
    "ProjectPlan.Submit" : {
        "currentstep" : ProjectPlanStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 4,
        "mintotalsteps" : 4,
        "maxtotalsteps" : 4,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "NextAction.Submit" : {
        "currentstep" : NextActionStep,
        "nextstep" : IsDoableNowStep,
        "nextsteplevel" : 4,
        "mintotalsteps" : 6,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.67,
        "minpctdone" : 0.50,
        "avgpctdone" : 0.58
    },
    "IsDoableNow.Yes" : {
        "currentstep" : IsDoableNowStep,
        "nextstep" : DoItNowStep,
        "nextsteplevel" : 5,
        "mintotalsteps" : 6,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.83,
        "minpctdone" : 0.63,
        "avgpctdone" : 0.73
    },
    "IsDoableNow.No" : {
        "currentstep" : IsDoableNowStep,
        "nextstep" : IsDelegatableStep,
        "nextsteplevel" : 5,
        "mintotalsteps" : 7,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.71,
        "minpctdone" : 0.63,
        "avgpctdone" : 0.67
    },
    "DoItNow.Yes" : {
        "currentstep" : DoItNowStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 6,
        "mintotalsteps" : 6,
        "maxtotalsteps" : 6,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "DoItNow.No" : {
        "currentstep" : DoItNowStep,
        "nextstep" : IsDelegatableStep,
        "nextsteplevel" : 5,
        "mintotalsteps" : 7,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.71,
        "minpctdone" : 0.63,
        "avgpctdone" : 0.67
    },
    "IsDelegatable.Yes" : {
        "currentstep" : IsDelegatableStep,
        "nextstep" : DelegateStep,
        "nextsteplevel" : 6,
        "mintotalsteps" : 7,
        "maxtotalsteps" : 7,
        "maxpctdone" : 0.86,
        "minpctdone" : 0.86,
        "avgpctdone" : 0.86
    },
    "IsDelegatable.No" : {
        "currentstep" : IsDelegatableStep,
        "nextstep" : IsSchedulableStep,
        "nextsteplevel" : 6,
        "mintotalsteps" : 8,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.75,
        "minpctdone" : 0.75,
        "avgpctdone" : 0.75
    },
    "Delegate.Submit" : {
        "currentstep" : DelegateStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 7,
        "mintotalsteps" : 7,
        "maxtotalsteps" : 7,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "IsSchedulable.Yes" : {
        "currentstep" : IsSchedulableStep,
        "nextstep" : ScheduleStep,
        "nextsteplevel" : 7,
        "mintotalsteps" : 8,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.88,
        "minpctdone" : 0.88,
        "avgpctdone" : 0.88
    },
    "IsSchedulable.No" : {
        "currentstep" : IsSchedulableStep,
        "nextstep" : RefineActionStep,
        "nextsteplevel" : 7,
        "mintotalsteps" : 8,
        "maxtotalsteps" : 8,
        "maxpctdone" : 0.88,
        "minpctdone" : 0.88,
        "avgpctdone" : 0.88
    },
    "Schedule.Submit" : {
        "currentstep" : ScheduleStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 8,
        "mintotalsteps" : 8,
        "maxtotalsteps" : 8,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    },
    "RefineAction.Next" : {
        "currentstep" : RefineActionStep,
        "nextstep" : InboxTransitionStep,
        "nextsteplevel" : 8,
        "mintotalsteps" : 8,
        "maxtotalsteps" : 8,
        "maxpctdone" : 1.00,
        "minpctdone" : 1.00,
        "avgpctdone" : 1.00
    }


}

