var React = require('react'),
    ImportFilesFormComponent = require('./importFilesFormComponent'),
    SlideListComponent = require('./slideListComponent'),
    slideStore = require('./../store/slideStore'),
    mousetrap = require('mousetrap'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory');

// plugin for mousetrap that allows global binding of key strokes (including inside textarea's and -inputs)
require('./../../../node_modules/mousetrap/plugins/global-bind/mousetrap-global-bind');

module.exports = React.createClass({

    componentDidMount: function () {
        slideStore.registerListener(this.onSlideStoreChange);

        mousetrap.bindGlobal('ctrl+r', this.onRunKeyboardShortcutEntered);
    },

    componentWillUnmount: function () {
        mousetrap.unbind('ctrl+3');
    },

    /**
     * @param {Object} event
     */
    onRunKeyboardShortcutEntered: function (event) {
        event.preventDefault();

        appDispatcher.dispatch(actionFactory.createRunCurrentSlideAction());
    },

    onSlideStoreChange: function () {
        this.setState(this.getDefaultState());
    },

    /**
     * @returns {Object}
     */
    getInitialState: function () {
        return this.getDefaultState();
    },

    /**
     * @returns {Object}
     */
    getDefaultState: function () {
        return {
            slides: slideStore.getAll()
        }
    },

    /**
     * Renders this component into it's container
     *
     * @returns {XML}
     */
    render: function () {
        return (
            <div>
                <ImportFilesFormComponent />
                <SlideListComponent slides={this.state.slides} />
            </div>
        );
    }
});
