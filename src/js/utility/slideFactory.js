var _ = require('underscore'),
    idGenerator = require('./idGenerator');

/**
 * @type {Object}
 *
 * @private
 */
var _blueprint = {
    id: null,
    contents: ''
};

var _extractTitleFromFile = function (file) {
    var fileName = file.name;

    // split up snake-case to title and remote number in front
    var title = fileName
        .split('_')
        .slice(1)
        .join(' ');

    // uppercase first letter
    return title.charAt(0).toUpperCase() + title.slice(1);
};

module.exports = {

    /**
     * @param {File} file
     * @param {String} contents
     */
    createFromFile: function (file, contents) {
        return _.extend({}, _blueprint, {
            id: idGenerator.generateId(),
            title: _extractTitleFromFile(file),
            contents: contents
        });
    }
};
