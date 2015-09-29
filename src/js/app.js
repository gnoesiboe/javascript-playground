var React = require('react'),
    AppComponent = require('./component/appComponent');

window.onbeforeunload = function () {
    return 'Weet je zeker dat je wilt verversen? Eventuele geimporteerde code gaat dan verloren..';
};

React.render(
    <AppComponent />,
    document.getElementById('js-app-container')
);
