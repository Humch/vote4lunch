import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'reactstrap';

import { FormGroupPassword, FormGroupPseudo } from '../..';

import { loginUser, resetLoginFailure } from '../../actions';
import { onTopAlert, offTopAlert } from '../../../Core/actions';

import './SignIn.scss';

class SignIn extends Component {
  submitForm(e) {
    const {
      pseudo,
      password,
      loginUser: loginU,
    } = this.props;

    e.preventDefault();

    loginU(pseudo, password);
  }

  render() {
    const {
      authenticated,
      loginError,
      onTopAlert: onTA,
      offTopAlert: offTA,
      resetLoginFailure: resetLF,
    } = this.props;

    if (loginError) {
      onTA('danger', 'votre pseudo ou votre mot de passe est erroné');
      resetLF();
      setTimeout(() => {
        offTA();
      }, 5000);
    }

    if (authenticated) {
      return (<Redirect to="/" />);
    }

    return (
      <Container fluid className="SignIn">
        <Row noGutters className="justify-content-center align-items-center h-100">
          <Col
            xs="12"
            md="4"
            className="bg-blue p-5 rounded"
          >
            <Form onSubmit={e => this.submitForm(e)}>
              <FormGroupPseudo
                text="Indique ton pseudo"
                forProp="pseudo"
                colorLabel="white"
                noCheck
              />
              <FormGroupPassword
                text="Indique ton mot de passe"
                forProp="password"
                colorLabel="white"
              />
              <div className="text-center mt-5">
                <Button color="success">Se connecter</Button>
              </div>
            </Form>
          </Col>

        </Row>
      </Container>
    );
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  onTopAlert: PropTypes.func.isRequired,
  offTopAlert: PropTypes.func.isRequired,
  resetLoginFailure: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loginError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};

const mstp = ({ userData }) => ({
  pseudo: userData.pseudo,
  password: userData.password,
  authenticated: userData.authenticated,
  loginError: userData.loginError,
});

const mdtp = dispatch => bindActionCreators({
  loginUser,
  resetLoginFailure,
  onTopAlert,
  offTopAlert,
}, dispatch);

export default connect(mstp, mdtp)(SignIn);
