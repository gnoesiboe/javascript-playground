var React = require('react'),
    SlideComponent = require('./slideComponent');

module.exports = React.createClass({

    /**
     * Renders this component into it's container
     *
     * @returns {XML}
     */
    render: function () {
        var slides = [];

        for (var i = 0, l = this.props.slides.length; i < l; i++) {
            var slide = this.props.slides[i];

            slides.push(
                <li key={slide.id} className="list-group-item">
                    <SlideComponent slide={slide} />
                </li>
            );
        }

        return (
            <ul className="list-group">
                {slides}
            </ul>
        );
    }
});
