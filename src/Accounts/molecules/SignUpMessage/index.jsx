import React from 'react';

import { Button } from 'reactstrap';

import Link from 'react-router-dom/Link';

export default () => (
  <div>
    <p className="text-center text-white">
      {'Ton compte a été créé.'}
    </p>
    <p className="text-center text-white">
      {'Tu peux maintenant t\'identifier.'}
    </p>
    <p className="text-center">
      <Button
        id="loginButton"
        color="success"
        className="mr-2"
        tag={Link}
        to="/signin"
      >
        {"S'identifier"}
      </Button>
    </p>
  </div>);
