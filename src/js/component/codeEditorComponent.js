/*

 The MIT License (MIT)

 Copyright (c) 2014 James Hrisho

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

*/

var ace = require('brace'),
    React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionConstants = require('./../constants/actionConstants');

module.exports = React.createClass({

    /**
     * @type {String}
     */
    appDispatcherHandle: null,

    /**
     * @type {String}
     */
    displayName: 'ReactAce',

    /**
     * Props validation for dev environment
     */
    propTypes: {
        mode: React.PropTypes.string,
        theme: React.PropTypes.string,
        name: React.PropTypes.string,
        className: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        showGutter: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onCopy: React.PropTypes.func,
        onPaste: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        value: React.PropTypes.string,
        onLoad: React.PropTypes.func,
        onBeforeLoad: React.PropTypes.func,
        maxLines: React.PropTypes.number,
        readOnly: React.PropTypes.bool,
        highlightActiveLine: React.PropTypes.bool,
        tabSize: React.PropTypes.number,
        showPrintMargin: React.PropTypes.bool,
        cursorStart: React.PropTypes.number,
        editorProps: React.PropTypes.object
    },

    /**
     * @returns {Object}
     */
    getDefaultProps: function () {
        return {
            name: 'brace-editor',
            mode: '',
            theme: '',
            height: '500px',
            width: '500px',
            value: '',
            fontSize: 12,
            showGutter: true,
            onChange: null,
            onPaste: null,
            onLoad: null,
            maxLines: null,
            readOnly: false,
            highlightActiveLine: true,
            showPrintMargin: true,
            tabSize: 4,
            cursorStart: 1,
            editorProps: {}
        };
    },

    onChange: function () {
        var value = this.editor.getValue();
        if (this.props.onChange && !this.silent) {
            this.props.onChange(value);
        }
    },

    onFocus: function () {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    },

    onBlur: function () {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    },

    onCopy: function (text) {
        if (this.props.onCopy) {
            this.props.onCopy(text);
        }
    },

    onPaste: function (text) {
        if (this.props.onPaste) {
            this.props.onPaste(text);
        }
    },

    componentDidMount: function () {
        this.editor = ace.edit(this.props.name);
        if (this.props.onBeforeLoad) {
            this.props.onBeforeLoad(ace);
        }

        var editorProps = Object.keys(this.props.editorProps);
        for (var i = 0; i < editorProps.length; i++) {
            this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
        }

        this.editor.getSession().setMode('ace/mode/' + this.props.mode);
        this.editor.setTheme('ace/theme/' + this.props.theme);
        this.editor.setFontSize(this.props.fontSize);
        this.editor.setValue(this.props.value, this.props.cursorStart);
        this.editor.renderer.setShowGutter(this.props.showGutter);
        this.editor.setOption('maxLines', this.props.maxLines);
        this.editor.setOption('readOnly', this.props.readOnly);
        this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
        this.editor.setOption('tabSize', this.props.tabSize);
        this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
        this.editor.on('focus', this.onFocus);
        this.editor.on('blur', this.onBlur);
        this.editor.on('copy', this.onCopy);
        this.editor.on('paste', this.onPaste);
        this.editor.on('change', this.onChange);

        if (this.props.onLoad) {
            this.props.onLoad(this.editor);
        }

        this.appDispatcherHandle = appDispatcher.register(this.onActionDispatched);
    },

    componentWillUnmount: function () {
        this.editor = null;

        appDispatcher.unregister(this.appDispatcherHandle);
    },

    /**
     * @param {Object} action
     */
    onActionDispatched: function (action) {
        switch (action.type) {
            case actionConstants.FOCUS_CURRENT_EDITOR:
                this.handleFocusCurrentEditorAction();
                break;

            case actionConstants.LEAVE_CURRENT_EDITOR:
                this.handleLeaveCurrentEditorAction();
                break;

            default:
                // do nothing as this action is not relevant for ths component
                break;
        }
    },

    handleLeaveCurrentEditorAction: function () {
        if (this.props.isCurrent !== true) {
            return;
        }

        this.leaveEditor();
    },

    leaveEditor: function () {
        if (this.editor === null) {
            return;
        }

        this.editor.blur();
    },

    handleFocusCurrentEditorAction: function () {
        if (this.props.isCurrent !== true) {
            return;
        }

        this.setFocusToEditor();
    },

    setFocusToEditor: function () {
        if (this.editor === null) {
            return;
        }

        this.editor.focus();
    },

    componentWillReceiveProps: function (nextProps) {
        this.editor = ace.edit(nextProps.name);
        this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
        this.editor.setTheme('ace/theme/' + nextProps.theme);
        this.editor.setFontSize(nextProps.fontSize);
        this.editor.setOption('maxLines', nextProps.maxLines);
        this.editor.setOption('readOnly', nextProps.readOnly);
        this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
        this.editor.setOption('tabSize', nextProps.tabSize);
        this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
        if (this.editor.getValue() !== nextProps.value) {
            // editor.setValue is a synchronous function call, change event is emitted before setValue return.
            this.silent = true;
            this.editor.setValue(nextProps.value, nextProps.cursorStart);
            this.silent = false;
        }
        this.editor.renderer.setShowGutter(nextProps.showGutter);
        if (nextProps.onLoad) {
            nextProps.onLoad(this.editor);
        }
        this.editor.getSession().setUseWrapMode(true);
    },

    render: function () {
        var divStyle = {
            width: this.props.width,
            height: this.props.height
        };
        var className = this.props.className;
        return (
            <div id={this.props.name}
                 className={className}
                 style={divStyle}>
            </div>
        );
    }
});
