var React = require('react'),
    ImportFilesFormComponent = require('./importFilesFormComponent'),
    SlideListComponent = require('./slideListComponent'),
    slideStore = require('./../store/slideStore');

module.exports = React.createClass({

    componentDidMount: function () {
        slideStore.registerListener(this.onSlideStoreChange);
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
