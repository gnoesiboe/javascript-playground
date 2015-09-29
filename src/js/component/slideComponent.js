var React = require('react'),
    AceEditor = require('react-ace'),
    brace = require('brace');

require('brace/mode/javascript');
require('brace/theme/tomorrow_night');

module.exports = React.createClass({

    /**
     * @returns {Object}
     */
    getInitialState: function () {
        var slide = this.props.slide;

        return {
            contents: slide.contents
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
                    <AceEditor mode="javascript"
                               theme="tomorrow_night"
                               tabSize={4}
                               width="100%"
                               onChange={this.onChange}
                               maxLines={Infinity}
                               name={name}
                               value={this.state.contents}
                               editorProps={{$blockScrolling: true}} />
                </div>
                <button type="button" className="btn btn-success pull-right" onClick={this.onRunClick}>run</button>
            </div>
        );
    }
});
