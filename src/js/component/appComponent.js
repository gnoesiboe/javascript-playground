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

    slideStoreListenerReference: null,

    componentDidMount: function () {
        this.slideStoreListenerReference = slideStore.registerListener(this.onSlideStoreChange);

        this.initKeyboardEventListeners();
    },

    initKeyboardEventListeners: function () {
        mousetrap.bindGlobal('ctrl+r', this.onRunKeyboardShortcutEntered);
        mousetrap.bind('up', this.onMoveSelectionUpKeyboardShortcutSelected);
        mousetrap.bind('down', this.onMoveSelectionDownKeyboardShortcutSelected);
        mousetrap.bind('enter', this.onEnterSelectionKeyboardShortcutEntered);
    },

    /**
     * @param {Object} event
     */
    onEnterSelectionKeyboardShortcutEntered: function (event) {
        event.preventDefault();

        appDispatcher.dispatch(actionFactory.createFocusCurrentEditorAction());
    },

    componentWillUnmount: function () {
        slideStore.removeListener(this.slideStoreListenerReference);
        this.slideStoreListenerReference = null;

        this.removeKeyboardEventListeners();
    },

    removeKeyboardEventListeners: function () {
        mousetrap.unbind('ctrl+3');
    },

    /**
     * @param {Object} event
     */
    onMoveSelectionUpKeyboardShortcutSelected: function (event) {
        event.preventDefault();

        this.moveSelectionUp();
    },

    /**
     * @param {Object} event
     */
    onMoveSelectionDownKeyboardShortcutSelected: function (event) {
        event.preventDefault();

        this.moveSelectionDown();
    },

    moveSelectionUp: function () {
        var newSelectionIndex = this.state.currentSelectionIndex === 0 ? this.state.slides.length - 1 : this.state.currentSelectionIndex - 1;

        this.setState({
            currentSelectionIndex: newSelectionIndex
        });
    },

    moveSelectionDown: function () {
        var newSelectionIndex = this.state.currentSelectionIndex === (this.state.slides.length - 1) ? 0 : this.state.currentSelectionIndex + 1;

        this.setState({
            currentSelectionIndex: newSelectionIndex
        });
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
            slides: slideStore.getAll(),
            currentSelectionIndex: 0
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
                <SlideListComponent slides={this.state.slides}
                                    currentSelectionIndex={this.state.currentSelectionIndex} />
            </div>
        );
    }
});
