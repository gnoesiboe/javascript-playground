var React = require('react'),
    CodeEditorComponent = require('./codeEditorComponent'),
    brace = require('brace'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionConstants = require('./../constants/actionConstants');

// theme and modus for ace editor
require('brace/mode/javascript');
require('brace/theme/tomorrow_night');

module.exports = React.createClass({

    /**
     * @type {String|null}
     */
    dispatcherId: null,

    componentDidMount: function () {
        this.dispatcherId = appDispatcher.register(this.onActionDispatched);
    },

    componentWillUnmount: function () {
        appDispatcher.unregister(this.dispatcherId);

        this.dispatcherId = null;
    },

    /**
     * @param {Object} action
     */
    onActionDispatched: function (action) {
        switch (action.type) {
            case actionConstants.RUN_CURRENT_SLIDE:
                this.handleRunCurrentSlideAction();
                break;

            default:
                // do nothing as this action is not relevant for ths component
                break;
        }
    },

    handleRunCurrentSlideAction: function () {
        if (this.state.focussed !== true) {
            return;
        }

        this.runContents();
    },

    /**
     * @returns {Object}
     */
    getInitialState: function () {
        var slide = this.props.slide;

        return {
            contents: slide.contents,
            focussed: false
        };
    },

    /**
     * @param {String} newCode
     */
    onCodeChange: function (newCode) {
        this.setState({
            contents: newCode
        });
    },

    /**
     * @param {String} event
     */
    onRunClick: function (event) {
        event.preventDefault();

        this.runContents();
    },

    runContents: function () {
        var contents = this.state.contents;

        console.clear();

        (function () {
            eval(contents);
        }.bind(window))();
    },

    /**
     * @param {String} newValue
     */
    onChange: function (newValue) {
        this.setState({
            contents: newValue
        });
    },

    onFocus: function () {
        this.setState({
            focussed: true
        });
    },

    onBlur: function () {
        this.setState({
            focussed: false
        });
    },

    /**
     * Renders this component into it's container
     *
     * @returns {XML}
     */
    render: function () {
        var slide = this.props.slide,
            name = 'editor_slide_' + slide.id;

        return (
            <div className="clearfix">
                <h3>{slide.title}</h3>
                <div className="margin-bottom-s">
                    <CodeEditorComponent mode="javascript"
                               theme="tomorrow_night"
                               tabSize={4}
                               width="100%"
                               onChange={this.onChange}
                               onFocus={this.onFocus}
                               onBlur={this.onBlur}
                               maxLines={Infinity}
                               isCurrent={this.props.isCurrent}
                               name={name}
                               value={this.state.contents}
                               editorProps={{$blockScrolling: true}} />
                </div>
                <button type="button" className="btn btn-success pull-right" onClick={this.onRunClick}>run</button>
            </div>
        );
    }
});
