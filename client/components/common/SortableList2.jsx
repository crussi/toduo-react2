SortableList2 = React.createClass({
    mixins: [SortableMixin],

    getInitialState: function() {
        return {
            items: ['a', 'b','c','d','e','f','g','h','i']
        };
    },

    handleSort: function (/** Event */evt) { /*..*/ },

    render: function() {
        return <ul>{
            this.state.items.map(function (text) {
                return <li>{text}</li>
                })
            }</ul>
    }
});