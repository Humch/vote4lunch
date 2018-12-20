import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import { Label, FormFeedback } from '../../../Core';
import { FormInputPassword, PasswordChecker } from '../..';

const FormGroupPassword = ({
  password,
  passwordRepeater,
  tooShort,
  text,
  forProp,
  repeater,
  colorLabel,
}) => {
  let rendering = '';
  let formFeedbackText = '';

  if (tooShort) {
    formFeedbackText = 'Le mot de passe est trop court';
  } else {
    formFeedbackText = 'Les mots de passe sont différents';
  }

  if (password !== '' && passwordRepeater !== '') {
    rendering = (
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <PasswordChecker />
        </InputGroupText>
      </InputGroupAddon>
    );
  }

  return (
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
        { rendering }
        { forProp === 'passwordRepeater'
          ? (
            <FormFeedback
              text={formFeedbackText}
            />
          )
          : ''}
      </InputGroup>
    </div>
  );
};

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
