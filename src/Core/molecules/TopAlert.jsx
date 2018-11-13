import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const TopAlert = ({ messageType, status, message }) => {
  let picto = '';
  if (messageType === 'danger') {
    picto = <FontAwesomeIcon className="mx-2" icon={faExclamationTriangle} />;
  }
  return (
    <Alert color={messageType} isOpen={status} className="AlertBox">
      {picto}
      {message}
      {picto}
    </Alert>
  );
};

TopAlert.propTypes = {
  messageType: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

const mstp = ({ topAlert }) => ({
  messageType: topAlert.messageType,
  status: topAlert.status,
  message: topAlert.message,
});

export default connect(mstp)(TopAlert);
