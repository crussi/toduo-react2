//'use strict';

//exports.__esModule = true;
//
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//
//function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
//
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//
//var _react = require('react');
//
//var _react2 = _interopRequireDefault(_react);
//
//var _utilsAddClass = require('./utils/addClass');

//var _utilsAddClass2 = _interopRequireDefault(_utilsAddClass);
function addClass(el, classNames) {
    if (el.classList) {
        return classNames.forEach(function (cl) {
            el.classList.add(cl);
        });
    }
    el.className += ' ' + classNames.join(' ');
}
//var _utilsRemoveClass = require('./utils/removeClass');
function removeClass(el, classNames) {
    if (el.classList) {
        return classNames.forEach(function (cl) {
            el.classList.remove(cl);
        });
    }
    el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ');
}
//var _utilsRemoveClass2 = _interopRequireDefault(_utilsRemoveClass);
//
//var _utilsAddStyleSheet = require('./utils/addStyleSheet');
//
//var _utilsAddStyleSheet2 = _interopRequireDefault(_utilsAddStyleSheet);
var stylesheetAdded = false;

function addStyleSheet(styles) {
    if (stylesheetAdded) return;
    stylesheetAdded = true;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.body.appendChild(style);
}
//var _utilsGetScrollbarWidth = require('./utils/getScrollbarWidth');
//
//var _utilsGetScrollbarWidth2 = _interopRequireDefault(_utilsGetScrollbarWidth);
function getScrollbarWidth(className) {
    var div = document.createElement('div');
    div.className = className;
    document.body.appendChild(div);
    var scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}
//var _utilsReturnFalse = require('./utils/returnFalse');

//var _utilsReturnFalse2 = _interopRequireDefault(_utilsReturnFalse);
function returnFalse() {
    return false;
}

var SCROLLBAR_WIDTH = false;

var classnames = {
    testScrollbar: 'react-custom-scrollbars-test-scrollbar',
    disableSelection: 'react-custom-scrollbars-disable-selection'
};

var stylesheet = ['.' + classnames.testScrollbar + ' {\n        width: 100px;\n        height: 100px;\n        position: absolute;\n        top: -9999px;\n        overflow: scroll;\n        -ms-overflow-style: scrollbar;\n    }', '.' + classnames.disableSelection + ' {\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n    }'].join('').replace(/(\s|\n)/g, '');

function getDefaultScrollbarHorizontal(_ref) {
    var style = _ref.style;

    var props = _objectWithoutProperties(_ref, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    });
    return React.createElement('div', _extends({ style: finalStyle }, props));
}

function getDefaultScrollbarVertical(_ref2) {
    var style = _ref2.style;

    var props = _objectWithoutProperties(_ref2, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    });
    return React.createElement('div', _extends({ style: finalStyle }, props));
}

