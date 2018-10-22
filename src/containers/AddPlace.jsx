import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import PlaceMap from './PlaceMap';
import CreateAVotePlaces from './CreateAVotePlaces';

const AddPlace = ({ voteDataId, userData }) => {
  if (voteDataId === '') {
    return <Redirect to='/' />;
  }

  return (
    <Container fluid className="AddPlace">
      <Row noGutters className="justify-content-center align-items-center h-100">
        <Col>
          <h5 className='text-white text-center my-3'>Maintenant {userData.pseudo}, ajoute des restaurants</h5>
        </Col>
      </Row>
      <Row noGutters className="justify-content-center align-items-center h-100">
        <Col
          xs="12"
          md="8"

        >
          <PlaceMap />
        </Col>
        <Col
          xs="12"
          md="4"
          className="FormBlock text-center"
        >
          <CreateAVotePlaces />
        </Col>
      </Row>
    </Container>
  );
};

const mstp = ({ voteData, userData }) => ({
  voteDataId: voteData.id,
  userData,
});

export default connect(mstp)(AddPlace);
