import React from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap';

const ButtonCollapser = ({ toggle, collapse }) => (
  <Button
    size="sm"
    color="info"
    onClick={toggle}
    className="mr-3"
  >
    <FontAwesomeIcon
      icon={collapse ? faAngleDown : faAngleRight}
    />
  </Button>
);

ButtonCollapser.propTypes = {
  toggle: PropTypes.func.isRequired,
  collapse: PropTypes.bool.isRequired,
};

export default ButtonCollapser;
