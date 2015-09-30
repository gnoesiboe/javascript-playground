var _ = require('underscore'),
    actionConstants = require('./../constants/actionConstants');

/**
 * @type {Object}
 *
 * @private
 */
var _blueprint = {
    type: null
};

/**
 * @type {Object}
 */
var actionFactory = {

    /**
     * @param {FileList} files
     *
     * @returns {Object}
     */
    createFilesUploadAction: function (files) {
        return _.extend({}, _blueprint, {
            type: actionConstants.FILES_UPLOAD,
            files: files
        });
    },

    /**
     * @returns {Object}
     */
    createRunCurrentSlideAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.RUN_CURRENT_SLIDE
        });
    },

    /**
     * @returns {Object}
     */
    createFocusCurrentEditorAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.FOCUS_CURRENT_EDITOR
        });
    }
};

module.exports = actionFactory;
