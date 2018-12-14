import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { updateUserData } from '../../../Accounts/actions';

class BeginVote extends Component {
  componentDidMount() {
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');
    const authenticatedStorage = localStorage.getItem('authenticated');

    if (pseudo && email && authenticatedStorage) {
      const { updateUserData: updateUD } = this.props;
      updateUD(pseudo, email, JSON.parse(authenticatedStorage));
    }
  }

  render() {
    const { authenticated } = this.props;

    return (
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
  }
}

BeginVote.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mstp = ({ userData }) => ({
  authenticated: userData.authenticated,
});

const mdtp = dispatch => bindActionCreators({ updateUserData }, dispatch);

export default connect(mstp, mdtp)(BeginVote);
