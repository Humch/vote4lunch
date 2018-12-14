import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'reactstrap';

import { FormGroupPassword, FormGroupPseudo, FormGroupEmail } from '../..';

import { addUser } from '../../actions';

import './SignUp.scss';

class SignUp extends Component {
  submitForm(e) {
    const {
      pseudo,
      email,
      password,
      passwordRepeater,
      addUser: addU,
    } = this.props;

    e.preventDefault();

    addU(pseudo, email, password, passwordRepeater);
  }

  render() {
    const {
      payload,
      loading,
    } = this.props;
    let rendering = '';
    let renderButton = 'Valider';
    if (loading) {
      renderButton = 'Requête en cours';
    }

    if (payload.created) {
      rendering = (
        <div>
          <p className="text-center text-white">
            {'Ton compte a été créé.'}
          </p>
          <p className="text-center text-white">
            {'Tu peux maintenant t\'identifier.'}
          </p>
        </div>

      );
    } else {
      rendering = (
        <Form onSubmit={e => this.submitForm(e)}>
          <FormGroupPseudo
            text="Choisis ton pseudo"
            forProp="pseudo"
            colorLabel="white"
          />
          <FormGroupEmail
            text="Indique ton email"
            forProp="email"
            colorLabel="white"
          />
          <FormGroupPassword
            text="Choisis ton mot de passe"
            forProp="password"
            colorLabel="white"
          />
          <FormGroupPassword
            text="Répète ton mot de passe"
            forProp="passwordRepeater"
            colorLabel="white"
            repeater
          />
          <div className="text-center mt-5">
            <Button color="success">{ renderButton }</Button>
          </div>
        </Form>
      );
    }
    return (
      <Container fluid className="SignUp">
        <Row noGutters className="justify-content-center align-items-center h-100">
          <Col
            xs="12"
            md="4"
            className="bg-blue p-5 rounded"
          >
            {rendering}
          </Col>

        </Row>
      </Container>
    );
  }
}

SignUp.propTypes = {
  addUser: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  payload: PropTypes.shape({
    created: PropTypes.bool.isRequired
  }),
  loading: PropTypes.bool.isRequired,
};

const mstp = ({ userData, addUser: addUserReducer }) => ({
  pseudo: userData.pseudo,
  email: userData.email,
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
  payload: addUserReducer.payload,
  loading: addUserReducer.loading,
});

const mdtp = dispatch => bindActionCreators({ addUser }, dispatch);

export default connect(mstp, mdtp)(SignUp);
