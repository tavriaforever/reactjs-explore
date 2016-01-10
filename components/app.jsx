import React from 'react';
import ReactDOM from 'react-dom';
import GMaps from 'gmaps';
import Search from './search.jsx';
import Map from './map.jsx';

const App = React.createClass({
    getInitialState() {
        let favorites = [];
        let localstorage = window.localStorage;

        // If we save favorites before, get from localstorage
        if(localstorage && localStorage.favorites) {
            favorites = JSON.parse(localStorage.favorites);
        }

        return {
            favorites,
            currentAddress: 'Moscow, Russia',
            mapCoordinates: {
                lat: 55.751244,
                lng: 37.618423
            }
        }
    },

    _searchForAddress(address) {
        GMaps.geocode({ // GMaps in window object
            address,
            callback: (results, status) => {

                if (status !== 'OK') return;

                console.log('results', results);

                const location = results[0].geometry.location;

                this.setState({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: location.lat(),
                        lng: location.lng()
                    }
                });

            }
        });
    },

    render() {
        return <div>
            <h1>Your Locations</h1>
            <Search onSearch={this._searchForAddress} />
            <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
        </div>;
    }
});

export default App;
