import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { formInputPassword, formInputPasswordRepeater } from '../../actions';

class FormInputPassword extends Component {
  constructor(props) {
    super(props);

    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(value) {
    const {
      repeater,
      formInputPassword: formInputPasswordAction,
      formInputPasswordRepeater: formInputPasswordRepeaterAction,
    } = this.props;

    if (!repeater) {
      formInputPasswordAction(value);
    } else {
      formInputPasswordRepeaterAction(value);
    }
  }

  render() {
    const {
      repeater,
      password,
      passwordRepeater,
      tooShort,
    } = this.props;
    let isInvalid = '';

    if (
      password !== passwordRepeater
      && password !== ''
      && passwordRepeater !== ''
    ) {
      isInvalid = 'is-invalid';
    } else if (
      tooShort
      && password !== ''
      && passwordRepeater !== ''
    ) {
      isInvalid = 'is-invalid';
    }

    return (
      <input
        type="password"
        name={!repeater ? 'password' : 'passwordRepeater'}
        id={!repeater ? 'password' : 'passwordRepeater'}
        value={!repeater ? password : passwordRepeater}
        onChange={e => this.onChangeValue(e.target.value)}
        required
        className={`form-control ${isInvalid}`}
      />
    );
  }
}

FormInputPassword.propTypes = {
  repeater: PropTypes.bool,
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  tooShort: PropTypes.bool.isRequired,
  formInputPassword: PropTypes.func.isRequired,
  formInputPasswordRepeater: PropTypes.func.isRequired,
};

const mstp = ({ userData, passwordChecker }) => ({
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
  tooShort: passwordChecker.tooShort,
});

const mdtp = dispatch => bindActionCreators({
  formInputPassword,
  formInputPasswordRepeater,
}, dispatch);

export default connect(mstp, mdtp)(FormInputPassword);
