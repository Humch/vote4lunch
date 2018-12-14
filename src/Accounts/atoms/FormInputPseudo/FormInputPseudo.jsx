import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { formInputPseudo } from '../../actions';

const FormInputPseudo = ({ pseudo, exist, formInputPseudo: formInputPseudoAction }) => {
  let renderExist = '';

  if (exist) {
    renderExist = 'is-invalid';
  }
  return (
    <input
      type="text"
      name="pseudo"
      id="pseudo"
      value={pseudo}
      onChange={e => formInputPseudoAction(e.target.value)}
      required
      className={`form-control ${renderExist}`}
    />
  );
};

FormInputPseudo.propTypes = {
  pseudo: PropTypes.string.isRequired,
  exist: PropTypes.bool.isRequired,
  formInputPseudo: PropTypes.func.isRequired,
};

const mstp = ({ userData, pseudoChecker }) => ({
  pseudo: userData.pseudo,
  exist: pseudoChecker.payload.exist
});

const mdtp = dispatch => bindActionCreators({ formInputPseudo }, dispatch);

export default connect(mstp, mdtp)(FormInputPseudo);
