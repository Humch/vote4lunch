import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HamburgerIcon = ({ onClickEvent }) => (
  <FontAwesomeIcon
    color="#C5FF19"
    icon={faBars}
    size="2x"
    onClick={() => onClickEvent()}
  />
);

HamburgerIcon.propTypes = {
  onClickEvent: PropTypes.func.isRequired,
};

export default HamburgerIcon;
