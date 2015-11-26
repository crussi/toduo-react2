CollapseCardHeading = React.createClass({
    handleClick(e) {
        e.preventDefault();
        //console.log('heading handleClick');
        this.props.headingClicked();
    },
    render: function () {
        return (
            <div className="collapse-card__heading" onClick={this.handleClick}>
                <div className="collapse-card__avatar">
                {this.props.avatar}
                </div>
                <CollapseCardTitle title={this.props.primaryText} />
                <CollapseCardSubtitle title={this.props.secondaryText} />
            </div>
        );
    }
});