import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FormGroupSignUp, SignUpMessage } from '../..';

import './SignUp.scss';

const SignUp = ({ payload }) => (
  <div className="SignUp container-fluid">
    <div className="row no-gutters justify-content-center align-items-center h-100">
      <div
        className=" col-xs-12 col-md-6 col-lg-4 bg-blue p-5 rounded"
      >
        {
          payload.created
            ? (
              <SignUpMessage />
            )
            : (
              <FormGroupSignUp />
            )
          }
      </div>

    </div>
  </div>
);

SignUp.propTypes = {
  payload: PropTypes.shape({
    created: PropTypes.bool.isRequired
  }),
};

const mstp = ({ addUser: addUserReducer }) => ({
  payload: addUserReducer.payload,
});

export default connect(mstp)(SignUp);
