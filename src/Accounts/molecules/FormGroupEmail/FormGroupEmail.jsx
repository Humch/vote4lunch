import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { Label, FormFeedback } from '../../../Core';
import { FormInputEmail, EmailChecker } from '../..';

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

    let rendering = '';

    if (email !== '') {
      rendering = (
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <EmailChecker />
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
          <FormInputEmail />
          { rendering }
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
