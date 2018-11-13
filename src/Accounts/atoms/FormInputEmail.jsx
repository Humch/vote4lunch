import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Label } from 'reactstrap';

import { formInputEmail } from '../actions';

const FormInputEmail = ({ email, formInputEmail: formInputEmailAction }) => (
  <div className="form-group">
    <Label className="text-white" for="email">
      {'Indique ton email'}
    </Label>
    <input
      type="email"
      name="email"
      id="email"
      value={email}
      onChange={e => formInputEmailAction(e.target.value)}
      required
      className="form-control"
    />
  </div>
);

FormInputEmail.propTypes = {
  email: PropTypes.string.isRequired,
  formInputEmail: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  email: voteDataForm.email,
});

const mdtp = dispatch => bindActionCreators({ formInputEmail }, dispatch);

export default connect(mstp, mdtp)(FormInputEmail);
