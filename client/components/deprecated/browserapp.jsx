const data = [
    {name: 'Animal', children: [
        {name: 'Land', children: [
            {name: 'Cheetah'},
            {name: 'Ant'},
        ]},
        {name: 'Air', children: [
            {name: 'Eagle'},
        ]},
        {name: 'Water', children: [
            {name: 'Nessy'},
        ]},
    ]},
    {name: 'Vegetable', children: [
        {name: 'Broccoli'},
        {name: 'IE6'},
    ]},
    {name: 'Mineral', children: [
        {name: 'Granite'},
        {name: 'Uraninite'},
    ]},
];

BrowserApp = React.createClass({
    render() {
        return (
            <div>
                <Browser items={data} />
            </div>
        );
    }

});