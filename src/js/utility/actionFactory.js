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
    createRunFocussedSlideAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.RUN_FOCUSSED_SLIDE
        });
    },

    /**
     * @returns {Object}
     */
    createFocusCurrentEditorAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.FOCUS_CURRENT_EDITOR
        });
    },

    /**
     * @returns {Object}
     */
    createLeaveCurrentEditorAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.LEAVE_CURRENT_EDITOR
        })
    }
};

module.exports = actionFactory;
