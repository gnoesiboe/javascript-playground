var appDispatcher = require('./../utility/appDispatcher'),
    actionConstants = require('./../constants/actionConstants'),
    slideFactory = require('./../utility/slideFactory'),
    idGenerator = require('./../utility/idGenerator');

/**
 * @type {Array}
 *
 * @private
 */
var _slides = [];

/**
 * @type {Array}
 *
 * @private
 */
var _listeners = [];

/**
 * @param {Object} action
 *
 * @private
 */
var _handleFilesUploadAction = function (action) {
    for (var i = 0, l = action.files.length; i < l; i++) {
        _importFile(action.files[i]);
    }
};

/**
 * @param {File} file
 *
 * @private
 */
var _importFile = function (file) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var contents = event.target.result;

        _slides.push(slideFactory.createFromFile(file, contents));

        _emitChange();
    };

    reader.readAsText(file);
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleAction = function (action) {
    switch (action.type) {
        case actionConstants.FILES_UPLOAD:
            _handleFilesUploadAction(action);
            break;

        default:
            // do nothing as this action is not relevant for this store
            break;
    }
};

/**
 * @private
 */
var _emitChange = function () {
    for (var i = 0, l = _listeners.length; i < l; i++) {
        var callbackRegistration = _listeners[i];

        callbackRegistration.callback();
    }
};

appDispatcher.register(_handleAction);

module.exports = {

    /**
     * @returns {Array}
     */
    getAll: function () {
        return _slides;
    },

    /**
     * @param {Function} callback
     *
     * @returns {String}
     */
    registerListener: function (callback) {
        var id = idGenerator.generateId();

        _listeners.push({
            id: id,
            callback: callback
        });

        return id;
    },

    /**
     * @param {String} id
     *
     * @returns {Object}
     */
    removeListener: function (id) {
        var indexOfItemToRemove = null;

        for (var i = 0, l = _listeners.length; i < l; i++) {
            var _listener = _listener[i];

            if (_listener.id === id) {
                indexOfItemToRemove = i;

                break;
            }
        }

        if (indexOfItemToRemove === null) {
            return this;
        }

        _listeners = _listener.splice(indexOfItemToRemove, 1);

        return this;
    }
};
