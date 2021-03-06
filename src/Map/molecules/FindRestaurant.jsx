import React from 'react';

import Control from 'react-leaflet-control';

import { Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

export default () => (
  <Control position="topleft" >
    <Button color="secondary" className="mr-5"><FontAwesomeIcon icon={faUtensils} /></Button>
  </Control>
);
