import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Label, FormInput } from '../../../Core';

import { formInputVoteTitle } from '../../actions';

const FormGroupVoteTitle = ({ formInputVoteTitle: formIVT }) => {
  const handleFieldChange = (value) => {
    formIVT(value);
  };

  return (
    <div className="form-group">
      <Label
        text="Choisis le titre de l'événement"
        forProp="title"
        color="white"
      />
      <FormInput
        onChange={handleFieldChange}
        id="title"
      />
    </div>
  );
};

FormGroupVoteTitle.propTypes = {
  formInputVoteTitle: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ formInputVoteTitle }, dispatch);

export default connect(null, mdtp)(FormGroupVoteTitle);
