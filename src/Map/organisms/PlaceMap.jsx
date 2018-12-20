import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Map,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import { Button } from 'reactstrap';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

import {
  fetchRestaurants,
  offMapAlert,
  onMapAlert,
  resetListOfRestaurants,
  updateMapCoordinates,
  updateZoomLevel,
} from '../actions';
import { addAPlace } from '../../VoteCreator/actions/addAPlace';


import { Controls } from '..';

/* eslint no-underscore-dangle: ["error", { "allow": ["_getIconUrl","_northEast","_southWest"] }] */
delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

class PlaceMap extends Component {
  constructor() {
    super();

    this.leafletMap = React.createRef();
    this.getLocation = this.getLocation.bind(this);
    this.getRestaurantsList = this.getRestaurantsList.bind(this);
    this.addAPlaceToVote = this.addAPlaceToVote.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate() {
    const {
      restaurants,
      loadingRestaurants,
      zoomLevel,
      onMapAlert: onMA,
      offMapAlert: offMA
    } = this.props;

    if (restaurants.length === 0 && zoomLevel > 15 && !loadingRestaurants) {
      onMA('info', 'Pas de restaurant connu dans cette zone');
    } else {
      offMA();
    }
  }

  getLocation() {
    const { updateMapCoordinates: updateMC } = this.props;
    if (navigator.geolocation) {
      // L'API est disponible
      const success = (pos) => {
        const crd = pos.coords;
        updateMC(crd.latitude, crd.longitude, 16);
      };
      navigator.geolocation.getCurrentPosition(success);
    }
  }

  getRestaurantsList() {
    const {
      fetchRestaurants: fetchR,
      resetListOfRestaurants: resetLOR,
      updateZoomLevel: updateZL
    } = this.props;

    const { leafletElement, viewport } = this.leafletMap.current;

    updateZL(viewport.zoom);

    if (leafletElement && viewport.zoom > 15) {
      const coordinates = leafletElement.getBounds();
      fetchR(
        coordinates._northEast.lat,
        coordinates._northEast.lng,
        coordinates._southWest.lat,
        coordinates._southWest.lng
      );
    } else {
      resetLOR();
    }
  }

  addAPlaceToVote(voteData, placeId) {
    const { addAPlace: addAP, onMapAlert: onMA, offMapAlert: offMA } = this.props;
    if (voteData.places.filter(place => place.id === placeId).length > 0) {
      onMA('danger', 'Hola, attention il existe déjà !');
      setTimeout(() => { offMA(); }, 3000);
    } else {
      addAP(voteData.id, placeId);
    }
  }

  render() {
    const {
      error,
      restaurants,
      voteData,
      positionLatitude,
      positionLongitude,
      zoomLevel,
      onMapAlert: onMA,
      offMapAlert: offMA
    } = this.props;

    const mapCenter = [positionLatitude, positionLongitude];
    const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const render = restaurants.map(restaurant => (
      <Marker
        key={restaurant.id}
        position={[restaurant.lat, restaurant.lng]}
      >
        <Popup>
          <p className="text-center mb-1">
            {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
          </p>
          <p className="text-center my-1">
            {restaurant.name}
          </p>
          <p className="text-center mt-1">
            <Button
              color="success"
              onClick={() => this.addAPlaceToVote(voteData, restaurant.id)}
            >
              <FontAwesomeIcon icon={faPlus} />

            </Button>
          </p>
        </Popup>
      </Marker>
    ));

    if (error) {
      onMA('danger', 'Aie, il y a un problème avec la carte');
      setTimeout(() => { offMA(); }, 3000);
    }

    return (
      <div>
        <Map
          center={mapCenter}
          zoom={zoomLevel}
          ref={this.leafletMap}
          onmoveend={() => this.getRestaurantsList()}
          onzoomend={() => this.getRestaurantsList()}
          className="PlaceMap"
        >
          <TileLayer
            url={mapTiles}
          />
          <Controls />
          {render}
        </Map>
      </div>
    );
  }
}

PlaceMap.propTypes = {
  addAPlace: PropTypes.func.isRequired,
  fetchRestaurants: PropTypes.func.isRequired,
  onMapAlert: PropTypes.func.isRequired,
  offMapAlert: PropTypes.func.isRequired,
  updateMapCoordinates: PropTypes.func.isRequired,
  updateZoomLevel: PropTypes.func.isRequired,
  resetListOfRestaurants: PropTypes.func.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  voteData: PropTypes.shape({
    id: PropTypes.number,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    url: PropTypes.string,
    places: PropTypes.array,
  }).isRequired,
  error: PropTypes.objectOf(),
  loadingRestaurants: PropTypes.bool,
  positionLatitude: PropTypes.number.isRequired,
  positionLongitude: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

const mstp = ({ restaurants, voteData, mapCoordinates }) => ({
  restaurants: restaurants.list,
  error: restaurants.error,
  loadingRestaurants: restaurants.loading,
  voteData,
  positionLatitude: mapCoordinates.positionLatitude,
  positionLongitude: mapCoordinates.positionLongitude,
  zoomLevel: mapCoordinates.zoomLevel,
});

const mdtp = dispatch => bindActionCreators({
  addAPlace,
  fetchRestaurants,
  onMapAlert,
  offMapAlert,
  resetListOfRestaurants,
  updateMapCoordinates,
  updateZoomLevel,
}, dispatch);

export default connect(mstp, mdtp)(PlaceMap);
