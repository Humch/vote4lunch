import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { InputGroup } from 'reactstrap';

import { Label, FormFeedback } from '../../../Core';
import { FormInputPassword, PasswordChecker, InputGroupAppend } from '../..';

const FormGroupPassword = ({
  password,
  passwordRepeater,
  tooShort,
  text,
  forProp,
  repeater,
  colorLabel,
}) => (
  <div className="form-group">
    <Label
      text={text}
      forProp={forProp}
      color={colorLabel}
    />
    <InputGroup>
      <FormInputPassword
        repeater={repeater}
      />
      { password !== '' && passwordRepeater !== ''
        ? (
          <InputGroupAppend>
            <PasswordChecker />
          </InputGroupAppend>
        )
        : '' }
      { forProp === 'passwordRepeater'
        ? (
          <FormFeedback
            text={tooShort ? 'Le mot de passe est trop court' : 'Les mots de passe sont différents'}
          />
        )
        : ''}
    </InputGroup>
  </div>
);

FormGroupPassword.propTypes = {
  password: PropTypes.string.isRequired,
  passwordRepeater: PropTypes.string.isRequired,
  tooShort: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  forProp: PropTypes.string.isRequired,
  repeater: PropTypes.bool,
  colorLabel: PropTypes.string,
};

const mstp = ({ userData, passwordChecker }) => ({
  password: userData.password,
  passwordRepeater: userData.passwordRepeater,
  tooShort: passwordChecker.tooShort,
});

export default connect(mstp)(FormGroupPassword);
