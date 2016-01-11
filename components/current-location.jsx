import React from 'react';

export default React.createClass({
    toggleFavorite() {
        this.props.onFavoriteToggle(this.props.address);
    },

    render() {
        let starClassName = 'glyphicon ' + (this.props.favorite ? 'glyphicon-star' : 'glyphicon-star-empty');

        return <div className="col-xs-12 col-md-6 col-md-offset-3 current-location">
            <h4 id="save-location">{this.props.address}</h4>
            <span className={starClassName} onClick={this.toggleFavorite} aria-hidden="true" />
        </div>;
    }
});
