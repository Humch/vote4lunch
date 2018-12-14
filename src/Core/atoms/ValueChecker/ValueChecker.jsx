import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

const ValueChecker = ({ check }) => (
  <FontAwesomeIcon
    icon={check ? faCheck : faBan}
    color={check ? 'green' : 'red'}
  />
);

ValueChecker.propTypes = {
  check: PropTypes.bool.isRequired,
};

export default ValueChecker;
