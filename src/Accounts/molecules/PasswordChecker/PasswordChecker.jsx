import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { ValueChecker } from '../../../Core';

const PasswordChecker = ({ password, passwordRepeater }) => {
  let rendering = '';
  if (password === passwordRepeater) {
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
};

const mstp = ({ userData }) => ({
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
});

export default connect(mstp)(PasswordChecker);
