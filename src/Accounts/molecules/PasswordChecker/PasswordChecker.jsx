import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { ValueChecker } from '../../../Core';

const PasswordChecker = ({ password, passwordRepeater, tooShort }) => {
  let rendering = '';
  if (tooShort) {
    rendering = <ValueChecker check={false} />;
  } else if (password === passwordRepeater) {
    rendering = <ValueChecker check />;
  } else {
    rendering = <ValueChecker check={false} />;
  }
  return (
    <span>
      { rendering }
    </span>
  );
};

PasswordChecker.propTypes = {
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  tooShort: PropTypes.bool.isRequired,
};

const mstp = ({ userData, passwordChecker }) => ({
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
  tooShort: passwordChecker.tooShort,
});

export default connect(mstp)(PasswordChecker);
