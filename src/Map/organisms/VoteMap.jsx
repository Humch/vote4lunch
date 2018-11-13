import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import MaterialIcon from 'material-icons-react';

import 'leaflet/dist/leaflet.css';

import { updateMapCoordinates } from '../actions';

class VoteMap extends Component {
  constructor() {
    super();
    this.leafletMap = React.createRef();
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
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

  render() {
    const { restaurants, positionLatitude, positionLongitude, zoomLevel } = this.props;
    const mapCenter = [positionLatitude, positionLongitude];
    const mapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    return (
      <div className="mt-3">
        <Map
          center={mapCenter}
          zoom={zoomLevel}
          ref={this.leafletMap}
          className="VoteMap"
        >
          <TileLayer
            url={mapTiles}
          />
          {
            restaurants.map(restaurant => (
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
                </Popup>
              </Marker>
            ))
          }
        </Map>
      </div>
    );
  }
}

VoteMap.propTypes = {
  updateMapCoordinates: PropTypes.func.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  positionLatitude: PropTypes.number.isRequired,
  positionLongitude: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

const mstp = ({ mapCoordinates }) => ({
  positionLatitude: mapCoordinates.positionLatitude,
  positionLongitude: mapCoordinates.positionLongitude,
  zoomLevel: mapCoordinates.zoomLevel,
});

const mdtp = dispatch => bindActionCreators({ updateMapCoordinates }, dispatch);

export default connect(mstp, mdtp)(VoteMap);
