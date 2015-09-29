var React = require('react'),
    actionFactory = require('./../utility/actionFactory'),
    appDispatcher = require('./../utility/appDispatcher');

module.exports = React.createClass({

    /**
     * @param {Object} event
     */
    onFileChange: function (event) {
        var action = actionFactory.createFilesUploadAction(event.target.files);

        appDispatcher.dispatch(action);
    },

    /**
     * Renders this component into it's container
     *
     * @returns {XML}
     */
    render: function () {
        return (
            <div className="row padding-top-s margin-bottom-s">
                <div className="col-xs-12">
                    <input type="file"
                           accept="application/javascript"
                           onChange={this.onFileChange}
                           className="form-control"
                           multiple />
                </div>
            </div>
        );
    }
});
