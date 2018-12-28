import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Button,
  Form,
} from 'reactstrap';

import { FormGroupPassword, FormGroupPseudo, FormGroupEmail } from '../..';

import { addUser, resetPasswordData } from '../../actions';

class SignUp extends Component {
  submitForm(e) {
    const {
      pseudo,
      email,
      password,
      passwordRepeater,
      addUser: addU,
      resetPasswordData: resetPData,
    } = this.props;

    e.preventDefault();

    addU(pseudo, email, password, passwordRepeater);
    resetPData();
  }

  render() {
    const {
      loading,
    } = this.props;

    let renderButton = 'Valider';

    if (loading) {
      renderButton = 'Requête en cours';
    }
    return (
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
          <Button color="success">{renderButton}</Button>
        </div>
      </Form>
    );
  }
}

SignUp.propTypes = {
  addUser: PropTypes.func.isRequired,
  resetPasswordData: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mstp = ({ userData, addUser: addUserReducer }) => ({
  pseudo: userData.pseudo,
  email: userData.email,
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
  loading: addUserReducer.loading,
});

const mdtp = dispatch => bindActionCreators({ addUser, resetPasswordData }, dispatch);

export default connect(mstp, mdtp)(SignUp);
