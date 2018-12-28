import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CloseIcon = ({ onClickEvent }) => (
  <FontAwesomeIcon
    color="#C5FF19"
    icon={faTimes}
    size="2x"
    onClick={() => onClickEvent()}
  />
);

CloseIcon.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
};

export default CloseIcon;
