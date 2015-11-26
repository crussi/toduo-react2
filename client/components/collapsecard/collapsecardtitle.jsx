CollapseCardTitle = React.createClass({
    render: function () {
        return (
            <div>
                <h3 className="collapse-card__title">
                    {this.props.title}
                </h3>
            </div>
        );
    }
});