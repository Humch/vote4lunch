import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Link from 'react-router-dom/Link';

import './HomeButton.scss';

import { Button } from 'reactstrap';

const HomeButton = () => (
  <Button
    className="HomeButton mr-2"
    tag={Link}
    to="/"
  >
    <FontAwesomeIcon
      color="#C5FF19"
      icon={faHome}
    />
  </Button>
);

export default HomeButton;
