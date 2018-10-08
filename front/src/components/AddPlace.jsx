import React from 'react';

import { Container, Row, Col } from 'reactstrap'

import PlaceMap from '../containers/PlaceMap'
import CreateAVotePlaces from '../containers/CreateAVotePlaces';

const AddPlace = () => {

    return ( 
        <Container fluid className="stepContainer">
                <Row noGutters className="justify-content-center align-items-center h-100">
                <Col
                    xs="8"
                    
                >
                    <PlaceMap/>
                </Col>
                <Col 
                    xs="4"
                    className="FormBlock text-center"
                >
                    <CreateAVotePlaces/>
                </Col>
            </Row>
        </Container>
     );
}
 
export default AddPlace;