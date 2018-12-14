import React from 'react';

import PropTypes from 'prop-types';

const FormFeedback = ({ valid, text }) => (
  <div className={valid ? 'valid-feedback' : 'invalid-feedback'}>
    {text}
  </div>
);

FormFeedback.propTypes = {
  valid: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default FormFeedback;
