import React from 'react';

import PropTypes from 'prop-types';

const InputGroupAppend = ({ children }) => (
  <div className="input-group-append">
    <span className="input-group-text">
      {children}
    </span>
  </div>
);

InputGroupAppend.propTypes = {
  children: PropTypes.element,
};

export default InputGroupAppend;
