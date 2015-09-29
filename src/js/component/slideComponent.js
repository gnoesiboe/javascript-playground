var React = require('react'),
    CodemirrorComponent = require('react-codemirror');

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
     * Renders this component into it's container
     *
     * @returns {XML}
     */
    render: function () {
        var slide = this.props.slide,
            options = {
                indentUnit: 4,
                indentWithTabs: false,
                lineNumbers: true,
                mode: 'javascript',
                lineWrapping: true,
                theme: 'lesser-dark'
            };

        return (
            <div className="clearfix">
                <h3>{slide.title}</h3>
                <div className="margin-bottom-s">
                    <CodemirrorComponent value={this.state.contents} onChange={this.onCodeChange} options={options} />
                </div>
                <button type="button" className="btn btn-success pull-right" onClick={this.onRunClick}>run</button>
            </div>
        );
    }
});
