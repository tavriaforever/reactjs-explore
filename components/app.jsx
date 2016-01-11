import React from 'react';
import GMaps from 'gmaps';
import Search from './search.jsx';
import Maps from './map.jsx';
import CurrentLocation from './current-location.jsx';
import LocationList from './location-list.jsx';

export default React.createClass({
    getInitialState() {
        let favorites = new Map();

        // If we save favorites before, get from localstorage
        if(localStorage.favorites) {
            let savedFavorites = JSON.parse(localStorage.favorites);

            for (let item of savedFavorites) {
                favorites.set(item[0], item[1]);
            }
        }

        return {
            favorites: favorites,
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

    _addFavorite(address) {
        let favorites = this.state.favorites;

        favorites.set(address, {
            address,
            timestamp: Date.now()
        });

        this.setState({
            favorites
        });

        this._saveToLocalstotage();
    },

    _deleteFavorite(address) {
        this.state.favorites.delete(address);

        this.setState({
            favorites: this.state.favorites
        });

        this._saveToLocalstotage();
    },

    _isAddressInFavorites(address) {
        return this.state.favorites.has(address);
    },

    _toggleFavorite(address) {
        this._isAddressInFavorites(address) ? this._deleteFavorite(address) : this._addFavorite(address);
    },

    _saveToLocalstotage() {
        let favorites = this.state.favorites;

        if (!favorites) {
            return;
        }

        window.localStorage.favorites = JSON.stringify(Array.from(favorites.entries()));
    },

    render() {
        return <div>
            <h1>Your Locations</h1>
            <Search onSearch={this._searchForAddress} />
            <Maps lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
            <CurrentLocation address={this.state.currentAddress}
                             favorite={this._isAddressInFavorites(this.state.currentAddress)}
                             onFavoriteToggle={this._toggleFavorite} />
            <LocationList locations={this.state.favorites}
                          activeLocationAddress={this.state.currentAddress}
                          onClick={this._searchForAddress} />
        </div>;
    }
});
