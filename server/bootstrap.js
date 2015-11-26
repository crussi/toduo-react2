// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
    //Prep test inbox items
    Inbox.remove({});
    if (Inbox.find().count() === 0) {
        var timestamp = (new Date()).getTime();
        var today = new Date(timestamp);
        var d01 = new Date();
        var d02 = new Date();
        var d03 = new Date();
        var d04 = new Date();
        var d05 = new Date();
        var d06 = new Date();
        var d07 = new Date();
        var d08 = new Date();
        var d09 = new Date();
        var d10 = new Date();
        d01.setDate(today.getDate() - 0);
        d02.setDate(today.getDate() - 0);
        d03.setDate(today.getDate() - 1);
        d04.setDate(today.getDate() - 2);
        d05.setDate(today.getDate() - 2);
        d06.setDate(today.getDate() - 3);
        d07.setDate(today.getDate() - 10);
        d08.setDate(today.getDate() - 15);
        d09.setDate(today.getDate() - 100);
        d10.setDate(today.getDate() - 365);

        var data = [
            {
                description: "Learn Meteor principles",
                dateCreated: d01
            },
            {
                description: "Remember the milk",
                dateCreated: d02
            },
            {
                description: "Think positive",
                dateCreated: d03
            },
            {
                description: "Get the mail",
                dateCreated: d04
            },
            {
                description: "Work on the bills",
                dateCreated: d05
            },
            {
                description: "Get BofA CC into Mint.com",
                dateCreated: d06
            },
            {
                description: "Reduce size of Gmail storage",
                dateCreated: d07
            },
            {
                description: "Look into swimming lessons at Aquatic center",
                dateCreated: d08
            },
            {
                description: "Balcony doors don't lock",
                dateCreated: d09
            },
            {
                description: "Volvo is due for maintenance",
                dateCreated: d10
            },

        ];

        _.each(data, function(item) {
            var list_id = Inbox.insert({description: item.description, dateCreated: item.dateCreated, 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w'
            });
        });


    }

    //Prep test inbox items
    Roles.remove({});
    if (Roles.find().count() === 0) {
        Roles.insert({_id: 'YqemTo5AUkyh7zRhp9-jOw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w', Name:'Husband', sortOrder: 0});
        Roles.insert({_id: 'Np28EenPa0qX3__yXAYh0g', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Dad', sortOrder: 1});
        Roles.insert({_id: '7XG4yeIB4UO_Lxiv_iDxJg', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Extra mile', sortOrder: 2});
        Roles.insert({_id: 'mYm4O1o0Y0aoMmLpCiKv8Q', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Self', sortOrder: 3});
        Roles.insert({_id: 'CqrxU3mdiEOPoj88GD49fw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Friend', sortOrder: 4});
        Roles.insert({_id: 'iN5ENKIay0uS6C8aIOnFdw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Finance Guy', sortOrder: 5});
        Roles.insert({_id: 'qnt7q8RsTkanDHUZ_scmhQ', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Maint + Org', sortOrder: 6});
    }

    Flags.remove({});
    if (Flags.find().count() === 0) {
        Flags.insert({_id: 'acumiJsZAE_sBnnsHTtqyg', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w', Name:'Priority'});
        Flags.insert({_id: 'VROqGOpyIEiTujz4-lAq9A', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Work'});
        Flags.insert({_id: 'pQcciR8PqE6d1bYqINJKmQ', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Vacation'});
        Flags.insert({_id: 'BhB7wqvY_k6I7nTVA7kLeQ', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Urgent'});
    }

    Contexts.remove({});
    if (Contexts.find().count() === 0) {
        Contexts.insert({_id: 'VKk7f5-Q2k2P0ENPACo2aA', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w', Name:'At Work'});
        Contexts.insert({_id: 'Xt9dBGPO9Em0JABFN0E7tw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Online'});
        Contexts.insert({_id: '439xlfFRskqc32BMBjujIw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Grocery Store'});
        Contexts.insert({_id: '1cI9Xb8g7UGf0mVVIs-BJw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Making Calls'});
        Contexts.insert({_id: 'TRRBZFhlp0GNwF8J5FoOGw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Errands'});
        Contexts.insert({_id: 'coGjsF9_o0_k5Sc3j9RLUQ', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Weekend'});
    }
    Contacts.remove({});
    if (Contacts.find().count() === 0) {
        Contacts.insert({_id: 'VKk7f5-Q2k2P0ENPACo2aA', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w', Name:'Butterfly'});
        Contacts.insert({_id: 'Xt9dBGPO9Em0JABFN0E7tw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Marianne'});
        Contacts.insert({_id: '439xlfFRskqc32BMBjujIw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Bright Rite Carpet Cleaner'});
        Contacts.insert({_id: '1cI9Xb8g7UGf0mVVIs-BJw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Jose Gardener'});
        Contacts.insert({_id: 'TRRBZFhlp0GNwF8J5FoOGw', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'AHS'});
        Contacts.insert({_id: 'coGjsF9_o0_k5Sc3j9RLUQ', 'AccountId': 'jADe-P9Nzke_Tkio1IVnRw', 'UserId': 'g94HOmCDVkiKEl0NyuBc8w' , Name:'Plumber'});
    }
});


