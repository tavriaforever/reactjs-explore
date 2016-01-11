import React from 'react';
import GMaps from 'gmaps';

export default React.createClass({
    componentDidMount() {
        this.componentDidUpdate();
    },

    componentDidUpdate() {
        let map = new GMaps({
            el: '#map',
            zoom: 12,
            lat: this.props.lat,
            lng: this.props.lng
        });

        map.addMarker({
            lat: this.props.lat,
            lng: this.props.lng
        });
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.lat !== nextProps.lat || this.props.lng !== nextProps.lng;
    },

    render() {
        return <div className="map-holder">
            <p>Loading...</p>
            <div id="map"></div>
        </div>;
    }
});
