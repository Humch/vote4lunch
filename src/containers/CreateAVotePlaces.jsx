import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

import Place from '../containers/Place'

class CreateAVotePlaces extends Component {

    render() {

        const{ voteData } = this.props
        let disabled_button = true
        if (voteData.places.length >= 2) {
            disabled_button = false
        }
        
        return (
            <Row className="pb-3 px-2">
                <Col>
                    <ListGroup>
                    {
                        this.props.voteData.places.map(place => (
                            <Place
                                key={place.id}
                                place_id={place.id}
                                place={place.name}
                                type={place.type}
                                vote_id= {voteData.id}
                            />
                        ))
                    }
                    </ListGroup>
                    <Button
                        color='success'
                        disabled = { disabled_button }
                        className = "mt-4"
                        tag={Link} 
                        to={ "/vote/" + voteData.url }
                    >Créer le vote</Button>
                </Col>
            </Row>
        );
    }
}

const mstp = ({ voteData }) => ({
    voteData: voteData
});

export default connect(mstp)(CreateAVotePlaces);
