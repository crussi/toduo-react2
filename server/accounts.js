
Accounts.onCreateUser(function(options, user) {
    console.log('Accounts.onCreateUser options next ...');
    console.dir(options);
    //console.dir(user);
    //var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    //user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    var userProperties = {
        InvitedBy: ''   ,
        AccountId: '0suaL5USzEu7aDMHvgKHpw'

    }
    if (options.profile) {
        user.profile = options.profile;
        user.profile = _.extend(user.profile, userProperties);
    }

    //var userProperties = {
    //    profile: options.profile || {},
    //    karma: 0,
    //    isInvited: false,
    //    postCount: 0,
    //    commentCount: 0,
    //    invitedCount: 0,
    //    votes: {
    //        upvotedPosts: [],
    //        downvotedPosts: [],
    //        upvotedComments: [],
    //        downvotedComments: []
    //    }
    //};
    //user = _.extend(user, userProperties);
console.dir(user);
    return user;
});