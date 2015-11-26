CollapseCardSubtitle = React.createClass({
    render: function () {
        return (
            <div>
                <h4 className="collapse-card__subtitle">
                    {this.props.title}
                </h4>
            </div>
        );
    }
});