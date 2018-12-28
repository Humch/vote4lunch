import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  InputGroup,
} from 'reactstrap';

import { Label, FormFeedback } from '../../../Core';
import { FormInputEmail, EmailChecker, InputGroupAppend } from '../..';

import { checkEmail } from '../../actions';

class FormGroupEmail extends Component {
  componentDidUpdate(prevProps) {
    const { email, checkEmail: checkE } = this.props;
    if (prevProps.email !== email) {
      checkE(email);
    }
  }

  render() {
    const {
      email,
      text,
      forProp,
      colorLabel
    } = this.props;

    return (
      <div className="form-group">
        <Label
          text={text}
          forProp={forProp}
          color={colorLabel}
        />
        <InputGroup>
          <FormInputEmail />
          { email !== ''
            ? (
              <InputGroupAppend>
                <EmailChecker />
              </InputGroupAppend>
            )
            : '' }
          <FormFeedback
            text="Cet email est déjà utilisé"
          />
        </InputGroup>
      </div>
    );
  }
}

FormGroupEmail.propTypes = {
  checkEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  forProp: PropTypes.string.isRequired,
  colorLabel: PropTypes.string,
};

const mstp = ({ userData }) => ({
  email: userData.email,
});

const mdtp = dispatch => bindActionCreators({ checkEmail }, dispatch);

export default connect(mstp, mdtp)(FormGroupEmail);
