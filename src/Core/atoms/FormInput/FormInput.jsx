import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  disabled,
  id,
  type,
  placeholder,
  onChange,
}) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="form-control"
      disabled={disabled}
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,

};

FormInput.defaultProps = {
  disabled: false,
  placeholder: '',
  type: 'text',
};

export default FormInput;
