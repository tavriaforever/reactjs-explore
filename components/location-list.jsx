import React from 'react';
import LocationItem from './location-item.jsx';

export default React.createClass({
    getInitialProps() {
        return { locations: new Map() };
    },

    render() {
        let locations = this.props.locations;
        let list = [];

        for (let location of locations.values()) {
            let isActive = this.props.activeLocationAddress === location.address;

            list.push(
                <LocationItem
                    key={Math.random()}
                    active={isActive}
                    address={location.address}
                    timestamp={location.timestamp}
                    onClick={this.props.onClick}
                />
            );
        }

        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <span className="list-group-item active">Saved Locations</span>
                {list}
            </div>
        );
    }
});
