/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const Swipeable = require('react-swipeable');
const {Glyphicon} = require('react-bootstrap');
const Message = require('../../MapStore2Components/components/I18N/Message');
const {setCurrentTask} = require("../actions/task");
require('./style/SideBar.css');

class SideBar extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        extraClasses: PropTypes.string,
        currentTask: PropTypes.object,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        width: PropTypes.string,
        setCurrentTask: PropTypes.func,
        title: PropTypes.string,
        icon: PropTypes.string,
        extraTitlebarContent: PropTypes.object
    }
    static defaultProps = {
        extraClasses: '',
        onShow: (mode) => {},
        onHide: () => {},
        width: '15em',
        minWidth: '15em'
    }
    componentWillReceiveProps(newProps) {
        let newVisible = newProps.currentTask && newProps.currentTask.id === newProps.id;
        let oldVisible = this.props.currentTask && this.props.currentTask.id === this.props.id;
        if(newVisible && (!oldVisible || newProps.currentTask.mode !== this.props.currentTask.mode)) {
            newProps.onShow(newProps.currentTask.mode);
        } else if(!newVisible && oldVisible) {
            newProps.onHide();
        }
    }
    closeClicked = () => {
        if(this.props.currentTask.id === this.props.id) {
            this.props.setCurrentTask(null);
        }
    }
    renderRole = (role) => {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role);
    }
    render() {
        let visible = this.props.currentTask.id === this.props.id;
        let style = {
            width: this.props.width,
            minWidth: this.props.minWidth,
            right: 0,
            transform: visible ? '' : 'translateX(100%) translateX(8px)',
            zIndex: visible ? 5 : 4
        }
        return (
            <Swipeable onSwipedRight={this.closeClicked} delta={30}>
                <div id={this.props.id} className={"sidebar" + " " + this.props.extraClasses} style={style}>
                    <div className="sidebar-titlebar">
                        <img className="sidebar-titlebar-icon" src={this.props.icon}/>
                        <span className="sidebar-titlebar-title"><Message msgId={this.props.title} /></span>
                        {this.props.extraTitlebarContent}
                        <span className="sidebar-titlebar-spacer" />
                        <Glyphicon className="sidebar-titlebar-closeicon" onClick={this.closeClicked} glyph="chevron-right"/>
                    </div>
                    <div className="sidebar-body">
                        {this.renderRole("body")}
                    </div>
                </div>
            </Swipeable>
        );
    }
};

const selector = (state) => ({
    currentTask: state.task
});

module.exports = {
    SideBar: connect(selector, {
        setCurrentTask: setCurrentTask,
    })(SideBar)
}
