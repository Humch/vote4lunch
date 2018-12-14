import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { formInputEmail } from '../../actions';

const FormInputEmail = ({ email, exist, formInputEmail: formInputEmailAction }) => {
  let renderExist = '';

  if (exist) {
    renderExist = 'is-invalid';
  }

  return (
    <input
      type="email"
      name="email"
      id="email"
      value={email}
      onChange={e => formInputEmailAction(e.target.value)}
      required
      className={`form-control ${renderExist}`}
    />
  );
};

FormInputEmail.propTypes = {
  email: PropTypes.string.isRequired,
  exist: PropTypes.bool.isRequired,
  formInputEmail: PropTypes.func.isRequired,
};

const mstp = ({ userData, emailChecker }) => ({
  email: userData.email,
  exist: emailChecker.payload.exist,
});

const mdtp = dispatch => bindActionCreators({ formInputEmail }, dispatch);

export default connect(mstp, mdtp)(FormInputEmail);
