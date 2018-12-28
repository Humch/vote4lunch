import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  InputGroup,
} from 'reactstrap';

import { Label, FormFeedback } from '../../../Core';
import { FormInputPseudo, PseudoChecker, InputGroupAppend } from '../..';

import { checkPseudo } from '../../actions';

class FormGroupPseudo extends Component {
  componentDidUpdate(prevProps) {
    const { pseudo, checkPseudo: checkP, noCheck } = this.props;
    if (prevProps.pseudo !== pseudo && !noCheck && pseudo !== '') {
      checkP(pseudo);
    }
  }

  render() {
    const {
      pseudo,
      text,
      forProp,
      colorLabel,
      noCheck,
    } = this.props;

    return (
      <div className="form-group">
        <Label
          text={text}
          forProp={forProp}
          color={colorLabel}
        />
        <InputGroup>
          <FormInputPseudo />
          { pseudo !== '' && !noCheck
            ? (
              <InputGroupAppend>
                <PseudoChecker />
              </InputGroupAppend>
            )
            : '' }
          <FormFeedback
            text="Ce pseudo existe déjà"
          />
        </InputGroup>
      </div>
    );
  }
}

FormGroupPseudo.propTypes = {
  checkPseudo: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  forProp: PropTypes.string.isRequired,
  colorLabel: PropTypes.string,
  noCheck: PropTypes.bool,
};

const mstp = ({ userData }) => ({
  pseudo: userData.pseudo,
});

const mdtp = dispatch => bindActionCreators({ checkPseudo }, dispatch);

export default connect(mstp, mdtp)(FormGroupPseudo);
