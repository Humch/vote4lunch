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
    } = this.props;
    let renderExist = '';

    if (
      password !== passwordRepeater
      && password !== ''
      && passwordRepeater !== ''
    ) {
      renderExist = 'is-invalid';
    }

    return (
      <input
        type="password"
        name={!repeater ? 'password' : 'passwordRepeater'}
        id={!repeater ? 'password' : 'passwordRepeater'}
        value={!repeater ? password : passwordRepeater}
        onChange={e => this.onChangeValue(e.target.value)}
        required
        className={`form-control ${renderExist}`}
      />
    );
  }
}

FormInputPassword.propTypes = {
  repeater: PropTypes.bool,
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  formInputPassword: PropTypes.func.isRequired,
  formInputPasswordRepeater: PropTypes.func.isRequired,
};

const mstp = ({ userData }) => ({
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
});

const mdtp = dispatch => bindActionCreators({
  formInputPassword,
  formInputPasswordRepeater,
}, dispatch);

export default connect(mstp, mdtp)(FormInputPassword);
