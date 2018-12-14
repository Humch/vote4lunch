import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Control from 'react-leaflet-control';
import { Alert } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const TooManyPlaces = ({ messageType, status, message }) => {
  let picto = '';
  if (messageType === 'danger') {
    picto = <FontAwesomeIcon icon={faExclamationTriangle} />;
  }
  return (
    <Control position="topright">
      <Alert color={messageType} isOpen={status}>
        {picto}
        { ' ' }
        {message}
        { ' ' }
        {picto}
      </Alert>
    </Control>
  );
};

TooManyPlaces.propTypes = {
  messageType: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

const mstp = ({ onMapAlert }) => ({
  messageType: onMapAlert.messageType,
  status: onMapAlert.status,
  message: onMapAlert.message
});

export default connect(mstp)(TooManyPlaces);
