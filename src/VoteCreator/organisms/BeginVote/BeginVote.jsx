import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const BeginVote = ({ authenticated }) => (
  <Container fluid className="BeginVote">
    <Row noGutters className="justify-content-center align-items-center h-100">
      <Col
        xs="12"
        md="4"
        className="bg-blue p-5 text-center rounded"
      >
        <p className="text-white">{ !authenticated ? 'Connecte toi pour créer un vote' : 'Fait voter tes collègues pour le déjeuner' }</p>
        <Button
          tag={Link}
          to="/create-a-vote"
          color="success"
          disabled={!authenticated}
        >
          {'Organiser un vote'}
        </Button>
      </Col>
    </Row>
  </Container>
);

BeginVote.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mstp = ({ userData }) => ({
  authenticated: userData.authenticated,
});

export default connect(mstp)(BeginVote);
