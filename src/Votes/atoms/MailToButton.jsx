import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap';

const MailToButton = () => (
  <a href={`mailto:?subject=Où%20déjeune-t-on%20ce%20midi?&body=Votez%20grâce%20à%20ce%20lien:%0D%0A%0D%0A${window.location.href}`}>
    <Button
      color="info"
    >
        Partager par mail
      <FontAwesomeIcon
        className="ml-2"
        icon={faPaperPlane}
      />
    </Button>
  </a>
);

export default MailToButton;