function getDefaultThumbHorizontal(_ref3) {
    var style = _ref3.style;

    var props = _objectWithoutProperties(_ref3, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return React.createElement('div', _extends({ style: finalStyle }, props));
}

function getDefaultThumbVertical(_ref4) {
    var style = _ref4.style;

    var props = _objectWithoutProperties(_ref4, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return React.createElement('div', _extends({ style: finalStyle }, props));
}

function getDefaultView(_ref5) {
    var style = _ref5.style;

    var props = _objectWithoutProperties(_ref5, ['style']);

    var finalStyle = _extends({}, style);
    return React.createElement('div', _extends({ style: finalStyle }, props));
}
Scrollbars = React.createClass({
//exports['default'] = _react.createClass({

    //displayName: 'Scrollbars',

    propTypes: {
        scrollbarHorizontal: React.PropTypes.func,
        scrollbarVertical: React.PropTypes.func,
        thumbHorizontal: React.PropTypes.func,
        thumbVertical: React.PropTypes.func,
        view: React.PropTypes.func,
        onScroll: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            scrollbarHorizontal: getDefaultScrollbarHorizontal,
            scrollbarVertical: getDefaultScrollbarVertical,
            thumbHorizontal: getDefaultThumbHorizontal,
            thumbVertical: getDefaultThumbVertical,
            view: getDefaultView
        };
    },

    componentWillMount: function componentWillMount() {
        addStyleSheet(stylesheet);
        if (SCROLLBAR_WIDTH === false) {
            SCROLLBAR_WIDTH = getScrollbarWidth(classnames.testScrollbar);
        }
        this.needsUpdate = true;
    },

    getInitialState: function getInitialState() {
        return {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            heightPercentageInner: 100,
            widthPercentageInner: 100
        };
    },

    componentDidMount: function componentDidMount() {
        this.addListeners();
        this.update();
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
        this.needsUpdate = true;
    },

    componentDidUpdate: function componentDidUpdate() {
        this.update();
    },

    componentWillUnmount: function componentWillUnmount() {
        this.removeListeners();
    },

    addListeners: function addListeners() {
        this.refs.view.addEventListener('scroll', this.handleScroll);
        this.refs.barVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
        window.addEventListener('resize', this.handleWindowResize);
    },

    removeListeners: function removeListeners() {
        this.refs.view.removeEventListener('scroll', this.handleScroll);
        this.refs.barVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        this.refs.barHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        this.refs.thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        this.refs.thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
        window.removeEventListener('resize', this.handleWindowResize);
    },

    getPosition: function getPosition() {
        var $view = arguments.length <= 0 || arguments[0] === undefined ? this.refs.view : arguments[0];

        var scrollTop = $view.scrollTop;
        var scrollLeft = $view.scrollLeft;
        var scrollHeight = $view.scrollHeight;
        var scrollWidth = $view.scrollWidth;
        var clientHeight = $view.clientHeight;
        var clientWidth = $view.clientWidth;
        var y = scrollTop * 100 / clientHeight;
        var x = scrollLeft * 100 / clientWidth;
        return {
            x: x, y: y,
            scrollLeft: scrollLeft, scrollTop: scrollTop,
            scrollWidth: scrollWidth, scrollHeight: scrollHeight,
            clientWidth: clientWidth, clientHeight: clientHeight,
            left: scrollLeft / (scrollWidth - clientWidth) || 0,
            top: scrollTop / (scrollHeight - clientHeight) || 0
        };
    },

    getInnerSizePercentage: function getInnerSizePercentage() {
        var $view = arguments.length <= 0 || arguments[0] === undefined ? this.refs.view : arguments[0];

        return {
            widthPercentageInner: $view.clientWidth * 100 / $view.scrollWidth,
            heightPercentageInner: $view.clientHeight * 100 / $view.scrollHeight
        };
    },

    update: function update() {
        if (SCROLLBAR_WIDTH === 0) return;
        if (!this.needsUpdate) return;

        var sizeInnerPercentage = this.getInnerSizePercentage();

        var _getPosition = this.getPosition();

        var x = _getPosition.x;
        var y = _getPosition.y;

        this.needsUpdate = false;
        this.setState(_extends({}, sizeInnerPercentage, {
            x: x, y: y
        }));
    },

    handleScroll: function handleScroll(event) {
        var position = this.getPosition();
        var x = position.x;
        var y = position.y;

        var values = _objectWithoutProperties(position, ['x', 'y']);

        var onScroll = this.props.onScroll;

        if (onScroll) onScroll(event, values);
        this.setState({ x: x, y: y });
    },

    handleVerticalTrackMouseDown: function handleVerticalTrackMouseDown(event) {
        var $thumb = this.refs.thumbVertical;
        var $bar = this.refs.barVertical;
        var $view = this.refs.view;
        var offset = Math.abs(event.target.getBoundingClientRect().top - event.clientY);
        var thumbHalf = $thumb.offsetHeight / 2;
        var thumbPositionPercentage = (offset - thumbHalf) * 100 / $bar.offsetHeight;
        $view.scrollTop = thumbPositionPercentage * $view.scrollHeight / 100;
    },

    handleHorizontalTrackMouseDown: function handleHorizontalTrackMouseDown() {
        var $thumb = this.refs.thumbHorizontal;
        var $bar = this.refs.barHorizontal;
        var $view = this.refs.view;
        var offset = Math.abs(event.target.getBoundingClientRect().left - event.clientX);
        var thumbHalf = $thumb.offsetWidth / 2;
        var thumbPositionPercentage = (offset - thumbHalf) * 100 / $bar.offsetWidth;
        $view.scrollLeft = thumbPositionPercentage * $view.scrollWidth / 100;
    },

    handleVerticalThumbMouseDown: function handleVerticalThumbMouseDown(event) {
        this.dragStart(event);
        var currentTarget = event.currentTarget;
        var clientY = event.clientY;

        this.prevPageY = currentTarget.offsetHeight - (clientY - currentTarget.getBoundingClientRect().top);
    },

    handleHorizontalThumbMouseDown: function handleHorizontalThumbMouseDown(event) {
        this.dragStart(event);
        var currentTarget = event.currentTarget;
        var clientX = event.clientX;

        this.prevPageX = currentTarget.offsetWidth - (clientX - currentTarget.getBoundingClientRect().left);
    },

    handleDocumentMouseUp: function handleDocumentMouseUp() {
        this.dragEnd();
    },

    handleDocumentMouseMove: function handleDocumentMouseMove(event) {
        if (this.cursorDown === false) return void 0;

        if (this.prevPageY) {
            var $bar = this.refs.barVertical;
            var $thumb = this.refs.thumbVertical;
            var $view = this.refs.view;
            var offset = ($bar.getBoundingClientRect().top - event.clientY) * -1;
            var thumbClickPosition = $thumb.offsetHeight - this.prevPageY;
            var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / $bar.offsetHeight;
            $view.scrollTop = thumbPositionPercentage * $view.scrollHeight / 100;
            return void 0;
        }

        if (this.prevPageX) {
            var $bar = this.refs.barHorizontal;
            var $thumb = this.refs.thumbHorizontal;
            var $view = this.refs.view;
            var offset = ($bar.getBoundingClientRect().left - event.clientX) * -1;
            var thumbClickPosition = $thumb.offsetWidth - this.prevPageX;
            var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / $bar.offsetWidth;
            $view.scrollLeft = thumbPositionPercentage * $view.scrollWidth / 100;
            return void 0;
        }
    },

    handleWindowResize: function handleWindowResize() {
        this.needsUpdate = true;
        this.update();
    },

    dragStart: function dragStart(event) {
        event.stopImmediatePropagation();
        this.cursorDown = true;
        _utilsAddClass2['default'](document.body, [classnames.disableSelection]);
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = _utilsReturnFalse2['default'];
    },

    dragEnd: function dragEnd() {
        this.cursorDown = false;
        this.prevPageX = this.prevPageY = 0;
        removeClass(document.body, [classnames.disableSelection]);
        document.removeEventListener('mousemove', this.handleDocumentMouseMove);
        document.onselectstart = null;
    },

    render: function render() {
        var _state = this.state;
        var x = _state.x;
        var y = _state.y;
        var widthPercentageInner = _state.widthPercentageInner;
        var heightPercentageInner = _state.heightPercentageInner;
        var _props = this.props;
        var style = _props.style;
        var scrollbarHorizontal = _props.scrollbarHorizontal;
        var scrollbarVertical = _props.scrollbarVertical;
        var thumbHorizontal = _props.thumbHorizontal;
        var thumbVertical = _props.thumbVertical;
        var view = _props.view;
        var onScroll = _props.onScroll;
        var children = _props.children;

        var props = _objectWithoutProperties(_props, ['style', 'scrollbarHorizontal', 'scrollbarVertical', 'thumbHorizontal', 'thumbVertical', 'view', 'onScroll', 'children']);

        var thumbTranslateX = 'translateX(' + x + '%)';
        var thumbTranslateY = 'translateY(' + y + '%)';

        var containerStyle = _extends({
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%'
        }, style);

        var thumbStyle = {
            position: 'relative',
            display: 'block'
        };

        var thumbHorizontalStyle = _extends({}, thumbStyle, {
            height: '100%',
            width: widthPercentageInner < 100 ? widthPercentageInner + '%' : 0,
            MsTransform: thumbTranslateX,
            WebkitTransform: thumbTranslateX,
            transform: thumbTranslateX
        });

        var thumbVerticalStyle = _extends({}, thumbStyle, {
            width: '100%',
            height: heightPercentageInner < 100 ? heightPercentageInner + '%' : 0,
            MsTransform: thumbTranslateY,
            WebkitTransform: thumbTranslateY,
            transform: thumbTranslateY
        });

        var viewStyle = SCROLLBAR_WIDTH > 0 ? {
            position: 'absolute',
            top: 0,
            left: 0,
            right: -SCROLLBAR_WIDTH,
            bottom: -SCROLLBAR_WIDTH,
            overflow: 'scroll',
            WebkitOverflowScrolling: 'touch'
        } : {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            WebkitOverflowScrolling: 'touch'
        };

        var scrollbarStyle = {
            position: 'absolute',
            zIndex: 1
        };

        var scrollbarHorizontalStyle = _extends({}, scrollbarStyle, {
            height: widthPercentageInner < 100 ? 6 : 0
        });

        var scrollbarVerticalStyle = _extends({}, scrollbarStyle, {
            width: heightPercentageInner < 100 ? 6 : 0
        });

        return React.createElement(
            'div',
            _extends({}, props, { style: containerStyle }),
            React.cloneElement(scrollbarHorizontal({ style: scrollbarHorizontalStyle }), { ref: 'barHorizontal' }, React.cloneElement(thumbHorizontal({ style: thumbHorizontalStyle }), { ref: 'thumbHorizontal' })),
            React.cloneElement(scrollbarVertical({ style: scrollbarVerticalStyle }), { ref: 'barVertical' }, React.cloneElement(thumbVertical({ style: thumbVerticalStyle }), { ref: 'thumbVertical' })),
            React.cloneElement(view({ style: viewStyle }), { ref: 'view' }, children)
        );
    }
});
//module.exports = exports['default'];