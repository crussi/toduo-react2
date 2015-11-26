ChildButton = React.createClass({
    render: function(){
        var iconClass = classnames('mfb-component__child-icon', this.props.icon);
        var className = classnames('mfb-component__button--child', this.props.className);
        return (
            <li>
                <a href={this.props.href}
                   data-mfb-label={this.props.label}
                   onClick={this.props.onClick}
                   className={className}>
                    <i className={iconClass}></i>
                </a>
            </li>
        );
    }
});

MainButton = React.createClass({
    getDefaultProps: function(){
        return {
            href: '#',
            onClick: function(){},
            iconResting: '',
            iconActive: '',
            label: null
        };
    },
    render: function(){
        var iconResting = classnames('mfb-component__main-icon--resting', this.props.iconResting);
        var iconActive = classnames('mfb-component__main-icon--active', this.props.iconActive);
        var mainClass = classnames('mfb-component__button--main', this.props.className);
        if(this.props.label){
            return (
                <a href={this.props.href} className={mainClass} onClick={this.props.onClick} data-mfb-label={this.props.label}>
                    <i className={iconResting}></i>
                    <i className={iconActive}></i>
                </a>
            );
        } else {
            return (
                <a href={this.props.href} className={mainClass} onClick={this.props.onClick}>
                    <i className={iconResting}></i>
                    <i className={iconActive}></i>
                </a>
            );
        }
    }
});

