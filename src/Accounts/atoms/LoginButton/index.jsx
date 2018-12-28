import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './LoginButton.scss';

import Link from 'react-router-dom/Link';

import { Button } from 'reactstrap';

export default () => (
  <Button
    className="LoginButton"
    tag={Link}
    to="/signin"
  >
    <FontAwesomeIcon
      color="#C5FF19"
      icon={faSignInAlt}
    />
  </Button>
);
